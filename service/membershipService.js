import { auth } from "@/app/lib/auth";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function createMembership(data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/`, {
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

/**
 * READ ALL
 */
export async function getAllMemberships(filter = {}) {
  const session = await auth();
  const params = new URLSearchParams(filter);

  const res = await fetch(`${API_BASE_URL}/memberships/?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data?.results || [];
}

export async function getAllMembershipsOptions() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/options/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data?.results || [];
}

/**
 * READ ONE
 */
export async function getMembershipById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

/**
 * READ BY NAME (optional helper)
 */
export async function getMembershipByName(name) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/?name=${name}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data?.results?.[0] || null;
}

/**
 * UPDATE
 */
export async function updateMembership(id, data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/${id}/`, {
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

/**
 * DELETE (hard delete)
 */
export async function deleteMembership(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    const response = await res.json();
    throw response;
  }

  return res.ok;
}

/**
 * SOFT DELETE (recommended)
 */
export async function deactivateMembership(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive: false }),
  });
  const response = await res.json();

  if (!res.ok) {
    throw response;
  }

  return response;
}
