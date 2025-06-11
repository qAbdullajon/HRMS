import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight, CirclePlus, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDeleteEmployee, useGetEmployee } from '../hooks/useEmployee';
import { useDispatch } from 'react-redux';
import { openFilter } from '@/features/employees/filter';
import FilterModal from './filter';
import ConfirmLeaveModal from '@/components/confirm-leave-modal';
import { setIsEdit, updateStepOne } from '@/features/employees/step1';
import type { TypeEmployee } from '../types';
import { updateStepTwoValues } from '@/features/employees/step2';
import { setInitialDocuments } from '@/features/employees/step3';
import { updateStepFourValues } from '@/features/employees/step4';

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [employeeId, setEmployeeId] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    search: '',
    currentPage: 1,
    itemsPerPage: 10,
  });
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { data, isLoading, isError, error } = useGetEmployee({
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
    search: pagination.search,
  });

  const employees = data?.employees || [];

  const backendPagination = data?.pagination || {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10,
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= backendPagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: Number(value),
      currentPage: 1,
    }));
  };

  const handleSearchChange = (value: string) => {
    setPagination((prev) => ({
      ...prev,
      search: value,
      currentPage: 1,
    }));
  };

  const handleFilter = () => {
    dispatch(openFilter());
  };

  const getInitials = (firstName: string = '', lastName: string = '') => {
    const initials = [firstName, lastName]
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
    return initials || 'N/A';
  };

  const getAvatarColor = (name: string = '') => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-600',
      'bg-red-500',
      'bg-cyan-500',
    ];
    const index = name.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const handleDelete = (employeeId: string) => {
    deleteEmployee(employeeId);
    setEmployeeId(null)
    setOpen(false)
  };
  const handleEdit = (employee: TypeEmployee) => {
    dispatch(setIsEdit(true));
    dispatch(updateStepOne({ ...employee.StepOne }));
    
    dispatch(updateStepTwoValues({ ...employee.StepTwo }));
    dispatch(setInitialDocuments({ ...employee.StepThree.view }));
    dispatch(updateStepFourValues({...employee.StepFour}))
    navigate('/employees/add');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-sm">
        {/* Header */}
        <Card className="border-none shadow-none">
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative max-w-md w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  aria-hidden="true"
                />
                <Input
                  inputSize="lg"
                  type="text"
                  placeholder="Search employees..."
                  value={pagination.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                  aria-label="Search employees"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => navigate('/employees/add')}
                  className="bg-primary-color hover:bg-primary-color/90 text-white w-fit font-light !px-5"
                  aria-label="Add new employee"
                >
                  <CirclePlus className="mr-[10px] !w-5 !h-5" />
                  Add New Employee
                </Button>
                <Button onClick={handleFilter} variant="outline" aria-label="Filter employees">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin text-primary-color">
                <Loader size={40} />
              </div>
              <p className="text-gray-600 text-lg">Loading employees...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-red-600 text-lg">Error: {error?.message || 'Failed to load employees'}</p>
          </div>
        ) : employees.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-gray-600 text-lg">No employees found</p>
          </div>
        ) : (
          <Card className="border-none shadow-none py-0">
            <CardContent className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray font-light">Employee Name</TableHead>
                    <TableHead className="text-gray font-light">Employee ID</TableHead>
                    <TableHead className="text-gray font-light">Department</TableHead>
                    <TableHead className="text-gray font-light">Designation</TableHead>
                    <TableHead className="text-gray font-light">Type</TableHead>
                    <TableHead className="text-gray font-light">Status</TableHead>
                    <TableHead className="text-gray font-light">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {employee.StepOne?.imagePath ? (
                              <img
                                src={`http://localhost:5000${employee.StepOne?.imagePath}`}
                                alt={`${employee.StepOne.firstName} ${employee.StepOne.lastName}`}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <AvatarFallback
                                className={`${getAvatarColor(employee.StepOne?.firstName)} text-white`}
                              >
                                {getInitials(employee.StepOne?.firstName, employee.StepOne?.lastName)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-gray-800">
                            {employee.StepOne?.firstName || ''}{' '}
                            {employee.StepOne?.lastName || ''}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {employee.StepTwo?.employeeid || 'N/A'}
                      </TableCell>
                      <TableCell className="text-gray-800 capitalize">
                        {employee.StepTwo?.department || 'N/A'}
                      </TableCell>
                      <TableCell className="text-gray-800 capitalize">
                        {employee.StepTwo?.designation || 'N/A'}
                      </TableCell>
                      <TableCell className="text-gray-800 capitalize">
                        {employee.StepTwo?.employeeType || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-primary-bg text-primary-color px-2 py-1 capitalize"
                        >
                          {employee.StepOne?.maritalStatus || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="View employee details"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Edit employee"
                            title="Edit"
                            onClick={() => handleEdit(employee)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Delete employee"
                            title="Delete"
                            onClick={() => {
                              setEmployeeId(employee.StepTwo.employeeId);
                              setOpen(true)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show</span>
                  <Select
                    value={pagination.itemsPerPage.toString()}
                    onValueChange={handleItemsPerPageChange}
                  >
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>
                    Showing {(backendPagination.currentPage - 1) * backendPagination.itemsPerPage + 1} to{' '}
                    {Math.min(
                      backendPagination.currentPage * backendPagination.itemsPerPage,
                      backendPagination.totalItems
                    )}{' '}
                    of {backendPagination.totalItems} records
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="h-8 w-8"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {[...Array(backendPagination.totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <Button
                        key={page}
                        variant={pagination.currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="h-8 w-8 p-0"
                        aria-label={`Go to page ${page}`}
                      >
                        {page}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === backendPagination.totalPages}
                    className="h-8 w-8"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <FilterModal />
      <ConfirmLeaveModal open={open} setOpen={setOpen} onConfirm={() => handleDelete(employeeId as string)} title='Delete Employee' desc='Are you sure you want to delete this employee? This action cannot be undone.' />
    </div>
  );
};

export default Employees;