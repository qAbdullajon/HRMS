import $api from "@/http/api";
import type { RreateEmployeeResponse, FilterType } from "../types";

export const employeeAdd = async (
  data: FormData
): Promise<RreateEmployeeResponse> => {
  const response = await $api.post("/employee/create", data);
  return response.data;
};

export const employeeGetAll = async (
  pagination: FilterType
): Promise<RreateEmployeeResponse> => {
  const { page, limit, search } = pagination;
  const response = await $api.get(
    `/employee/get/all?page=${page}&limit=${limit}&search=${search}`
  );
  return response.data;
};

export const employeeDelete = async (employeeId: string) => {
  const response = await $api.delete(`/employee/delete/${employeeId}`);
  return response.data;
};

export const employeeUpdate = async (id: string, data: FormData) => {
  try {
    const response = await $api.put(`/employee/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('employeeUpdate error:', error);
    throw error;
  }
};