import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 69000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 81000 },
  { month: "Nov", revenue: 76000 },
  { month: "Dec", revenue: 89000 },
];

export function RevenueChart() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Revenue History</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500">Monthly revenue trends over the year</p>
      </CardHeader>
      <CardContent>
        <div className="h-48 sm:h-56 lg:h-64 2xl:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#666"
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
                width={45}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
                labelStyle={{ color: "#333" }}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}