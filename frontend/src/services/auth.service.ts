import type { ApiEnvelope, AuthUser } from "@/types";
import { api } from "./api";

type AuthPayload = {
  user: AuthUser;
  accessToken: string;
};

export async function login(payload: { email: string; password: string }) {
  const response = await api.post<ApiEnvelope<AuthPayload>>("/auth/login", payload);
  return response.data.data;
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
  hostelName: string;
  wing: string;
}) {
  const response = await api.post<ApiEnvelope<AuthPayload>>("/auth/register", payload);
  return response.data.data;
}

export async function getMe() {
  const response = await api.get<ApiEnvelope<AuthUser>>("/auth/me");
  return response.data.data;
}
