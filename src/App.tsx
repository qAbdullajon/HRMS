import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Dashboard, Employees, ForgotPassword, Login, ResetPasswordPage, VerifyPage } from './modules';
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
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default index