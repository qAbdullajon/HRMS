import { useState, useMemo } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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

const Employees = () => {
  const navigator = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample employee data
  const employees = [
    {
      id: 1,
      employeeId: '345321231',
      name: 'Darlene Robertson',
      department: 'Design',
      designation: 'UI/UX Designer',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 2,
      employeeId: '987890345',
      name: 'Floyd Miles',
      department: 'Development',
      designation: 'PHP Developer',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 3,
      employeeId: '453367122',
      name: 'Cody Fisher',
      department: 'Sales',
      designation: 'Sales Manager',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 4,
      employeeId: '345321231',
      name: 'Dianne Russell',
      department: 'Sales',
      designation: 'BDM',
      type: 'Remote',
      status: 'Permanent',
    },
    {
      id: 5,
      employeeId: '453677881',
      name: 'Savannah Nguyen',
      department: 'Design',
      designation: 'Design Lead',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 6,
      employeeId: '009918765',
      name: 'Jacob Jones',
      department: 'Development',
      designation: 'Python Developer',
      type: 'Remote',
      status: 'Permanent',
    },
    {
      id: 7,
      employeeId: '238870122',
      name: 'Marvin McKinney',
      department: 'Development',
      designation: 'Sr. UI Developer',
      type: 'Remote',
      status: 'Permanent',
    },
    {
      id: 8,
      employeeId: '124335111',
      name: 'Brooklyn Simmons',
      department: 'PM',
      designation: 'Project Manager',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 9,
      employeeId: '435540099',
      name: 'Kristin Watson',
      department: 'HR',
      designation: 'HR Executive',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 10,
      employeeId: '009812890',
      name: 'Kathryn Murphy',
      department: 'Development',
      designation: 'React JS Developer',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 11,
      employeeId: '671190345',
      name: 'Arlene McCoy',
      department: 'Development',
      designation: 'Node JS',
      type: 'Office',
      status: 'Permanent',
    },
    {
      id: 12,
      employeeId: '091233412',
      name: 'Devon Lane',
      department: 'BA',
      designation: 'Business Analyst',
      type: 'Remote',
      status: 'Permanent',
    }
  ];

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.includes(searchTerm)
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-cyan-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto border border-[#A2A1A833] rounded-[10px]">
        {/* Header */}
        <Card className='border-none shadow-none'>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={()=>navigator('/employees/add')} className="bg-primary-color w-fit hover:bg-primary-color/90">
                  <Plus className="w-4 h-4 mr-0" />
                  Add New Employee
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Table */}
        <Card className='border-none shadow-none py-0'>
          <CardContent className="px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-gray font-light'>Employee Name</TableHead>
                  <TableHead className='text-gray font-light'>Employee ID</TableHead>
                  <TableHead className='text-gray font-light'>Department</TableHead>
                  <TableHead className='text-gray font-light'>Designation</TableHead>
                  <TableHead className='text-gray font-light'>Type</TableHead>
                  <TableHead className='text-gray font-light'>Status</TableHead>
                  <TableHead className='text-gray font-light'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className={`${getAvatarColor(employee.name)} text-white`}>
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-dark font-light">{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-dark font-light">{employee.employeeId}</TableCell>
                    <TableCell className="text-dark font-light">{employee.department}</TableCell>
                    <TableCell className="text-dark font-light">{employee.designation}</TableCell>
                    <TableCell className="text-dark font-light">{employee.type}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-primary-bg text-primary-color text-sm font-light px-2 py-[3px]">
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} out of {filteredEmployees.length} records</span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Employees;