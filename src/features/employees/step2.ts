import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define StepTwo interface (ensure it matches your types)
interface StepTwo {
  employeeid: string;
  employeeId?: string; // Optional, as seen empty in req.body
  userName: string;
  employeeType: string;
  department: string;
  designation: string;
  workDays: string;
  joiningDate: string;
  workLocation: string;
  emailAddress: string;
}

const initialBaseState: StepTwo = {
  employeeid: "",
  employeeId: "",
  userName: "",
  employeeType: "",
  department: "",
  designation: "",
  workDays: "",
  joiningDate: "",
  workLocation: "",
  emailAddress: "",
};

const validateStepTwo = (data: unknown): Partial<StepTwo> => {
  if (!data || typeof data !== "object") return {};

  const rawData = data as Record<string, unknown>;
  const validData: Partial<StepTwo> = {};

  const fields: (keyof StepTwo)[] = [
    "employeeid",
    "employeeId",
    "userName",
    "employeeType",
    "department",
    "designation",
    "workDays",
    "joiningDate",
    "workLocation",
    "emailAddress",
  ];

  for (const field of fields) {
    if (typeof rawData[field] === "string") {
      validData[field] = rawData[field] as string;
    }
  }

  return validData;
};

const loadFromLocalStorage = (): Partial<StepTwo> => {
  try {
    const serializedState = localStorage.getItem("stepTwoState");
    if (!serializedState) return {};
    const parsed = JSON.parse(serializedState);
    const validated = validateStepTwo(parsed);
    console.log("Loaded stepTwoState from localStorage:", validated);
    return validated;
  } catch (err) {
    console.error("Failed to load stepTwoState from localStorage:", {
      message: (err as Error).message,
      stack: (err as Error).stack,
    });
    return {};
  }
};

const saveToLocalStorage = (state: StepTwo): void => {
  try {
    localStorage.setItem("stepTwoState", JSON.stringify(state));
    console.log("Saved stepTwoState to localStorage:", state);
  } catch (err) {
    console.error("Failed to save stepTwoState to localStorage:", {
      message: (err as Error).message,
      stack: (err as Error).stack,
    });
  }
};

const initialState: StepTwo = {
  ...initialBaseState,
  ...loadFromLocalStorage(),
};

const stepTwoSlice = createSlice({
  name: "stepTwo",
  initialState,
  reducers: {
    updateStepTwoValues: (state, action: PayloadAction<Partial<StepTwo>>) => {
      const newState = { ...state, ...action.payload };
      saveToLocalStorage(newState);
      return newState;
    },
    resetStepTwo: () => {
      localStorage.removeItem("stepTwoState");
      return { ...initialBaseState };
    },
  },
});

export const { updateStepTwoValues, resetStepTwo } = stepTwoSlice.actions;

export default stepTwoSlice.reducer;
