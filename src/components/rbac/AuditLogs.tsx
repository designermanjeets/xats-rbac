
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Calendar, User, Shield, AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AuditLogsProps {
  searchTerm: string;
}

const AuditLogs = ({ searchTerm }: AuditLogsProps) => {
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-05-26 14:30:15',
      user: 'Shubham Sharma',
      userEmail: 'shubham.sharma@hrms.com',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      action: 'User Login',
      resource: 'Authentication',
      details: 'Successful login attempt',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 125.0.0.0',
      success: true,
      severity: 'info'
    },
    {
      id: '2',
      timestamp: '2024-05-26 14:25:42',
      user: 'Arvind Sharma',
      userEmail: 'arvind.sharma@crm.com',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      action: 'Permission Check',
      resource: 'crm.lead.lead.assign',
      details: 'Permission granted for lead assignment',
      ipAddress: '192.168.1.105',
      userAgent: 'Firefox 126.0.0.0',
      success: true,
      severity: 'info'
    },
    {
      id: '3',
      timestamp: '2024-05-26 14:20:33',
      user: 'John Employee',
      userEmail: 'john.employee@hrms.com',
      tenant: 'HRMS Platform',
      tenantId: 'hrms',
      action: 'Permission Denied',
      resource: 'hrms.payroll.payroll.process',
      details: 'Insufficient permissions for payroll processing',
      ipAddress: '192.168.1.110',
      userAgent: 'Chrome 125.0.0.0',
      success: false,
      severity: 'warning'
    },
    {
      id: '4',
      timestamp: '2024-05-26 14:15:28',
      user: 'Varun Thakur',
      userEmail: 'varun.thakur@accounting.com',
      tenant: 'Accounting Platform',
      tenantId: 'accounting',
      action: 'Role Assignment',
      resource: 'User Management',
      details: 'Assigned Invoice Manager role to user',
      ipAddress: '192.168.1.115',
      userAgent: 'Safari 17.4.1',
      success: true,
      severity: 'info'
    },
    {
      id: '5',
      timestamp: '2024-05-26 14:10:15',
      user: 'System',
      userEmail: 'system@xats.com',
      tenant: 'System',
      tenantId: 'system',
      action: 'Failed Login',
      resource: 'Authentication',
      details: 'Invalid credentials for admin@xats.com',
      ipAddress: '192.168.1.120',
      userAgent: 'Chrome 125.0.0.0',
      success: false,
      severity: 'error'
    },
    {
      id: '6',
      timestamp: '2024-05-26 14:05:45',
      user: 'Karan Rana',
      userEmail: 'karan.rana@xats.com',
      tenant: 'XATS Platform',
      tenantId: 'xats',
      action: 'Permission Check',
      resource: 'xats.job.job.publish',
      details: 'Permission granted for job publishing',
      ipAddress: '192.168.1.125',
      userAgent: 'Edge 125.0.0.0',
      success: true,
      severity: 'info'
    },
    {
      id: '7',
      timestamp: '2024-05-26 14:00:22',
      user: 'Sarah Lead',
      userEmail: 'sarah.lead@crm.com',
      tenant: 'CRM Platform',
      tenantId: 'crm',
      action: 'Data Access',
      resource: 'crm.customer.customer.read',
      details: 'Accessed customer database',
      ipAddress: '192.168.1.130',
      userAgent: 'Chrome 125.0.0.0',
      success: true,
      severity: 'info'
    },
    {
      id: '8',
      timestamp: '2024-05-26 13:55:18',
      user: 'System',
      userEmail: 'system@xats.com',
      tenant: 'System',
      tenantId: 'system',
      action: 'System Maintenance',
      resource: 'Database',
      details: 'Automated cleanup of expired sessions',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      success: true,
      severity: 'info'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTenant = selectedTenant === 'all' || log.tenantId === selectedTenant;
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesStatus = selectedStatus === 'all' || (selectedStatus === 'success' ? log.success : !log.success);
    
    return matchesSearch && matchesTenant && matchesAction && matchesStatus;
  });

  const getStatusIcon = (success: boolean, severity: string) => {
    if (success) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else {
      if (severity === 'error') {
        return <XCircle className="h-4 w-4 text-red-500" />;
      } else {
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      }
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'info': 'bg-blue-100 text-blue-700',
      'warning': 'bg-yellow-100 text-yellow-700',
      'error': 'bg-red-100 text-red-700'
    };
    return colors[severity] || 'bg-gray-100 text-gray-700';
  };

  const getUniqueActions = () => {
    const actions = [...new Set(auditLogs.map(log => log.action))];
    return actions.sort();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
          <p className="text-gray-600">Monitor security events and access patterns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Real-time View
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Successful Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {auditLogs.filter(log => log.success).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {auditLogs.filter(log => !log.success).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(auditLogs.map(log => log.userEmail)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tenant</label>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tenants</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="hrms">HRMS Platform</SelectItem>
                  <SelectItem value="crm">CRM Platform</SelectItem>
                  <SelectItem value="accounting">Accounting Platform</SelectItem>
                  <SelectItem value="xats">XATS Platform</SelectItem>
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
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Search IP</label>
              <Input placeholder="192.168.1.100" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Security Audit Log ({filteredLogs.length} events)</span>
          </CardTitle>
          <CardDescription>
            Real-time monitoring of user activities and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-mono">{log.timestamp.split(' ')[1]}</p>
                          <p className="text-xs text-gray-500">{log.timestamp.split(' ')[0]}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{log.user}</p>
                          <p className="text-xs text-gray-500">{log.userEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.action}</Badge>
                    </TableCell>
                    <TableCell>
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        {log.resource}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{log.tenant}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(log.success, log.severity)}
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.success ? 'Success' : 'Failed'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-mono">{log.ipAddress}</p>
                        <p className="text-xs text-gray-500">{log.userAgent}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {log.details}
                      </p>
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

export default AuditLogs;
