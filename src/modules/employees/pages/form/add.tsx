import { User, Building, FileText, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Outlet, useLocation } from 'react-router-dom';

const EmployeesAdd = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (active: boolean) =>
    `flex items-center gap-2 pb-2 cursor-default ${active ? 'text-primary-color font-semibold border-primary-color border-b-3' : 'text-dark font-light'
    }`;

  return (
    <div className="min-h-screen">
      <Card className="shadow-none">
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-6 mb-5">
              <div className={linkClass(isActive('/employees/add'))}>
                <User size={20} />
                Personal Information
              </div>
              <div className={linkClass(isActive('/employees/add/step-two'))}>
                <Building size={20} />
                Professional Information
              </div>
              <div className={linkClass(isActive('/employees/add/step-three'))}>
                <FileText size={20} />
                Documents
              </div>
              <div className={linkClass(isActive('/employees/add/step-four'))}>
                <Shield size={20} />
                Account Access
              </div>
            </div>

            <Outlet />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesAdd;
