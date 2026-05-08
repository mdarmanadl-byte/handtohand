"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, login, signup } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({ token: data.accessToken, user: data.user });
    },
  });
}

export function useSignupMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setAuth({ token: data.accessToken, user: data.user });
    },
  });
}

export function useCurrentUser() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    enabled: Boolean(token),
  });
}
