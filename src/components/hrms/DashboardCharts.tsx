
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { MoreHorizontal, Download, Filter } from 'lucide-react';

const employeeGrowthData = [
  { month: 'Jan', employees: 980, hires: 45, exits: 12 },
  { month: 'Feb', employees: 1020, hires: 52, exits: 8 },
  { month: 'Mar', employees: 1080, hires: 78, exits: 18 },
  { month: 'Apr', employees: 1150, hires: 89, exits: 19 },
  { month: 'May', employees: 1200, hires: 67, exits: 17 },
  { month: 'Jun', employees: 1247, hires: 58, exits: 11 }
];

const departmentData = [
  { name: 'Engineering', value: 456, color: '#3B82F6' },
  { name: 'Sales', value: 234, color: '#10B981' },
  { name: 'Marketing', value: 178, color: '#F59E0B' },
  { name: 'HR', value: 89, color: '#EF4444' },
  { name: 'Finance', value: 67, color: '#8B5CF6' },
  { name: 'Operations', value: 123, color: '#06B6D4' },
  { name: 'Others', value: 100, color: '#84CC16' }
];

const attendanceData = [
  { day: 'Mon', present: 1180, absent: 67, late: 23 },
  { day: 'Tue', present: 1195, absent: 52, late: 18 },
  { day: 'Wed', present: 1167, absent: 80, late: 31 },
  { day: 'Thu', present: 1203, absent: 44, late: 15 },
  { day: 'Fri', present: 1156, absent: 91, late: 28 },
  { day: 'Sat', present: 890, absent: 357, late: 12 },
  { day: 'Sun', present: 234, absent: 1013, late: 5 }
];

const payrollTrendData = [
  { month: 'Jan', amount: 2100000, overtime: 45000, bonus: 78000 },
  { month: 'Feb', amount: 2150000, overtime: 52000, bonus: 89000 },
  { month: 'Mar', amount: 2280000, overtime: 67000, bonus: 124000 },
  { month: 'Apr', amount: 2350000, overtime: 71000, bonus: 98000 },
  { month: 'May', amount: 2420000, overtime: 58000, bonus: 156000 },
  { month: 'Jun', amount: 2480000, overtime: 63000, bonus: 134000 }
];

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Analytics & Reports</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Growth Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Growth</CardTitle>
                <CardDescription>Monthly employee count and hiring trends</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={employeeGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="employees" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="hires" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Employee count by department</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Attendance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Attendance</CardTitle>
                <CardDescription>Daily attendance patterns</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#10B981" name="Present" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                <Bar dataKey="late" fill="#F59E0B" name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payroll Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payroll Trends</CardTitle>
                <CardDescription>Monthly payroll breakdown</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={payrollTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} name="Base Salary" />
                <Line type="monotone" dataKey="overtime" stroke="#F59E0B" strokeWidth={2} name="Overtime" />
                <Line type="monotone" dataKey="bonus" stroke="#10B981" strokeWidth={2} name="Bonus" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
