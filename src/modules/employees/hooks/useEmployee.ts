import { useMutation, useQuery } from '@tanstack/react-query';
import { employeeAdd, employeeDelete, employeeGetAll, employeeUpdate } from '../service/employeeApi';
import type { FilterType, RreateEmployeeResponse } from '../types';
import { useQueryClient } from '@tanstack/react-query';

export const useEmployeeCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => employeeAdd(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: Error) => {
      console.error('Xodim qo\'shishda xatolik:', error.message);
    },
  });
};

export const useGetEmployee = (pagination: FilterType) => {
  const { page, limit, search } = pagination;
  return useQuery<RreateEmployeeResponse>({
    queryKey: ['employees', page, limit, search],
    queryFn: () => employeeGetAll(pagination),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: employeeDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error) => {
      console.error('Xatolik yuz berdi:', error);
    }
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => employeeUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee'] });
    },
    onError: (error: Error) => {
      console.error('Xodim yangilashda xatolik:', error);
    },
  });
};