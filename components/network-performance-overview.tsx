import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wifi, Activity, Server, Signal, CheckCircle } from 'lucide-react';

const networkPerformanceData = [
  { time: '00:00', uptime: 98.5, bandwidth: 85.2, latency: 12, activeConnections: 38456 },
  { time: '04:00', uptime: 99.1, bandwidth: 92.3, latency: 8, activeConnections: 25678 },
  { time: '08:00', uptime: 98.8, bandwidth: 78.9, latency: 15, activeConnections: 42345 },
  { time: '12:00', uptime: 99.2, bandwidth: 88.7, latency: 10, activeConnections: 45234 },
  { time: '16:00', uptime: 98.9, bandwidth: 91.4, latency: 9, activeConnections: 44567 },
  { time: '20:00', uptime: 99.0, bandwidth: 89.6, latency: 11, activeConnections: 41234 },
  { time: '24:00', uptime: 99.3, bandwidth: 93.1, latency: 7, activeConnections: 36789 }
];



export function NetworkPerformanceOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Network Performance</h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-600 font-medium">Live</span>
        </div>
      </div>

      {/* Network Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm">Network Uptime</p>
              <p className="text-2xl font-bold text-emerald-900">99.2%</p>
              <p className="text-emerald-600 text-xs">24h average</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm">Avg Latency</p>
              <p className="text-2xl font-bold text-blue-900">9ms</p>
              <p className="text-blue-600 text-xs">Excellent</p>
            </div>
            <Signal className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm">Bandwidth Usage</p>
              <p className="text-2xl font-bold text-purple-900">89.6%</p>
              <p className="text-purple-600 text-xs">Peak capacity</p>
            </div>
            <Wifi className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm">Active Nodes</p>
              <p className="text-2xl font-bold text-amber-900">247/250</p>
              <p className="text-amber-600 text-xs">98.8% online</p>
            </div>
            <Server className="w-8 h-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* 24h Performance Chart */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">24-Hour Performance Trend</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                domain={[95, 100]}
              />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'uptime') return [`${value}%`, 'Uptime'];
                  if (name === 'bandwidth') return [`${value}%`, 'Bandwidth Usage'];
                  if (name === 'latency') return [`${value}ms`, 'Latency'];
                  return [value, name];
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="uptime" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="bandwidth" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}