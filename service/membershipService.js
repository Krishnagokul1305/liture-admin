import { auth } from "@/app/lib/auth";
import { formatDateTime, formatDate } from "@/app/utils/helper";

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

export async function getAllMemberships(filter = {}, cache = false) {
  const params = new URLSearchParams(filter);

  const res = await fetch(
    `${API_BASE_URL}/memberships/list/?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    { next: cache ? { revalidate: 60 } : { cache: "no-store" } },
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
  if (status && status !== "all") params.append("status", status);
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
      user_email: reg.user?.email || "",
      title: reg.membership?.name || "",
      registered_at: formatDate(reg.start_date),
      status: reg.status,
      reason: reg.reason || "No reason",
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
    fullName: registration.user?.name ?? "",
    email: registration.user?.email ?? "",
    phoneNumber: registration.user?.phone_number ?? "",
    membership: registration.membership
      ? { _id: registration.membership }
      : null,
    rejection_reason: registration?.rejection_reason,
    membershipName: registration.membership?.name ?? "",
    reason: registration?.reason ?? "",
    createdAt: formatDateTime(registration.created_at)?.date,
    registeredAt: formatDate(registration.start_date),
  };
}

/**
 * READ BY NAME (optional helper)
 */

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

export async function deleteMembershipRegistration(registrationId) {
  const session = await auth();
  const response = await fetch(
    `${API_BASE_URL}/memberships/registrations/${registrationId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete membership registration");
  }

  return response.status === 204;
}

export async function changeMembershipRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  const session = await auth();

  const response = await fetch(
    `${API_BASE_URL}/memberships/registrations/${registrationId}/change_status/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        status,
        rejection_reason: rejectionReason,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update membership registration status");
  }

  return await response.json();
}

export async function registerMembership({ membership_id, reason }) {
  const session = await auth();

  const res = await fetch(`${API_BASE_URL}/memberships/registrations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ membership_id, reason, user_id: session?.user?.id }),
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data?.error || data?.detail || JSON.stringify(data));
  return data;
}
