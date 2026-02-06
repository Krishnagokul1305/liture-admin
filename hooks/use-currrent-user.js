"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchCurrentUser() {
  const res = await fetch("/api/users/current");
  const response = await res.json();
  return response.data;
}

export function useCurrentUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
  });

  return {
    user: data ?? null,
    isLoading,
  };
}
