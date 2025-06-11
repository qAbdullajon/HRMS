import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface FileWithMeta {
  id: string;
  name: string;
  url?: string;
  isExisting?: boolean;
  file?: File;
}

interface StepThreeState {
  delete: {
    appointmentLetter: string[];
    relivingLetter: string[];
    salarySlips: string[];
    experienceLetter: string[];
  };
  view: {
    appointmentLetter: FileWithMeta[];
    relivingLetter: FileWithMeta[];
    salarySlips: FileWithMeta[];
    experienceLetter: FileWithMeta[];
  };
  files: {
    appointmentLetter: FileWithMeta[];
    relivingLetter: FileWithMeta[];
    salarySlips: FileWithMeta[];
    experienceLetter: FileWithMeta[];
  };
}

type DocumentField = keyof StepThreeState['view'];

interface FileActionPayload {
  field: DocumentField;
  files: FileWithMeta[];
}

const initialState: StepThreeState = {
  delete: {
    appointmentLetter: [],
    relivingLetter: [],
    salarySlips: [],
    experienceLetter: [],
  },
  view: {
    appointmentLetter: [],
    relivingLetter: [],
    salarySlips: [],
    experienceLetter: [],
  },
  files: {
    appointmentLetter: [],
    relivingLetter: [],
    salarySlips: [],
    experienceLetter: [],
  },
};

const loadState = (): StepThreeState => {
  try {
    const saved = localStorage.getItem("stepThreeState");
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
};

const saveState = (state: StepThreeState) => {
  try {
    const stateToSave = {
      ...state,
      files: Object.entries(state.files).reduce((acc, [key, value]) => {
        acc[key as DocumentField] = value.map(item => ({
          id: item.id,
          name: item.name,
          isExisting: item.isExisting,
          url: item.isExisting ? item.url : undefined,
        }));
        return acc;
      }, {} as Record<DocumentField, FileWithMeta[]>),
    };
    localStorage.setItem("stepThreeState", JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Saqlashda xato:", error);
  }
};

const stepThreeSlice = createSlice({
  name: "stepThree",
  initialState: loadState(),
  reducers: {
    setInitialDocuments(state, action: PayloadAction<Partial<StepThreeState['view']>>) {
      Object.entries(action.payload).forEach(([field, docs]) => {
        const documentsArray = Array.isArray(docs) ? docs : (docs ? [docs] : []);
        
        const docsWithMeta = documentsArray.map(doc => ({
          id: uuidv4(),
          name: typeof doc === 'string' ? doc : doc.name,
          url: typeof doc === 'string' ? doc : doc.url,
          isExisting: true,
        }));
        
        state.view[field as DocumentField] = docsWithMeta;
      });
      saveState(state);
    },

    addDocuments(state, action: PayloadAction<FileActionPayload>) {
      const { field, files } = action.payload;
      const newFiles = files.map(file => ({
        id: file.id,
        name: file.name,
        url: file.file ? URL.createObjectURL(file.file) : file.url,
        file: file.file,
        isExisting: file.isExisting || false,
      }));

      state.files[field] = [...state.files[field], ...newFiles.filter(f => f.file)];
      state.view[field] = [...state.view[field], ...newFiles];
      saveState(state);
    },

    removeDocument(state, action: PayloadAction<{ field: DocumentField; id: string }>) {
      const { field, id } = action.payload;
      const documentToRemove = state.view[field].find(doc => doc.id === id);
      if (!documentToRemove) return;

      if (documentToRemove.isExisting && documentToRemove.url) {
        state.delete[field] = [...state.delete[field], documentToRemove.url];
      } else if (documentToRemove.url) {
        URL.revokeObjectURL(documentToRemove.url);
      }

      state.files[field] = state.files[field].filter(doc => doc.id !== id);
      state.view[field] = state.view[field].filter(doc => doc.id !== id);
      saveState(state);
    },
    resetDocuments() {
      localStorage.removeItem('stepThreeState');
      return { ...initialState };
    },
  },
});

export const { setInitialDocuments, addDocuments, removeDocument, resetDocuments } = stepThreeSlice.actions;
export default stepThreeSlice.reducer;