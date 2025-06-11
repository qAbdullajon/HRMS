import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StepFourState {
  email: string;
  slackId: string;
  skypeId: string;
  githubId: string;
}

const baseInitialState: StepFourState = {
  email: "",
  slackId: "",
  skypeId: "",
  githubId: "",
};

const loadFromLocalStorage = (): Partial<StepFourState> => {
  try {
    const serializedState = localStorage.getItem("stepFourState");
    if (serializedState) {
      const state = JSON.parse(serializedState) as Partial<StepFourState>;
      // Validate loaded state
      return {
        email: typeof state.email === "string" ? state.email : baseInitialState.email,
        slackId: typeof state.slackId === "string" ? state.slackId : baseInitialState.slackId,
        skypeId: typeof state.skypeId === "string" ? state.skypeId : baseInitialState.skypeId,
        githubId: typeof state.githubId === "string" ? state.githubId : baseInitialState.githubId,
      };
    }
  } catch (err) {
    console.error("Failed to load stepFourState from localStorage:", err);
  }
  return baseInitialState;
};

const initialState: StepFourState = {
  ...baseInitialState,
  ...loadFromLocalStorage(),
};

const saveToLocalStorage = (state: StepFourState) => {
  try {
    localStorage.setItem("stepFourState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save stepFourState to localStorage:", err);
  }
};

const stepFourSlice = createSlice({
  name: "StepFour",
  initialState,
  reducers: {
    updateStepFourValues(state, action: PayloadAction<Partial<StepFourState>>) {
      Object.assign(state, action.payload);
      saveToLocalStorage(state);
    },
    resetStepFour() {
      localStorage.removeItem("stepFourState");
      return baseInitialState;
    },
  },
});

export const { updateStepFourValues, resetStepFour } = stepFourSlice.actions;
export default stepFourSlice.reducer;