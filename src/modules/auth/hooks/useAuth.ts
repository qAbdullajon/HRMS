import { useMutation } from "@tanstack/react-query";
import { changePassword, forgotPassword, loginUser, registerUser, resetPassword } from "../service/authApi";
import type { ChangePass, ForgotPassword, LoginData, RegisterData, ResetPassword } from "../types/authTypes";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
  });
};
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPassword) => forgotPassword(data),
  });
};

export const useRestetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPassword) => resetPassword(data),
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePass) => changePassword(data),
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => registerUser(data),
  });
};
