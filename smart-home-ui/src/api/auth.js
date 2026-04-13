import { apiFetch } from "./client";

export const login = async (data) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const register = async (data) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getMe = async () => {
  return apiFetch("/auth/me");
};

export const logout = async () => {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
};