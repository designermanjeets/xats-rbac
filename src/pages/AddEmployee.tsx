
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { HRMSSidebar } from '@/components/hrms/HRMSSidebar';
import { HRMSNavbar } from '@/components/hrms/HRMSNavbar';
import { AddEmployeeWizard } from '@/components/hrms/AddEmployeeWizard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <HRMSSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <HRMSNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/hrms')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
              </div>
              <AddEmployeeWizard />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AddEmployee;
