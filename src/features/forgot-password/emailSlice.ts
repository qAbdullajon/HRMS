// src/features/email/emailSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EmailState {
  email: string;
  state: "sendCode" | "passChange"
}

const savedEmail = sessionStorage.getItem("email");

const initialState: EmailState = {
  email: savedEmail ? JSON.parse(savedEmail) : null,
  state: "sendCode"
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    createEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      sessionStorage.setItem("email", JSON.stringify(action.payload)); 
    },
    setStatePass(state){
      state.state = "passChange"
    },
    setStateCode(state) {
      state.state = "sendCode"
    },
    reset(state) {
      state.email = "";
      state.state = "sendCode"
      sessionStorage.removeItem("email"); 
    },
  },
});

export const { createEmail, reset, setStatePass, setStateCode } = emailSlice.actions;
export default emailSlice.reducer;
