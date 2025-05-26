
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Plus, Edit, Trash, Users, Key, Building } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RoleManagementProps {
  searchTerm: string;
}

const RoleManagement = ({ searchTerm }: RoleManagementProps) => {
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const roles = [
    {
      id: '1',
      name: 'HRMS Administrator',
      description: 'Full administrative access to HRMS platform',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      userCount: 1,
      permissionSets: ['HRMS Administrator Full'],
      permissions: 16,
      isSystemRole: false,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Employee Manager',
      description: 'Manage employee records and basic HR operations',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      userCount: 8,
      permissionSets: ['HRMS Employee Management'],
      permissions: 4,
      isSystemRole: false,
      isActive: true,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Leave Manager',
      description: 'Approve and manage leave requests',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      userCount: 3,
      permissionSets: ['HRMS Leave Management'],
      permissions: 6,
      isSystemRole: false,
      isActive: true,
      createdAt: '2024-01-25'
    },
    {
      id: '4',
      name: 'CRM Administrator',
      description: 'Full administrative access to CRM platform',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      userCount: 1,
      permissionSets: ['CRM Administrator Full'],
      permissions: 14,
      isSystemRole: false,
      isActive: true,
      createdAt: '2024-02-01'
    },
    {
      id: '5',
      name: 'Lead Manager',
      description: 'Manage leads and customer relationships',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      userCount: 12,
      permissionSets: ['CRM Lead Management'],
      permissions: 5,
      isSystemRole: false,
      isActive: true,
      createdAt: '2024-02-05'
    }
  ];

  const permissionSets = {
    'hrms': [
      { id: 'hrms_admin_full', name: 'HRMS Administrator Full', permissions: 16 },
      { id: 'hrms_employee_mgmt', name: 'HRMS Employee Management', permissions: 4 },
      { id: 'hrms_leave_mgmt', name: 'HRMS Leave Management', permissions: 6 },
      { id: 'hrms_payroll_mgmt', name: 'HRMS Payroll Management', permissions: 2 }
    ],
    'crm': [
      { id: 'crm_admin_full', name: 'CRM Administrator Full', permissions: 14 },
      { id: 'crm_lead_mgmt', name: 'CRM Lead Management', permissions: 5 },
      { id: 'crm_customer_mgmt', name: 'CRM Customer Management', permissions: 4 },
      { id: 'crm_deal_mgmt', name: 'CRM Deal Management', permissions: 5 }
    ]
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTenant = selectedTenant === 'all' || role.tenantId === selectedTenant;
    
    return matchesSearch && matchesTenant;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <p className="text-gray-600">Define and manage roles with permission sets</p>
        </div>
        <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role and assign permission sets.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Role Name</label>
                  <Input placeholder="Enter role name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Tenant</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hrms">HRMS Platform</SelectItem>
                      <SelectItem value="crm">CRM Platform</SelectItem>
                      <SelectItem value="accounting">Accounting Platform</SelectItem>
                      <SelectItem value="xats">XATS Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Enter role description" />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Permission Sets</label>
                <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                  {Object.entries(permissionSets).map(([tenant, sets]) => (
                    <div key={tenant} className="space-y-2">
                      <h4 className="font-medium text-gray-900 capitalize">{tenant} Platform</h4>
                      {sets.map((set) => (
                        <div key={set.id} className="flex items-center space-x-2">
                          <Checkbox id={set.id} />
                          <label htmlFor={set.id} className="text-sm">
                            {set.name}
                            <span className="text-gray-500 ml-1">({set.permissions} permissions)</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                  Cancel
                </Button>
                <Button>Create Role</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tenant</label>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tenants</SelectItem>
                  <SelectItem value="hrms">HRMS Platform</SelectItem>
                  <SelectItem value="crm">CRM Platform</SelectItem>
                  <SelectItem value="accounting">Accounting Platform</SelectItem>
                  <SelectItem value="xats">XATS Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <CardDescription>{role.tenant}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={role.isActive ? 'default' : 'secondary'}>
                    {role.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{role.description}</p>
              
              <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{role.userCount}</span>
                  </div>
                  <p className="text-xs text-gray-500">Users</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{role.permissionSets.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">Sets</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Key className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{role.permissions}</span>
                  </div>
                  <p className="text-xs text-gray-500">Permissions</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Permission Sets</p>
                <div className="space-y-1">
                  {role.permissionSets.map((set) => (
                    <Badge key={set} variant="outline" className="text-xs mr-1">
                      {set}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Created: {role.createdAt}</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedRole(role)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;
