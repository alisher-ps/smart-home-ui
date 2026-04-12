import apiRequest from "./client";

export const login = async (email, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async () => {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
};

export const getMe = async () => {
  return apiRequest("/auth/me");
};