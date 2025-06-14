import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Dashboard, Employees, EmployeesAdd, ForgotPassword, Login, ResetPasswordPage, StepFour, StepOne, StepThree, StepTwo, VerifyPage } from './modules';
import MainLayout from './layout/mainLayout';
import ViewEmployeeLayout from "./modules/employees/pages/view/viewEmployeeLayout";
import Attendance from "./modules/employees/pages/view/attendance";
import ViewProfile from "./modules/employees/pages/view/profile";
import Projects from "./modules/employees/pages/view/projects";
import Leave from "./modules/employees/pages/view/leave";

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify' element={<VerifyPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />

        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/employees/:id' element={<ViewEmployeeLayout />}>
            <Route index element={<ViewProfile />} />
            <Route path='/employees/:id/attendance' element={<Attendance />} />
            <Route path='/employees/:id/projects' element={<Projects />} />
            <Route path='/employees/:id/leave' element={<Leave />} />
          </Route>
          <Route path='/employees/add' element={<EmployeesAdd />}>
            <Route index element={<StepOne />} />
            <Route path="/employees/add/step-two" element={<StepTwo />} />
            <Route path="/employees/add/step-three" element={<StepThree />} />
            <Route path="/employees/add/step-four" element={<StepFour />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default index