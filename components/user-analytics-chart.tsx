import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, UserX, TrendingUp, TrendingDown } from 'lucide-react';

const userGrowthData = [
  { month: 'Jan', newUsers: 1247, activeUsers: 45234, inactiveUsers: 2658 },
  { month: 'Feb', newUsers: 1389, activeUsers: 46456, inactiveUsers: 2567 },
  { month: 'Mar', newUsers: 1456, activeUsers: 47892, inactiveUsers: 2456 },
  { month: 'Apr', newUsers: 1234, activeUsers: 47234, inactiveUsers: 2658 },
  { month: 'May', newUsers: 1567, activeUsers: 48789, inactiveUsers: 2345 },
  { month: 'Jun', newUsers: 1678, activeUsers: 49456, inactiveUsers: 2234 }
];

const userDemographicsData = [
  { name: 'Residential', value: 32456, color: '#3b82f6' },
  { name: 'Business', value: 12234, color: '#10b981' },
  { name: 'Enterprise', value: 3202, color: '#f59e0b' }
];



export function UserAnalyticsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">User Analytics Overview</h3>
      </div>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-blue-900">47,892</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-blue-600 mr-1" />
                <span className="text-blue-600 text-sm">+8.2%</span>
              </div>
            </div>
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm">New Users</p>
              <p className="text-2xl font-bold text-emerald-900">1,678</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-600 mr-1" />
                <span className="text-emerald-600 text-sm">+12.5%</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm">Churned Users</p>
              <p className="text-2xl font-bold text-red-900">287</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                <span className="text-red-600 text-sm">-3.2%</span>
              </div>
            </div>
            <UserX className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Trend */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">User Growth Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="newUsers" 
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Demographics */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">User Demographics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDemographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDemographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Users']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {userDemographicsData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}