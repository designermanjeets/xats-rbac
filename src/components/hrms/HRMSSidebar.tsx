
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  Users, 
  UserPlus, 
  Clock, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Building, 
  Shield,
  ChevronRight,
  CheckSquare,
  FileText,
  Mail,
  UserCheck,
  MapPin,
  Layers,
  CreditCard,
  TrendingUp,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/hrms",
    isActive: true
  },
  {
    title: "Human Resources",
    icon: Users,
    items: [
      { title: "Users Management", icon: Users, url: "/hrms/users" },
      { title: "Employee Profiles", icon: UserCheck, url: "/hrms/employees" },
      { title: "Add Employee", icon: UserPlus, url: "/hrms/add-employee" }
    ]
  },
  {
    title: "Onboarding",
    icon: CheckSquare,
    items: [
      { title: "New Hire Checklist", icon: CheckSquare, url: "/hrms/checklist" },
      { title: "Pending Documents", icon: FileText, url: "/hrms/documents" },
      { title: "Offer Letter Templates", icon: FileText, url: "/hrms/offer-templates" },
      { title: "Assigned Buddy/Manager", icon: UserCheck, url: "/hrms/assignments" },
      { title: "Welcome Email Config", icon: Mail, url: "/hrms/welcome-config" }
    ]
  },
  {
    title: "Time Tracking",
    icon: Clock,
    items: [
      { title: "Submit Timesheet", icon: Clock, url: "/hrms/submit-timesheet" },
      { title: "Approve Timesheets", icon: CheckSquare, url: "/hrms/approve-timesheets" },
      { title: "View Timesheets", icon: FileText, url: "/hrms/view-timesheets" }
    ]
  },
  {
    title: "Leave Management",
    icon: Calendar,
    items: [
      { title: "Leave Calendar", icon: Calendar, url: "/hrms/leave-calendar" },
      { title: "Leave Balance", icon: BarChart3, url: "/hrms/leave-balance" },
      { title: "Leave Approvals", icon: CheckSquare, url: "/hrms/leave-approvals" },
      { title: "Submit Leave", icon: Calendar, url: "/hrms/submit-leave" }
    ]
  },
  {
    title: "Payroll",
    icon: DollarSign,
    items: [
      { title: "Salary Information", icon: DollarSign, url: "/hrms/salary-info" },
      { title: "Payslip Generator", icon: FileText, url: "/hrms/payslips" },
      { title: "Tax Deductions", icon: CreditCard, url: "/hrms/tax-deductions" },
      { title: "Payroll Run History", icon: BarChart3, url: "/hrms/payroll-history" },
      { title: "Payment Status", icon: CheckSquare, url: "/hrms/payment-status" }
    ]
  },
  {
    title: "Reports & Analytics",
    icon: TrendingUp,
    items: [
      { title: "Headcount Reports", icon: Users, url: "/hrms/headcount" },
      { title: "Leave Usage", icon: Calendar, url: "/hrms/leave-usage" },
      { title: "Timesheet vs Payroll", icon: BarChart3, url: "/hrms/timesheet-payroll" },
      { title: "Compliance Reports", icon: Shield, url: "/hrms/compliance" }
    ]
  },
  {
    title: "Company",
    icon: Building,
    items: [
      { title: "Bands", icon: Layers, url: "/hrms/bands" },
      { title: "Departments", icon: Building, url: "/hrms/departments" },
      { title: "Locations", icon: MapPin, url: "/hrms/locations" },
      { title: "User Types", icon: Users, url: "/hrms/user-types" }
    ]
  },
  {
    title: "Security & Settings",
    icon: Settings,
    items: [
      { title: "Role Management", icon: Shield, url: "/hrms/roles" },
      { title: "Notification Settings", icon: Bell, url: "/hrms/notifications" },
      { title: "Approval Rules", icon: CheckSquare, url: "/hrms/approval-rules" }
    ]
  }
];

export function HRMSSidebar() {
  const [openItems, setOpenItems] = useState<string[]>(['Human Resources']);

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">xATS-HRA</h2>
            <p className="text-xs text-gray-500">HRMS Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible 
                    open={openItems.includes(item.title)}
                    onOpenChange={() => toggleItem(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={cn(
                          "w-full justify-between hover:bg-blue-50 hover:text-blue-700",
                          openItems.includes(item.title) && "bg-blue-50 text-blue-700"
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronRight 
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openItems.includes(item.title) && "rotate-90"
                          )} 
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-blue-50 hover:text-blue-700"
                            >
                              <a href={subItem.url} className="flex items-center space-x-2">
                                <subItem.icon className="h-3 w-3" />
                                <span className="text-sm">{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={cn(
                      "hover:bg-blue-50 hover:text-blue-700",
                      item.isActive && "bg-blue-100 text-blue-700 font-medium"
                    )}
                  >
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>System Online</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
