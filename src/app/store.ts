// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/forgot-password/emailSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    forgotEmail: emailReducer,
    auth: authReducer,
  },
});

// Type'lar
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
