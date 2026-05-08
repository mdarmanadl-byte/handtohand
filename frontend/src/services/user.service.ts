import type { ApiEnvelope, AuthUser } from "@/types";
import { api } from "./api";

export async function fetchUsers() {
  const response = await api.get<ApiEnvelope<AuthUser[]>>("/users");
  return response.data.data;
}

export async function fetchUser(userId: string) {
  const response = await api.get<ApiEnvelope<AuthUser>>(`/users/${userId}`);
  return response.data.data;
}
