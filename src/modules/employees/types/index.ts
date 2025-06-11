interface StepOne {
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
  imagePreview: string | null;
  imageFile: File | null;
  imagePath: string | null;
  employeeId?: string; 
}
export interface StepOneType {
  stepOne: StepOne;
  isDeleteAvatar: boolean;
  isEditing: boolean;
}
export interface StepTwo {
  employeeId: string;
  employeeid: string;
  userName: string;
  employeeType: string;
  department: string;
  designation: string;
  workDays: string;
  joiningDate: string;
  workLocation: string;
  emailAddress: string;
}
export interface FileWithMeta {
  id: string;
  name: string;
  url?: string;
  isExisting?: boolean;
  file?: File;
}

export interface StepThreeState {
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

interface StepFour {
  email: string;
  slackId: string;
  skypeId: string;
  githubId: string;
}

export interface FilterType {
  search: string;
  page: number;
  limit: number;
}

export interface PaginationType {
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

export interface EmployeeType {
  StepOne: StepOneType;
  StepTwo: StepTwo;
  StepThree: StepThreeState;
  StepFour: StepFour;
}
export interface TypeEmployee {
  StepOne: StepOne;
  StepTwo: StepTwo;
  StepThree: StepThreeState;
  StepFour: StepFour;
}

export interface RreateEmployeeResponse {
  employees: TypeEmployee[];
  pagination: PaginationType;
  message: string;
}
