import api from "./api";
import type { AuthUser } from "../context/authStore";

type SessionResponse = { token: string; user: AuthUser };

export const register = async (email: string, password: string) => {
  const { data } = await api.post<AuthUser>("/auth/register", {
    email,
    password,
  });
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<SessionResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<AuthUser>("/auth/me");
  return data;
};
