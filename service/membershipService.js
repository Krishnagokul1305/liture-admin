import { auth } from "@/app/lib/auth";
import { formatDateTime } from "@/app/utils/helper";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function createMembership(data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/list/`, {
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

  const res = await fetch(
    `${API_BASE_URL}/memberships/list/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();
  return data?.results || [];
}

export async function getAllMembershipRegistrations({
  search,
  status,
  page = 1,
  limit = 10,
} = {}) {
  const session = await auth();
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);
  params.append("page", page);
  params.append("limit", limit);

  const res = await fetch(
    `${API_BASE_URL}/memberships/registrations/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch membership registrations");
  }

  const data = await res.json();

  return {
    registrations: data.results.map((reg) => ({
      id: reg.id,
      user_email: reg.user_email,
      title: reg.membership_title,
      registered_at: reg.registered_at,
      attended: reg.attended,
      status: reg.status,
      reason: reg.reason,
    })),
    pagination: {
      total: data.count,
      page,
      limit,
      totalPages: Math.ceil(data.count / limit),
    },
  };
}

export async function getAllMembershipsOptions() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/list/options/`, {
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
  const res = await fetch(`${API_BASE_URL}/memberships/list/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function getMembershipRegistrationById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/registrations/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Registration not found");
  }

  const registration = await res.json();

  return {
    ...registration,
    id: registration.id ?? id,
    _id: registration.id ?? id,
    type: "membership",
    fullName:
      registration.fullName ??
      registration.full_name ??
      registration.user_name ??
      "",
    email: registration.email ?? registration.user_email ?? "",
    phoneNumber: registration.phoneNumber ?? registration.phone_number ?? "",
    membership: registration.membership
      ? { _id: registration.membership }
      : registration.membership_id
        ? { _id: registration.membership_id }
        : null,
    createdAt: formatDateTime(
      registration.createdAt ??
        registration.created_at ??
        registration.registered_at,
    )?.date,
  };
}

/**
 * READ BY NAME (optional helper)
 */
export async function getMembershipByName(name) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/memberships/list/?name=${name}`, {
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
  const res = await fetch(`${API_BASE_URL}/memberships/list/${id}/`, {
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
  const res = await fetch(`${API_BASE_URL}/memberships/list/${id}/`, {
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
  const res = await fetch(`${API_BASE_URL}/memberships/list/${id}/`, {
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
