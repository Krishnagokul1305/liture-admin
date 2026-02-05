"use client";

import { getCurrentUser } from "@/service/userService";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
  return {
    user: data ?? null,
    isLoading,
  };
}
