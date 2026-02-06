import { auth } from "@/app/lib/auth";

const API_BASE_URL = process.env.DJANGO_API_URL;

export async function getDashboardStats() {
  const session = await auth();
  try {
    const res = await fetch(`${API_BASE_URL}/stats/dashboard/`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

// stats/past_registrations/

export async function getPastRegistration() {
  const session = await auth();
  try {
    const res = await fetch(`${API_BASE_URL}/stats/past_registrations/`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

// recent_registrations
export async function getRecentRegistration() {
  const session = await auth();
  try {
    const res = await fetch(`${API_BASE_URL}/stats/recent_registrations/`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

// registration_status

export async function getRegistrationStatus() {
  const session = await auth();
  try {
    const res = await fetch(`${API_BASE_URL}/stats/registration_status/`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}
