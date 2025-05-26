
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Users, Shield, Key, ExternalLink, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TenantOverviewProps {
  searchTerm: string;
}

const TenantOverview = ({ searchTerm }: TenantOverviewProps) => {
  const tenants = [
    {
      id: 'hrms',
      name: 'HRMS Platform',
      domain: 'hrms.xats.com',
      description: 'Human Resource Management System',
      admin: 'Shubham Sharma',
      email: 'shubham.sharma@hrms.com',
      status: 'active',
      users: 45,
      roles: 5,
      permissions: 16,
      modules: ['Employee', 'Department', 'Leave', 'Payroll'],
      lastActivity: '2 hours ago',
      usagePercentage: 78
    },
    {
      id: 'crm',
      name: 'CRM Platform',
      domain: 'crm.xats.com',
      description: 'Customer Relationship Management',
      admin: 'Arvind Sharma',
      email: 'arvind.sharma@crm.com',
      status: 'active',
      users: 32,
      roles: 4,
      permissions: 14,
      modules: ['Lead', 'Customer', 'Deal'],
      lastActivity: '15 minutes ago',
      usagePercentage: 65
    },
    {
      id: 'accounting',
      name: 'Accounting Platform',
      domain: 'accounting.xats.com',
      description: 'Finance & Accounting Management',
      admin: 'Varun Thakur',
      email: 'varun.thakur@accounting.com',
      status: 'active',
      users: 28,
      roles: 4,
      permissions: 12,
      modules: ['Invoice', 'Expense', 'Financial'],
      lastActivity: '1 hour ago',
      usagePercentage: 52
    },
    {
      id: 'xats',
      name: 'XATS Platform',
      domain: 'xats.com',
      description: 'Applicant Tracking System',
      admin: 'Karan Rana',
      email: 'karan.rana@xats.com',
      status: 'active',
      users: 51,
      roles: 4,
      permissions: 14,
      modules: ['Job', 'Candidate', 'Interview'],
      lastActivity: '30 minutes ago',
      usagePercentage: 82
    }
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tenant Overview</h2>
          <p className="text-gray-600">Manage and monitor platform tenants</p>
        </div>
        <Button>
          <Building className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{tenant.domain}</span>
                      <ExternalLink className="h-3 w-3" />
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'}>
                    {tenant.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{tenant.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Resource Usage</span>
                  <span className="font-medium">{tenant.usagePercentage}%</span>
                </div>
                <Progress value={tenant.usagePercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{tenant.users}</span>
                  </div>
                  <p className="text-xs text-gray-500">Users</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{tenant.roles}</span>
                  </div>
                  <p className="text-xs text-gray-500">Roles</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Key className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{tenant.permissions}</span>
                  </div>
                  <p className="text-xs text-gray-500">Permissions</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Administrator</span>
                  <span className="text-xs text-gray-500">Last activity: {tenant.lastActivity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {tenant.admin.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tenant.admin}</p>
                    <p className="text-xs text-gray-500">{tenant.email}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Modules</p>
                <div className="flex flex-wrap gap-1">
                  {tenant.modules.map((module) => (
                    <Badge key={module} variant="secondary" className="text-xs">
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TenantOverview;
