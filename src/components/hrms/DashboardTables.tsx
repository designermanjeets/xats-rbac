
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  MoreHorizontal, 
  Eye, 
  Check, 
  X, 
  Calendar,
  Clock,
  User,
  Download,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DashboardTablesProps {
  searchTerm: string;
}

const leaveRequests = [
  {
    id: 1,
    employee: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", email: "john.doe@company.com" },
    type: "Annual Leave",
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    days: 5,
    reason: "Family vacation",
    status: "pending",
    appliedDate: "2024-01-10"
  },
  {
    id: 2,
    employee: { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c8?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", email: "jane.smith@company.com" },
    type: "Sick Leave",
    startDate: "2024-01-12",
    endDate: "2024-01-12",
    days: 1,
    reason: "Medical appointment",
    status: "approved",
    appliedDate: "2024-01-11"
  },
  {
    id: 3,
    employee: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", email: "mike.johnson@company.com" },
    type: "Personal Leave",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    days: 3,
    reason: "Personal matters",
    status: "pending",
    appliedDate: "2024-01-09"
  }
];

const recentActivity = [
  {
    id: 1,
    employee: { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    action: "Submitted timesheet",
    time: "2 minutes ago",
    status: "completed"
  },
  {
    id: 2,
    employee: { name: "David Brown", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    action: "Clocked in",
    time: "15 minutes ago",
    status: "active"
  },
  {
    id: 3,
    employee: { name: "Lisa Garcia", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    action: "Updated profile",
    time: "1 hour ago",
    status: "completed"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Monthly Team Meeting",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "meeting",
    attendees: 25
  },
  {
    id: 2,
    title: "Payroll Processing",
    date: "2024-01-20",
    time: "09:00 AM",
    type: "payroll",
    attendees: 5
  },
  {
    id: 3,
    title: "Performance Reviews",
    date: "2024-01-25",
    time: "02:00 PM",
    type: "review",
    attendees: 15
  }
];

export function DashboardTables({ searchTerm }: DashboardTablesProps) {
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; type: string; item: any }>({
    open: false,
    type: '',
    item: null
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Completed" },
      active: { color: "bg-green-100 text-green-800", label: "Active" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredLeaveRequests = leaveRequests.filter(request =>
    request.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveReject = (action: string, item: any) => {
    setActionDialog({ open: true, type: action, item });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity & Requests</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Leave Requests</span>
            </CardTitle>
            <CardDescription>Pending and recent leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={request.employee.avatar} alt={request.employee.name} />
                          <AvatarFallback>{request.employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{request.employee.name}</p>
                          <p className="text-xs text-gray-500">{request.employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{request.startDate} - {request.endDate}</p>
                        <p className="text-xs text-gray-500">{request.days} day(s)</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedLeave(request)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Leave Request Details</DialogTitle>
                              <DialogDescription>Review leave application details</DialogDescription>
                            </DialogHeader>
                            {selectedLeave && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Employee</Label>
                                    <p className="text-sm">{selectedLeave.employee.name}</p>
                                  </div>
                                  <div>
                                    <Label>Leave Type</Label>
                                    <p className="text-sm">{selectedLeave.type}</p>
                                  </div>
                                  <div>
                                    <Label>Start Date</Label>
                                    <p className="text-sm">{selectedLeave.startDate}</p>
                                  </div>
                                  <div>
                                    <Label>End Date</Label>
                                    <p className="text-sm">{selectedLeave.endDate}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Reason</Label>
                                  <p className="text-sm">{selectedLeave.reason}</p>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => handleApproveReject('reject', selectedLeave)}>
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                              <Button onClick={() => handleApproveReject('approve', selectedLeave)}>
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        {request.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleApproveReject('approve', request)}>
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleApproveReject('reject', request)}>
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity & Upcoming Events */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.employee.avatar} alt={activity.employee.name} />
                      <AvatarFallback>{activity.employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.employee.name}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                    <p className="text-xs text-gray-400">{event.attendees} attendees</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionDialog.type} this leave request?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Comments (Optional)</Label>
              <Textarea placeholder="Add any comments or notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog({ ...actionDialog, open: false })}>
              Cancel
            </Button>
            <Button 
              className={actionDialog.type === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              onClick={() => setActionDialog({ ...actionDialog, open: false })}
            >
              {actionDialog.type === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
