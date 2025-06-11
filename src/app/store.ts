// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/forgot-password/emailSlice";
import authReducer from "../features/auth/authSlice";
import stepOneReducer from "../features/employees/step1";
import stepTwoReducer from "../features/employees/step2";
import stepThreeReducer from "../features/employees/step3"
import stepFourReducer from "../features/employees/step4"
import filterSlice from "../features/employees/filter"

export const store = configureStore({
  reducer: {
    forgotEmail: emailReducer,
    auth: authReducer,
    StepOne: stepOneReducer,
    StepTwo: stepTwoReducer,
    StepThree: stepThreeReducer,
    StepFour: stepFourReducer,
    filter: filterSlice,
  },
});

// Type'lar
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
