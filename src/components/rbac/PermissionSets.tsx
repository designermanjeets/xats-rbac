
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Plus, Edit, Trash, Shield, Key, Building, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PermissionSetsProps {
  searchTerm: string;
}

const PermissionSets = ({ searchTerm }: PermissionSetsProps) => {
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [showPermissionSetDialog, setShowPermissionSetDialog] = useState(false);
  const [selectedPermissionSet, setSelectedPermissionSet] = useState<any>(null);

  const permissionSets = [
    {
      id: 'hrms_admin_full',
      name: 'HRMS Administrator Full',
      description: 'Complete administrative access to all HRMS modules',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      permissionCount: 16,
      roleCount: 1,
      userCount: 1,
      isSystemSet: true,
      isActive: true,
      createdAt: '2024-01-15',
      permissions: [
        'employee.create', 'employee.read', 'employee.update', 'employee.delete',
        'department.create', 'department.read', 'department.update', 'department.delete',
        'leave.create', 'leave.read', 'leave.update', 'leave.delete',
        'payroll.create', 'payroll.read', 'payroll.update', 'payroll.delete'
      ]
    },
    {
      id: 'hrms_employee_mgmt',
      name: 'HRMS Employee Management',
      description: 'Manage employee records and basic HR operations',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      permissionCount: 4,
      roleCount: 2,
      userCount: 8,
      isSystemSet: false,
      isActive: true,
      createdAt: '2024-01-20',
      permissions: [
        'employee.create', 'employee.read', 'employee.update', 'employee.delete'
      ]
    },
    {
      id: 'hrms_leave_mgmt',
      name: 'HRMS Leave Management',
      description: 'Approve and manage leave requests',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      permissionCount: 6,
      roleCount: 1,
      userCount: 3,
      isSystemSet: false,
      isActive: true,
      createdAt: '2024-01-25',
      permissions: [
        'leave.create', 'leave.read', 'leave.update', 'leave.delete', 'leave.approve', 'leave.reject'
      ]
    },
    {
      id: 'crm_admin_full',
      name: 'CRM Administrator Full',
      description: 'Complete administrative access to all CRM modules',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      permissionCount: 14,
      roleCount: 1,
      userCount: 1,
      isSystemSet: true,
      isActive: true,
      createdAt: '2024-02-01',
      permissions: [
        'lead.create', 'lead.read', 'lead.update', 'lead.delete',
        'customer.create', 'customer.read', 'customer.update', 'customer.delete',
        'deal.create', 'deal.read', 'deal.update', 'deal.delete',
        'report.create', 'report.read'
      ]
    },
    {
      id: 'crm_lead_mgmt',
      name: 'CRM Lead Management',
      description: 'Manage leads and customer relationships',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      permissionCount: 5,
      roleCount: 1,
      userCount: 12,
      isSystemSet: false,
      isActive: true,
      createdAt: '2024-02-05',
      permissions: [
        'lead.create', 'lead.read', 'lead.update', 'lead.delete', 'lead.assign'
      ]
    }
  ];

  const availablePermissions = {
    'hrms': [
      { id: 'employee.create', name: 'Create Employee', category: 'Employee' },
      { id: 'employee.read', name: 'View Employee', category: 'Employee' },
      { id: 'employee.update', name: 'Update Employee', category: 'Employee' },
      { id: 'employee.delete', name: 'Delete Employee', category: 'Employee' },
      { id: 'department.create', name: 'Create Department', category: 'Department' },
      { id: 'department.read', name: 'View Department', category: 'Department' },
      { id: 'department.update', name: 'Update Department', category: 'Department' },
      { id: 'department.delete', name: 'Delete Department', category: 'Department' },
      { id: 'leave.create', name: 'Create Leave', category: 'Leave' },
      { id: 'leave.read', name: 'View Leave', category: 'Leave' },
      { id: 'leave.update', name: 'Update Leave', category: 'Leave' },
      { id: 'leave.delete', name: 'Delete Leave', category: 'Leave' },
      { id: 'leave.approve', name: 'Approve Leave', category: 'Leave' },
      { id: 'leave.reject', name: 'Reject Leave', category: 'Leave' },
      { id: 'payroll.create', name: 'Create Payroll', category: 'Payroll' },
      { id: 'payroll.read', name: 'View Payroll', category: 'Payroll' },
      { id: 'payroll.update', name: 'Update Payroll', category: 'Payroll' },
      { id: 'payroll.delete', name: 'Delete Payroll', category: 'Payroll' }
    ],
    'crm': [
      { id: 'lead.create', name: 'Create Lead', category: 'Lead' },
      { id: 'lead.read', name: 'View Lead', category: 'Lead' },
      { id: 'lead.update', name: 'Update Lead', category: 'Lead' },
      { id: 'lead.delete', name: 'Delete Lead', category: 'Lead' },
      { id: 'lead.assign', name: 'Assign Lead', category: 'Lead' },
      { id: 'customer.create', name: 'Create Customer', category: 'Customer' },
      { id: 'customer.read', name: 'View Customer', category: 'Customer' },
      { id: 'customer.update', name: 'Update Customer', category: 'Customer' },
      { id: 'customer.delete', name: 'Delete Customer', category: 'Customer' },
      { id: 'deal.create', name: 'Create Deal', category: 'Deal' },
      { id: 'deal.read', name: 'View Deal', category: 'Deal' },
      { id: 'deal.update', name: 'Update Deal', category: 'Deal' },
      { id: 'deal.delete', name: 'Delete Deal', category: 'Deal' },
      { id: 'report.create', name: 'Create Report', category: 'Report' },
      { id: 'report.read', name: 'View Report', category: 'Report' }
    ]
  };

  const filteredPermissionSets = permissionSets.filter(set => {
    const matchesSearch = set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTenant = selectedTenant === 'all' || set.tenantId === selectedTenant;
    
    return matchesSearch && matchesTenant;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Permission Sets</h2>
          <p className="text-gray-600">Manage permission sets and their associated permissions</p>
        </div>
        <Dialog open={showPermissionSetDialog} onOpenChange={setShowPermissionSetDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Permission Set
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Permission Set</DialogTitle>
              <DialogDescription>
                Define a new permission set with specific permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Permission Set Name</label>
                  <Input placeholder="Enter permission set name" />
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
                <Textarea placeholder="Enter permission set description" />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Permissions</label>
                <div className="grid grid-cols-2 gap-6 max-h-80 overflow-y-auto">
                  {Object.entries(availablePermissions).map(([tenant, permissions]) => (
                    <div key={tenant} className="space-y-4">
                      <h4 className="font-medium text-gray-900 capitalize">{tenant} Platform</h4>
                      {Object.entries(
                        permissions.reduce((acc, permission) => {
                          if (!acc[permission.category]) {
                            acc[permission.category] = [];
                          }
                          acc[permission.category].push(permission);
                          return acc;
                        }, {} as Record<string, any[]>)
                      ).map(([category, categoryPermissions]) => (
                        <div key={category} className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-700">{category}</h5>
                          {categoryPermissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2 ml-4">
                              <Checkbox id={permission.id} />
                              <label htmlFor={permission.id} className="text-sm">
                                {permission.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowPermissionSetDialog(false)}>
                  Cancel
                </Button>
                <Button>Create Permission Set</Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="system">System Sets</SelectItem>
                  <SelectItem value="custom">Custom Sets</SelectItem>
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

      {/* Permission Sets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPermissionSets.map((set) => (
          <Card key={set.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{set.name}</CardTitle>
                    <CardDescription>{set.tenant}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {set.isSystemSet && (
                    <Badge variant="secondary">System</Badge>
                  )}
                  <Badge variant={set.isActive ? 'default' : 'secondary'}>
                    {set.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{set.description}</p>
              
              <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Key className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{set.permissionCount}</span>
                  </div>
                  <p className="text-xs text-gray-500">Permissions</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{set.roleCount}</span>
                  </div>
                  <p className="text-xs text-gray-500">Roles</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{set.userCount}</span>
                  </div>
                  <p className="text-xs text-gray-500">Users</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Sample Permissions</p>
                <div className="space-y-1">
                  {set.permissions.slice(0, 3).map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs mr-1 mb-1">
                      {permission}
                    </Badge>
                  ))}
                  {set.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{set.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Created: {set.createdAt}</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedPermissionSet(set)}>
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

export default PermissionSets;
