import { useState } from 'react';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeFilter, openFilter } from '@/features/employees/filter';

type Department =
  | 'Design'
  | 'Java'
  | 'HR'
  | 'Python'
  | 'Sales'
  | 'React JS'
  | 'Business Analyst'
  | 'Account'
  | 'Project Manager'
  | 'Node JS';

const FilterModal = () => {
  const isOpen = useSelector((state: RootState) => state.filter.isOpen)
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<Record<string, boolean>>({
    Design: true,
    Java: true,
    HR: false,
    Python: true,
    Sales: false,
    'React JS': false,
    'Business Analyst': false,
    Account: false,
    'Project Manager': true,
    'Node JS': false
  });

  const [workType, setWorkType] = useState('');

  const handleDepartmentChange = (dept: Department, checked: boolean) => {
    setSelectedDepartments(prev => ({
      ...prev,
      [dept]: checked
    }));
  };

  const handleApply = () => {
    console.log('Applied filters:', { selectedDepartments, workType, searchTerm });
    dispatch(openFilter());
  };

  const handleCancel = () => {
    dispatch(closeFilter());
  };

  const departments = [
    ['Design', 'Java'],
    ['HR', 'Python'],
    ['Sales', 'React JS'],
    ['Business Analyst', 'Account'],
    ['Project Manager', 'Node JS']
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) dispatch(closeFilter());
    }}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="px-6 py-4">
          <DialogTitle className="text-xl font-semibold">Filter</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          {/* Search Input */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Employee"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-muted-foreground"
              />
            </div>
          </div>

          {/* Department Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Department</Label>
            <div className="space-y-3">
              {departments.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-4">
                  {row.map((dept:any) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={dept}
                        checked={selectedDepartments[dept]}
                        onCheckedChange={(checked: any) => handleDepartmentChange(dept, checked)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor={dept}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {dept}
                      </Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Select Type Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Select Type</Label>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="radio"
                    id="office"
                    name="workType"
                    value="Office"
                    checked={workType === 'Office'}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${workType === 'Office'
                    ? 'border-blue-600'
                    : 'border-gray-300'
                    }`}>
                    {workType === 'Office' && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </div>
                <Label htmlFor="office" className="text-sm font-normal cursor-pointer">
                  Office
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="radio"
                    id="wfh"
                    name="workType"
                    value="Work from Home"
                    checked={workType === 'Work from Home'}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${workType === 'Work from Home'
                    ? 'border-blue-600'
                    : 'border-gray-300'
                    }`}>
                    {workType === 'Work from Home' && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </div>
                <Label htmlFor="wfh" className="text-sm font-normal cursor-pointer">
                  Work from Home
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex justify-between sm:justify-between space-x-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-12"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;