import { auth } from "@/app/lib/auth";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function getAllInternships({
  search,
  is_active,
  time,
  page = 1,
  limit = 10,
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
  if (limit) params.append("limit", limit);

  const res = await fetch(`${API_BASE_URL}/internships/?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

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

export async function getAllInternshipsOptions() {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}/internships/options/`, {
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
  const res = await fetch(`${API_BASE_URL}/internships/`, {
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
  const res = await fetch(`${API_BASE_URL}/internships/${id}/`, {
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
  const res = await fetch(`${API_BASE_URL}/internships/${id}/`, {
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
  const res = await fetch(`${API_BASE_URL}/internships/${id}/`, {
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
