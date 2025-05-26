
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { HRMSSidebar } from '@/components/hrms/HRMSSidebar';
import { HRMSNavbar } from '@/components/hrms/HRMSNavbar';
import { DashboardWidgets } from '@/components/hrms/DashboardWidgets';
import { DashboardCharts } from '@/components/hrms/DashboardCharts';
import { DashboardTables } from '@/components/hrms/DashboardTables';

const HRMSDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <HRMSSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <HRMSNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex-1 overflow-auto p-6 space-y-6">
            <DashboardWidgets />
            <DashboardCharts />
            <DashboardTables searchTerm={searchTerm} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default HRMSDashboard;
