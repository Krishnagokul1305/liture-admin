"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchCurrentUser() {
  const res = await fetch("/api/auth/me");

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  const data = await res.json();
  return data.user;
}

export function useCurrentUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    user: data ?? null,
    isLoading,
  };
}
