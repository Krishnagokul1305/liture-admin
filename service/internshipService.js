import { auth } from "@/app/lib/auth";
import { formatDateTime, formatDate } from "@/app/utils/helper";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function getAllInternships({
  search,
  is_active,
  time,
  page = 1,
  limit = 10,
  cache = false,
} = {}) {
  const params = new URLSearchParams();

  if (search) params.append("title", search);
  if (is_active) params.append("is_active", is_active);

  if (time && time !== "all") {
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    if (time === "past") {
      params.append("event_date_before", currentDate);
    } else if (time === "upcoming") {
      params.append("event_date_after", currentDate);
    }
  }

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const res = await fetch(
    `${API_BASE_URL}/internships/list/?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    { next: cache ? { revalidate: 60 } : { cache: "no-store" } },
  );

  const data = await res.json();
  const internships = data?.results || [];

  return {
    internships,
    pagination: {
      total: data?.count || internships.length,
      page,
      limit,
      totalPages: Math.ceil((data?.count || 0) / limit),
    },
  };
}

export async function getAllInternshipRegistrations({
  search,
  status,
  attended,
  page = 1,
  limit = 10,
} = {}) {
  const session = await auth();
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status && status !== "all") params.append("status", status);
  if (attended !== undefined && attended !== "all") {
    params.append("attended", String(attended));
  }
  params.append("page", page);
  params.append("limit", limit);

  const res = await fetch(
    `${API_BASE_URL}/internships/registrations/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch internship registrations");
  }

  const data = await res.json();

  return {
    registrations: data.results.map((reg) => ({
      id: reg.id,
      user_email: reg.user?.email || "",
      title: reg.internship?.title || "",
      registered_at: formatDate(reg.applied_at),
      attended: reg.attended,
      status: reg.status,
      reason: reg.reason,
      resume: reg.resume || null,
    })),
    pagination: {
      total: data.count,
      page,
      limit,
      totalPages: Math.ceil(data.count / limit),
    },
  };
}

export async function getInternshipRegistrationById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/registrations/${id}/`, {
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
    type: "internship",
    resume: registration?.resume,
    fullName: registration.user?.name ?? "",
    email: registration.user?.email ?? "",
    reason: registration?.reason ?? "No reason",
    phoneNumber: registration.user?.phone_number ?? "",
    internship: registration.internship
      ? { _id: registration.internship }
      : null,
    createdAt: formatDateTime(registration.created_at)?.date,
    registeredAt: formatDate(registration.applied_at),
  };
}

export async function getAllInternshipsOptions() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/list/options/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data?.results || [];
}

/* ============================
   CREATE INTERNSHIP
============================ */
export async function createInternship(data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/list/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: data,
  });
  const response = await res.json();
  if (!res.ok) {
    throw response;
  }
  console.log(response);
  return response;
}

/* ============================
   GET INTERNSHIP BY ID
============================ */
export async function getInternshipById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/list/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

/* ============================
   UPDATE INTERNSHIP
============================ */
export async function updateInternship(id, data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/list/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: data,
  });
  const response = await res.json();

  if (!res.ok) {
    throw response;
  }

  return response;
}

export async function deleteInternship(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/list/${id}/`, {
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

/* ============================
   CHANGE REGISTRATION STATUS
============================ */
export async function changeInternshipRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  const session = await auth();

  const response = await fetch(
    `${API_BASE_URL}/internships/registrations/${registrationId}/change_status/`,
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
    throw new Error("Failed to update internship registration status");
  }

  return await response.json();
}

export async function deleteInternshipRegistration(registrationId) {
  const session = await auth();
  const response = await fetch(
    `${API_BASE_URL}/internships/registrations/${registrationId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete internship registration");
  }

  return response.status === 204;
}

export async function applyInternship(formData) {
  const session = await auth();
  formData.append("user_id", session?.user?.id);
  const res = await fetch(`${API_BASE_URL}/internships/registrations/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data?.error || data?.detail || JSON.stringify(data));
  return data;
}
