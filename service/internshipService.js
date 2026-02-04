import { auth } from "@/app/lib/auth";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function getAllInternships({
  search,
  status,
  time,
  page = 1,
  limit = 10,
} = {}) {
  const session = await auth();
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (time) params.append("time", time);
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  console.log(response);
  if (!res.ok) {
    throw response;
  }

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
