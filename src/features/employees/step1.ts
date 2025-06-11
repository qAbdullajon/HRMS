import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StepOneType {
  stepOne: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    emailAddress: string;
    dateOfBirth: string;
    maritalStatus: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    imageFile: File | null;
    imagePreview: string | null;
    imagePath: string | null;
    id?: number;
    employeeId?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  isEditing: boolean;
  isDeleteAvatar: boolean;
}

const initialBaseState: StepOneType = {
  stepOne: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    imageFile: null,
    imagePreview: null,
    imagePath: null,
  },
  isEditing: false,
  isDeleteAvatar: false,
};

const validateStepOne = (data: unknown): Partial<StepOneType> => {
  if (!data || typeof data !== "object") return {};
  const validData: Partial<StepOneType> = {};
  if ("stepOne" in data && typeof data.stepOne === "object" && data.stepOne) {
    const stepOne: Partial<StepOneType["stepOne"]> = {};
    const rawStepOne = (data as any).stepOne; // 💡 workaround
    const fields: (keyof StepOneType["stepOne"])[] = [
      "firstName",
      "lastName",
      "mobileNumber",
      "emailAddress",
      "dateOfBirth",
      "maritalStatus",
      "gender",
      "nationality",
      "address",
      "city",
      "state",
      "zipCode",
      "imagePath",
      "createdAt",
      "updatedAt",
    ];
    for (const field of fields) {
      const value = rawStepOne[field];
      if (typeof value === "string") {
        stepOne[field] = value as any; // yoki: stepOne[field as keyof typeof stepOne] = value;
      }
    }

    if ("id" in data.stepOne && typeof data.stepOne.id === "number") {
      stepOne.id = data.stepOne.id;
    }
    if (
      "employeeId" in data.stepOne &&
      typeof data.stepOne.employeeId === "string"
    ) {
      stepOne.employeeId = data.stepOne.employeeId;
    }
    if (
      "imageFile" in data.stepOne &&
      (data.stepOne.imageFile === null ||
        data.stepOne.imageFile instanceof File)
    ) {
      stepOne.imageFile = data.stepOne.imageFile;
    }
    if (
      "imagePreview" in data.stepOne &&
      (data.stepOne.imagePreview === null ||
        typeof data.stepOne.imagePreview === "string")
    ) {
      stepOne.imagePreview = data.stepOne.imagePreview;
    }
    (validData.stepOne as any) = stepOne;
  }
  if ("isEditing" in data && typeof data.isEditing === "boolean") {
    validData.isEditing = data.isEditing;
  }
  if ("isDeleteAvatar" in data && typeof data.isDeleteAvatar === "boolean") {
    validData.isDeleteAvatar = data.isDeleteAvatar;
  }
  return validData;
};

const loadState = (): StepOneType => {
  try {
    const saved = localStorage.getItem("stepOneState");
    if (!saved) return initialBaseState;
    const parsed = JSON.parse(saved);
    const validated = validateStepOne(parsed);
    const mergedState = {
      ...initialBaseState,
      ...validated,
      stepOne: {
        ...initialBaseState.stepOne,
        ...validated.stepOne,
      },
    };
    console.log("Loaded stepOneState from localStorage:", mergedState);
    return mergedState;
  } catch (error) {
    console.error("Failed to load stepOneState from localStorage:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    return initialBaseState;
  }
};

const saveState = (state: StepOneType): void => {
  try {
    const serializableState = {
      ...state,
      stepOne: {
        ...state.stepOne,
        imageFile: null,
      },
    };
    localStorage.setItem("stepOneState", JSON.stringify(serializableState));
    console.log("Saved stepOneState to localStorage:", serializableState);
  } catch (error) {
    console.error("Failed to save stepOneState to localStorage:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};

const stepOneSlice = createSlice({
  name: "StepOne",
  initialState: loadState(),
  reducers: {
    updateStepOne: (
      state,
      action: PayloadAction<Partial<StepOneType["stepOne"]>>
    ) => {
      state.stepOne = { ...state.stepOne, ...action.payload };
      saveState(state);
    },
    setImagePreview: (state, action: PayloadAction<string | null>) => {
      state.stepOne.imagePreview = action.payload;
      saveState(state);
    },
    setImageFile: (state, action: PayloadAction<File | null>) => {
      state.stepOne.imageFile = action.payload;
      saveState(state);
    },
    resetStepOne: () => {
      localStorage.removeItem("stepOneState");
      return { ...initialBaseState };
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
      saveState(state);
    },
    setDeleteAvatar: (state) => {
      state.stepOne.imagePath = null;
      state.stepOne.imageFile = null;
      state.stepOne.imagePreview = null;
      state.isDeleteAvatar = true;
      saveState(state);
    },
  },
});

export const {
  updateStepOne,
  setImagePreview,
  setImageFile,
  resetStepOne,
  setIsEdit,
  setDeleteAvatar,
} = stepOneSlice.actions;
export default stepOneSlice.reducer;
