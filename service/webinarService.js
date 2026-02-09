import { auth } from "@/app/lib/auth";
import { formatDateTime, formatDate } from "@/app/utils/helper";

const API_BASE_URL = process.env.DJANGO_API_URL;

/* ============================
   GET ALL WEBINARS
============================ */
export async function getAllWebinars({
  search,
  is_active,
  time,
  page = 1,
  page_size = 10,
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
  if (page_size) params.append("page_size", page_size);

  const res = await fetch(
    `${API_BASE_URL}/webinars/list/?${params.toString()}`,
    { next: cache ? { revalidate: 60 } : { cache: "no-store" } },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  console.log("webinar fetched");

  const data = await res.json();
  const webinars = data?.results || [];
  const count = data?.count || 0;

  return {
    webinars,
    pagination: {
      total: count,
      page: parseInt(page),
      page_size: parseInt(page_size),
      totalPages: Math.ceil(count / page_size),
    },
  };
}

export async function createWebinar(data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/list/`, {
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

  return response;
}

export async function getWebinarById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/list/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function getAllWebinarRegistrations({
  attended,
  status,
  page = 1,
  limit = 10,
} = {}) {
  const session = await auth();
  const params = new URLSearchParams();

  if (attended !== undefined) params.append("attended", String(attended));
  if (status && status !== "all") params.append("status", status);
  params.append("page", page);
  params.append("limit", limit);
  const res = await fetch(
    `${API_BASE_URL}/webinars/registrations/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch webinar registrations");
  }

  const data = await res.json();

  return {
    registrations: data.results.map((reg) => ({
      id: reg.id,
      user_email: reg.user?.email || "",
      title: reg.webinar?.title || "",
      registered_at: formatDate(reg.registered_at),
      attended: reg.attended,
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

export async function getWebinarRegistrationById(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/registrations/${id}/`, {
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
    type: "webinar",
    fullName: registration.user?.name ?? "",
    email: registration.user?.email ?? "",
    reason: registration?.reason ?? "No reason",
    phoneNumber: registration.user?.phone_number ?? "",
    webinar: registration.webinar ? { _id: registration.webinar } : null,
    createdAt: formatDateTime(registration.created_at)?.date,
    registeredAt: formatDate(registration.registered_at),
  };
}

export async function updateWebinar(id, data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/list/${id}/`, {
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

/* ============================
   DELETE WEBINAR
============================ */
export async function deleteWebinar(id) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/list/${id}/`, {
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
export async function changeWebinarRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  const session = await auth();
  console.log(registrationId, status, rejectionReason);
  const response = await fetch(
    `${API_BASE_URL}/webinars/registrations/${registrationId}/change_status/`,
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
    throw new Error("Failed to update webinar registration status");
  }

  return await response.json();
}

export async function deleteWebinarRegistration(registrationId) {
  const session = await auth();
  const response = await fetch(
    `${API_BASE_URL}/webinars/registrations/${registrationId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete webinar registration");
  }

  return response.status === 204; // Returns true on success
}

export async function registerWebinar({ webinar_id, reason }) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/registrations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ webinar_id, reason, user_id: session?.user?.id }),
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data?.error || data?.detail || JSON.stringify(data));
  return data;
}
