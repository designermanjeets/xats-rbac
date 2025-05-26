
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Key, Plus, Edit, Trash, Building, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PermissionManagementProps {
  searchTerm: string;
}

const PermissionManagement = ({ searchTerm }: PermissionManagementProps) => {
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');

  const permissions = [
    // HRMS Permissions
    { id: '1', code: 'hrms.employee.employee.create', name: 'Create Employee', description: 'Create new employee records', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Employee', resource: 'employee', action: 'create', isActive: true },
    { id: '2', code: 'hrms.employee.employee.read', name: 'Read Employee', description: 'View employee records', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Employee', resource: 'employee', action: 'read', isActive: true },
    { id: '3', code: 'hrms.employee.employee.update', name: 'Update Employee', description: 'Modify employee records', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Employee', resource: 'employee', action: 'update', isActive: true },
    { id: '4', code: 'hrms.employee.employee.delete', name: 'Delete Employee', description: 'Remove employee records', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Employee', resource: 'employee', action: 'delete', isActive: true },
    
    { id: '5', code: 'hrms.leave.leave.create', name: 'Create Leave', description: 'Create leave requests', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Leave', resource: 'leave', action: 'create', isActive: true },
    { id: '6', code: 'hrms.leave.leave.approve', name: 'Approve Leave', description: 'Approve leave requests', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Leave', resource: 'leave', action: 'approve', isActive: true },
    { id: '7', code: 'hrms.leave.leave.reject', name: 'Reject Leave', description: 'Reject leave requests', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Leave', resource: 'leave', action: 'reject', isActive: true },
    
    { id: '8', code: 'hrms.payroll.payroll.read', name: 'Read Payroll', description: 'View payroll information', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Payroll', resource: 'payroll', action: 'read', isActive: true },
    { id: '9', code: 'hrms.payroll.payroll.process', name: 'Process Payroll', description: 'Execute payroll processing', tenant: 'HRMS Platform', tenantId: 'hrms', module: 'Payroll', resource: 'payroll', action: 'process', isActive: true },
    
    // CRM Permissions
    { id: '10', code: 'crm.lead.lead.create', name: 'Create Lead', description: 'Create new leads', tenant: 'CRM Platform', tenantId: 'crm', module: 'Lead', resource: 'lead', action: 'create', isActive: true },
    { id: '11', code: 'crm.lead.lead.assign', name: 'Assign Lead', description: 'Assign leads to users', tenant: 'CRM Platform', tenantId: 'crm', module: 'Lead', resource: 'lead', action: 'assign', isActive: true },
    { id: '12', code: 'crm.customer.customer.read', name: 'Read Customer', description: 'View customer information', tenant: 'CRM Platform', tenantId: 'crm', module: 'Customer', resource: 'customer', action: 'read', isActive: true },
    { id: '13', code: 'crm.deal.deal.close', name: 'Close Deal', description: 'Close and finalize deals', tenant: 'CRM Platform', tenantId: 'crm', module: 'Deal', resource: 'deal', action: 'close', isActive: true },
    
    // Accounting Permissions
    { id: '14', code: 'accounting.invoice.invoice.create', name: 'Create Invoice', description: 'Create new invoices', tenant: 'Accounting Platform', tenantId: 'accounting', module: 'Invoice', resource: 'invoice', action: 'create', isActive: true },
    { id: '15', code: 'accounting.invoice.invoice.send', name: 'Send Invoice', description: 'Send invoices to customers', tenant: 'Accounting Platform', tenantId: 'accounting', module: 'Invoice', resource: 'invoice', action: 'send', isActive: true },
    { id: '16', code: 'accounting.financial.financial.generate', name: 'Generate Financial Report', description: 'Generate financial reports', tenant: 'Accounting Platform', tenantId: 'accounting', module: 'Financial', resource: 'financial', action: 'generate', isActive: true },
    
    // XATS Permissions
    { id: '17', code: 'xats.job.job.publish', name: 'Publish Job', description: 'Publish job postings', tenant: 'XATS Platform', tenantId: 'xats', module: 'Job', resource: 'job', action: 'publish', isActive: true },
    { id: '18', code: 'xats.interview.interview.schedule', name: 'Schedule Interview', description: 'Schedule candidate interviews', tenant: 'XATS Platform', tenantId: 'xats', module: 'Interview', resource: 'interview', action: 'schedule', isActive: true }
  ];

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTenant = selectedTenant === 'all' || permission.tenantId === selectedTenant;
    const matchesModule = selectedModule === 'all' || permission.module === selectedModule;
    const matchesAction = selectedAction === 'all' || permission.action === selectedAction;
    
    return matchesSearch && matchesTenant && matchesModule && matchesAction;
  });

  const getUniqueModules = () => {
    const modules = [...new Set(permissions.map(p => p.module))];
    return modules.sort();
  };

  const getUniqueActions = () => {
    const actions = [...new Set(permissions.map(p => p.action))];
    return actions.sort();
  };

  const getActionColor = (action: string) => {
    const colors: { [key: string]: string } = {
      'create': 'bg-green-100 text-green-700',
      'read': 'bg-blue-100 text-blue-700',
      'update': 'bg-yellow-100 text-yellow-700',
      'delete': 'bg-red-100 text-red-700',
      'approve': 'bg-purple-100 text-purple-700',
      'reject': 'bg-pink-100 text-pink-700',
      'assign': 'bg-indigo-100 text-indigo-700',
      'close': 'bg-gray-100 text-gray-700',
      'process': 'bg-orange-100 text-orange-700',
      'send': 'bg-cyan-100 text-cyan-700',
      'generate': 'bg-teal-100 text-teal-700',
      'publish': 'bg-emerald-100 text-emerald-700',
      'schedule': 'bg-violet-100 text-violet-700'
    };
    return colors[action] || 'bg-gray-100 text-gray-700';
  };

  // Group permissions by tenant and module for summary
  const permissionSummary = permissions.reduce((acc, permission) => {
    if (!acc[permission.tenantId]) {
      acc[permission.tenantId] = { tenant: permission.tenant, modules: {} };
    }
    if (!acc[permission.tenantId].modules[permission.module]) {
      acc[permission.tenantId].modules[permission.module] = [];
    }
    acc[permission.tenantId].modules[permission.module].push(permission);
    return acc;
  }, {} as any);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Permission Management</h2>
          <p className="text-gray-600">Manage granular permissions across all platforms</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Permission
        </Button>
      </div>

      {/* Permission Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(permissionSummary).map(([tenantId, data]: [string, any]) => (
          <Card key={tenantId}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>{data.tenant}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(data.modules).map(([module, perms]: [string, any]) => (
                  <div key={module} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{module}</span>
                    <Badge variant="secondary">{perms.length}</Badge>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Total</span>
                    <Badge>{Object.values(data.modules).flat().length}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <label className="text-sm font-medium text-gray-700">Module</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {getUniqueModules().map((module) => (
                    <SelectItem key={module} value={module}>{module}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Action</label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {getUniqueActions().map((action) => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Search Code</label>
              <Input placeholder="e.g. hrms.employee..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Permissions ({filteredPermissions.length})</span>
          </CardTitle>
          <CardDescription>
            Granular permissions following the {'{platform}.{module}.{resource}.{action}'} convention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {permission.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{permission.name}</p>
                        <p className="text-sm text-gray-500">{permission.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{permission.tenant}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{permission.module}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(permission.action)}>
                        {permission.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={permission.isActive ? 'default' : 'secondary'}>
                        {permission.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionManagement;
