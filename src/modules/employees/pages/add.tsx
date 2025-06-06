import { User, Building, FileText, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { NavLink, Outlet } from 'react-router-dom';

const EmployeesAdd = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 pb-2 ${isActive ? 'text-primary-color font-semibold border-primary-color border-b-3' : 'text-dark font-light'}`;

  return (
    <div className="min-h-screen">
      <Card className="shadow-none">
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-6 mb-5">
              <NavLink to="/employees/add" end className={linkClass}>
                <User size={20} />
                Personal Information
              </NavLink>
              <NavLink to="/employees/add/step-two" className={linkClass}>
                <Building size={20} />
                Professional Information
              </NavLink>
              <NavLink to="/employees/add/step-three" className={linkClass}>
                <FileText size={20} />
                Documents
              </NavLink>
              <NavLink to="/employees/add/step-four" className={linkClass}>
                <Shield size={20} />
                Account Access
              </NavLink>
            </div>

            <Outlet />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesAdd;
