import { auth } from "@/app/lib/auth";

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
} = {}) {
  const session = await auth();
  const params = new URLSearchParams();

  if (search) params.append("title", search);
  if (is_active) params.append("is_active", is_active);

  // Handle time filter with event_date_before and event_date_after
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

  const res = await fetch(`${API_BASE_URL}/webinars/?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

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

export async function getAllWebinarsMinimal() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/minimal/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data?.results || [];
}

/* ============================
   CREATE WEBINAR
============================ */
export async function createWebinar(data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/`, {
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
  const res = await fetch(`${API_BASE_URL}/webinars/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function updateWebinar(id, data) {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/webinars/${id}/`, {
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
  const res = await fetch(`${API_BASE_URL}/webinars/${id}/`, {
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
