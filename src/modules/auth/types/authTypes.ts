export interface LoginData {
  email: string;
  password: string;
}
export interface ForgotPassword {
  email: string;
}
export interface ResetPassword {
  email: string;
  code: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface ChangePass {
  password: string;
  confirmPassword?: string;
  email: string;
  code: string
}

export interface AuthResMessage {
  message: string
}
export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
