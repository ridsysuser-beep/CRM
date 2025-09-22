import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const planData = [
  { plan: "Basic", users: 2450, color: "#3b82f6" },
  { plan: "Standard", users: 3890, color: "#10b981" },
  { plan: "Premium", users: 1920, color: "#f59e0b" },
  { plan: "Enterprise", users: 780, color: "#8b5cf6" },
  { plan: "Custom", users: 456, color: "#ef4444" },
];

export function PlanChart() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Plan Wise Users</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500">Distribution of users across different plans</p>
      </CardHeader>
      <CardContent>
        <div className="h-48 sm:h-56 lg:h-64 2xl:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="plan" 
                stroke="#666"
                fontSize={12}
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={65}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tick={{ fontSize: 12 }}
                width={45}
              />
              <Tooltip 
                formatter={(value) => [value.toLocaleString(), "Users"]}
                labelStyle={{ color: "#333" }}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px"
                }}
              />
              <Bar 
                dataKey="users" 
                radius={[4, 4, 0, 0]}
              >
                {planData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
          {planData.map((item) => (
            <div key={item.plan} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs sm:text-sm text-gray-600">{item.plan}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}