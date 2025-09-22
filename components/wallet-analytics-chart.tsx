import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, CreditCard, TrendingUp, TrendingDown, IndianRupee, RefreshCw } from 'lucide-react';

const walletBalanceData = [
  { month: 'Jan', totalBalance: 12456780, averageBalance: 260, recharges: 8234, withdrawals: 6789 },
  { month: 'Feb', totalBalance: 13567890, averageBalance: 292, recharges: 9123, withdrawals: 7234 },
  { month: 'Mar', totalBalance: 14789123, averageBalance: 309, recharges: 9876, withdrawals: 7567 },
  { month: 'Apr', totalBalance: 13234567, averageBalance: 280, recharges: 8567, withdrawals: 8123 },
  { month: 'May', totalBalance: 15678234, averageBalance: 321, recharges: 10234, withdrawals: 7890 },
  { month: 'Jun', totalBalance: 16890567, averageBalance: 353, recharges: 11456, withdrawals: 8234 }
];

const rechargePatternData = [
  { amount: '₹100-₹500', users: 18234, percentage: 38.1, color: '#3b82f6' },
  { amount: '₹500-₹1000', users: 14567, percentage: 30.4, color: '#10b981' },
  { amount: '₹1000-₹2000', users: 8923, percentage: 18.6, color: '#f59e0b' },
  { amount: '₹2000+', users: 6168, percentage: 12.9, color: '#ef4444' }
];

const dailyTransactionData = [
  { day: 'Mon', recharges: 1567, amount: 456789 },
  { day: 'Tue', recharges: 1234, amount: 378234 },
  { day: 'Wed', recharges: 1789, amount: 523456 },
  { day: 'Thu', recharges: 1456, amount: 445678 },
  { day: 'Fri', recharges: 1678, amount: 567890 },
  { day: 'Sat', recharges: 2134, amount: 678123 },
  { day: 'Sun', recharges: 1890, amount: 589234 }
];

const walletStatsData = [
  { type: 'Active Wallets', value: 45678, change: '+8.2%', trend: 'up', color: 'bg-blue-50 text-blue-700' },
  { type: 'Total Balance', value: '₹1.69Cr', change: '+12.5%', trend: 'up', color: 'bg-emerald-50 text-emerald-700' },
  { type: 'Avg. Balance', value: '₹353', change: '+4.8%', trend: 'up', color: 'bg-purple-50 text-purple-700' },
  { type: 'Low Balance', value: 2345, change: '-15.3%', trend: 'down', color: 'bg-amber-50 text-amber-700' }
];

export function WalletAnalyticsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Wallet className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Wallet Analytics Overview</h3>
      </div>

      {/* Wallet Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {walletStatsData.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-75">{stat.type}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                {index === 0 && <Wallet className="w-4 h-4" />}
                {index === 1 && <IndianRupee className="w-4 h-4" />}
                {index === 2 && <CreditCard className="w-4 h-4" />}
                {index === 3 && <RefreshCw className="w-4 h-4" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet Balance Trends */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Wallet Balance Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={walletBalanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'totalBalance') return [`₹${(value / 10000000).toFixed(2)}Cr`, 'Total Balance'];
                    if (name === 'averageBalance') return [`₹${value}`, 'Avg Balance'];
                    return [value.toLocaleString(), name];
                  }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalBalance" 
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recharge Patterns */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Recharge Amount Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rechargePatternData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="users"
                >
                  {rechargePatternData.map((entry, index) => (
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
          <div className="grid grid-cols-2 gap-2 mt-4">
            {rechargePatternData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600">{item.amount}</span>
                <span className="font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Transaction Pattern */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Daily Transaction Pattern</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyTransactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
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
                tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'recharges') return [value.toLocaleString(), 'Recharges'];
                  if (name === 'amount') return [`₹${(value / 100000).toFixed(1)}L`, 'Amount'];
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
                dataKey="recharges" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="amount" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Recharge vs Withdrawal Comparison */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Monthly Recharge vs Usage Comparison</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={walletBalanceData}>
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
                formatter={(value: number, name: string) => [value.toLocaleString(), name === 'recharges' ? 'Recharges' : 'Usage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="recharges" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="withdrawals" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}