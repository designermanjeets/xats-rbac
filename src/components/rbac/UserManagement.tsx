
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Edit, Trash, Shield, Building, Calendar } from 'lucide-react';

interface UserManagementProps {
  searchTerm: string;
}

const UserManagement = ({ searchTerm }: UserManagementProps) => {
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showUserDialog, setShowUserDialog] = useState(false);

  const users = [
    {
      id: '1',
      username: 'shubham.sharma',
      fullName: 'Shubham Sharma',
      email: 'shubham.sharma@hrms.com',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      roles: ['HRMS Administrator'],
      isActive: true,
      isTenantAdmin: true,
      lastLogin: '2 hours ago',
      createdAt: '2024-01-15',
      permissions: 16
    },
    {
      id: '2',
      username: 'arvind.sharma',
      fullName: 'Arvind Sharma',
      email: 'arvind.sharma@crm.com',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      roles: ['CRM Administrator'],
      isActive: true,
      isTenantAdmin: true,
      lastLogin: '15 minutes ago',
      createdAt: '2024-01-20',
      permissions: 14
    },
    {
      id: '3',
      username: 'varun.thakur',
      fullName: 'Varun Thakur',
      email: 'varun.thakur@accounting.com',
      tenant: 'Accounting Platform',
      tenantId: 'accounting',
      roles: ['Accounting Administrator'],
      isActive: true,
      isTenantAdmin: true,
      lastLogin: '1 hour ago',
      createdAt: '2024-01-25',
      permissions: 12
    },
    {
      id: '4',
      username: 'karan.rana',
      fullName: 'Karan Rana',
      email: 'karan.rana@xats.com',
      tenant: 'XATS Platform',
      tenantId: 'xats',
      roles: ['XATS Administrator'],
      isActive: true,
      isTenantAdmin: true,
      lastLogin: '30 minutes ago',
      createdAt: '2024-02-01',
      permissions: 14
    },
    {
      id: '5',
      username: 'employee.user',
      fullName: 'John Employee',
      email: 'john.employee@hrms.com',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      roles: ['Employee Manager'],
      isActive: true,
      isTenantAdmin: false,
      lastLogin: '4 hours ago',
      createdAt: '2024-02-10',
      permissions: 4
    },
    {
      id: '6',
      username: 'lead.manager',
      fullName: 'Sarah Lead',
      email: 'sarah.lead@crm.com',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      roles: ['Lead Manager'],
      isActive: true,
      isTenantAdmin: false,
      lastLogin: '1 day ago',
      createdAt: '2024-02-15',
      permissions: 5
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTenant = selectedTenant === 'all' || user.tenantId === selectedTenant;
    const matchesRole = selectedRole === 'all' || user.roles.some(role => role.toLowerCase().includes(selectedRole.toLowerCase()));
    
    return matchesSearch && matchesTenant && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage users, roles, and permissions across tenants</p>
        </div>
        <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account and assign roles and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter full name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input placeholder="Enter username" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                  Cancel
                </Button>
                <Button>Create User</Button>
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
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Users ({filteredUsers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {user.fullName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.fullName}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">@{user.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{user.tenant}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                        {user.isTenantAdmin && (
                          <Badge variant="default" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{user.permissions}</span>
                      <span className="text-xs text-gray-500 ml-1">permissions</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{user.lastLogin}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'default' : 'secondary'}>
                        {user.isActive ? 'Active' : 'Inactive'}
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

export default UserManagement;
