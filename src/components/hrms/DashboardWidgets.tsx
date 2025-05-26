
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye
} from 'lucide-react';

const widgets = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+12%",
    changeType: "increase",
    icon: Users,
    color: "blue",
    description: "Active employees"
  },
  {
    title: "New Hires (This Month)",
    value: "23",
    change: "+8%",
    changeType: "increase",
    icon: UserPlus,
    color: "green",
    description: "Recently onboarded"
  },
  {
    title: "Pending Leave Requests",
    value: "18",
    change: "-5%",
    changeType: "decrease",
    icon: Calendar,
    color: "orange",
    description: "Awaiting approval"
  },
  {
    title: "Active Timesheets",
    value: "892",
    change: "+3%",
    changeType: "increase",
    icon: Clock,
    color: "purple",
    description: "This week"
  },
  {
    title: "Monthly Payroll",
    value: "$2.4M",
    change: "+7%",
    changeType: "increase",
    icon: DollarSign,
    color: "cyan",
    description: "Current month"
  },
  {
    title: "Employee Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    changeType: "increase",
    icon: Activity,
    color: "pink",
    description: "Latest survey"
  }
];

const quickActions = [
  { title: "Add Employee", icon: UserPlus, color: "blue" },
  { title: "Process Payroll", icon: DollarSign, color: "green" },
  { title: "View Reports", icon: Eye, color: "purple" },
  { title: "Approve Leaves", icon: CheckCircle, color: "orange" }
];

export function DashboardWidgets() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      orange: "text-orange-600 bg-orange-50",
      purple: "text-purple-600 bg-purple-50",
      cyan: "text-cyan-600 bg-cyan-50",
      pink: "text-pink-600 bg-pink-50"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <Card key={widget.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(widget.color)}`}>
                      <widget.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{widget.title}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-gray-900">{widget.value}</p>
                        <Badge 
                          variant={widget.changeType === 'increase' ? 'default' : 'secondary'}
                          className={`${widget.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {widget.changeType === 'increase' ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {widget.change}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{widget.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4 text-center">
                <div className={`inline-flex p-3 rounded-lg mb-3 ${getColorClasses(action.color)} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Payroll System</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Time Tracking</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Leave Management</p>
                <p className="text-xs text-gray-500">Maintenance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
