import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Dashboard, Employees, EmployeesAdd, ForgotPassword, Login, ResetPasswordPage, StepFour, StepOne, StepThree, StepTwo, VerifyPage } from './modules';
import MainLayout from './layout/mainLayout';

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