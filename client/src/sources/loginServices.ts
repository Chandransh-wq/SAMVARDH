// src/sources/userServices.ts
import api from "./api";

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Login
export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

// Register
export const registerUser = async (name: string, email: string, password: string): Promise<{ newUser: string; token: string }> => {
  const response = await api.post("/register", { name, email, password });
  return response.data;
};
