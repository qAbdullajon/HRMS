import { $axios } from "@/http";
import type { AuthResMessage, AuthResponse, ChangePass, ForgotPassword, LoginData, RegisterData, ResetPassword } from "../types/authTypes";

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await $axios.post(`/auth/login`, data);
  return response.data;
};
export const forgotPassword = async (data: ForgotPassword): Promise<AuthResMessage> => {
  const response = await $axios.post(`/auth/forgot-password`, data);
  return response.data;
};
export const resetPassword = async (data: ResetPassword): Promise<AuthResMessage> => {
  const response = await $axios.post(`/auth/reset-password`, data);
  return response.data;
};

export const changePassword = async (data: ChangePass): Promise<AuthResMessage> => {
  const response = await $axios.post(`/auth/change-password`, data);
  return response.data;
};

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await $axios.post(`/register`, data);
  return response.data;
};
