import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { Package, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

const packagePerformanceData = [
  { 
    name: 'Basic 25', 
    subscribers: 12456, 
    revenue: 621280, 
    growth: 8.2, 
    price: 499,
    churnRate: 2.1 
  },
  { 
    name: 'Standard 50', 
    subscribers: 18234, 
    revenue: 1639046, 
    growth: 12.5, 
    price: 899,
    churnRate: 1.8 
  },
  { 
    name: 'Premium 100', 
    subscribers: 14567, 
    revenue: 2911733, 
    growth: 15.8, 
    price: 1999,
    churnRate: 1.2 
  },
  { 
    name: 'Enterprise', 
    subscribers: 2635, 
    revenue: 1317325, 
    growth: 22.4, 
    price: 4999,
    churnRate: 0.8 
  }
];

const monthlyAdoptionData = [
  { month: 'Jan', basic: 11234, standard: 16789, premium: 13456, enterprise: 2234 },
  { month: 'Feb', basic: 11567, standard: 17234, premium: 13789, enterprise: 2345 },
  { month: 'Mar', basic: 11789, standard: 17567, premium: 14123, enterprise: 2456 },
  { month: 'Apr', basic: 12123, standard: 17890, premium: 14345, enterprise: 2567 },
  { month: 'May', basic: 12345, standard: 18123, premium: 14456, enterprise: 2612 },
  { month: 'Jun', basic: 12456, standard: 18234, premium: 14567, enterprise: 2635 }
];

const revenueDistributionData = [
  { name: 'Basic 25', value: 621280, color: '#8b5cf6', percentage: 10.4 },
  { name: 'Standard 50', value: 1639046, color: '#06b6d4', percentage: 27.6 },
  { name: 'Premium 100', value: 2911733, color: '#10b981', percentage: 49.0 },
  { name: 'Enterprise', value: 1317325, color: '#f59e0b', percentage: 22.2 }
];

export function PackagePerformanceChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Package className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Package Performance Analytics</h3>
      </div>

      {/* Package Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {packagePerformanceData.map((pkg, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{pkg.name}</h4>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                ₹{pkg.price}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Subscribers</span>
                <span className="text-sm font-semibold text-gray-900">{pkg.subscribers.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Revenue</span>
                <span className="text-sm font-semibold text-gray-900">₹{(pkg.revenue / 100000).toFixed(1)}L</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Growth</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-600">+{pkg.growth}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Churn Rate</span>
                <span className="text-sm font-semibold text-red-600">{pkg.churnRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Package Adoption */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Monthly Package Adoption</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAdoptionData}>
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
                <Line 
                  type="monotone" 
                  dataKey="basic" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="standard" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="premium" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="enterprise" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Revenue Distribution by Package</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, 'Revenue']}
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
          <div className="grid grid-cols-2 gap-2 mt-4">
            {revenueDistributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Comparison Bar Chart */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Package Performance Comparison</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={packagePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'subscribers') return [value.toLocaleString(), 'Subscribers'];
                  if (name === 'growth') return [`${value}%`, 'Growth Rate'];
                  return [value, name];
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar 
                yAxisId="left"
                dataKey="subscribers" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="growth" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}