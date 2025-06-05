// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import emailSlice from "../features/forgot-password/emailSlice"

export const store = configureStore({
  reducer: {
    forgotEmail: emailSlice,
  },
})

// Type'lar
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
