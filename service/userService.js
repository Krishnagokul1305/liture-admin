import { auth } from "@/app/lib/auth";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function getAllUsers() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const users = data?.results || [];

  return {
    users,
    pagination: {
      total: data?.count || users.length,
      page: 1,
      limit: 10,
      totalPages: Math.ceil((data?.count || 0) / 10),
    },
  };
}

export async function getUserById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/users/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();
  return data;
}

export async function getCurrentUser() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/users/me/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  return response.data;
}

export async function createUser(data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  if (!res.ok) {
    throw response;
  }

  return response;
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        errors: response.errors,
        detail: response?.detail,
      }),
    );
  }

  return response;
}

export async function updateUser(id, data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/users/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  if (!res.ok) {
    throw response;
  }

  return response;
}

export async function deleteUser(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/users/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return res.ok;
}

export async function getCurrentUserStatus() {
  try {
    const user = await getCurrentUser();

    return {
      isStaff: !!user?.is_staff,
      isAdmin: !!user?.is_superuser,
      isAuthenticated: !!user?.id,
    };
  } catch {
    return { isStaff: false, isAdmin: false, isAuthenticated: false };
  }
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE_URL}/auth/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.log(err);
    throw new Error(err.detail || "Failed to request password reset");
  }

  return res.json();
}

export async function resetPassword({ token, newPassword }) {
  const res = await fetch(`${API_BASE_URL}/auth/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to reset password");
  }

  return res.json();
}

export async function verifyEmail(token) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-email/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verification_token: token }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Verification failed");
  }

  return res.json();
}
