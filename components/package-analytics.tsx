import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Package, 
  Star,
  Target,
  ArrowUpCircle,
  ArrowDownCircle,
  Activity,
  Zap,
  Crown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Mock data for package analytics
const packageUsageData = [
  { name: "Premium Fiber 100Mbps", customers: 18500, profit: 4250000, revenue: 5550000, profitMargin: 76.6 },
  { name: "Standard Fiber 50Mbps", customers: 15200, profit: 2890000, revenue: 3648000, profitMargin: 79.2 },
  { name: "Basic Fiber 25Mbps", customers: 12800, profit: 1920000, revenue: 2560000, profitMargin: 75.0 },
  { name: "Ultra Fiber 200Mbps", customers: 8900, profit: 3115000, revenue: 4006000, profitMargin: 77.7 },
  { name: "Enterprise 500Mbps", customers: 2100, profit: 1890000, revenue: 2310000, profitMargin: 81.8 },
  { name: "Student Plan 20Mbps", customers: 7600, profit: 684000, revenue: 912000, profitMargin: 75.0 },
];

const monthlyTrendData = [
  { month: "Jan", Premium: 17800, Standard: 14500, Basic: 12100, Ultra: 8200, Enterprise: 1900 },
  { month: "Feb", Premium: 18000, Standard: 14800, Basic: 12300, Ultra: 8400, Enterprise: 1950 },
  { month: "Mar", Premium: 18200, Standard: 15000, Basic: 12500, Ultra: 8600, Enterprise: 2000 },
  { month: "Apr", Premium: 18300, Standard: 15100, Basic: 12600, Ultra: 8700, Enterprise: 2050 },
  { month: "May", Premium: 18400, Standard: 15150, Basic: 12700, Ultra: 8800, Enterprise: 2080 },
  { month: "Jun", Premium: 18500, Standard: 15200, Basic: 12800, Ultra: 8900, Enterprise: 2100 },
];

const profitabilityData = packageUsageData.map(pkg => ({
  name: pkg.name.split(' ')[0],
  profitMargin: pkg.profitMargin,
  totalProfit: pkg.profit,
  customers: pkg.customers
}));

const pieChartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export function PackageAnalytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [sortBy, setSortBy] = useState("customers");

  const totalCustomers = packageUsageData.reduce((sum, pkg) => sum + pkg.customers, 0);
  const totalRevenue = packageUsageData.reduce((sum, pkg) => sum + pkg.revenue, 0);
  const totalProfit = packageUsageData.reduce((sum, pkg) => sum + pkg.profit, 0);
  const avgProfitMargin = (totalProfit / totalRevenue) * 100;

  const sortedPackages = [...packageUsageData].sort((a, b) => {
    if (sortBy === "customers") return b.customers - a.customers;
    if (sortBy === "profit") return b.profit - a.profit;
    if (sortBy === "profitMargin") return b.profitMargin - a.profitMargin;
    return 0;
  });

  const topPerformer = sortedPackages[0];
  const leastPerformer = sortedPackages[sortedPackages.length - 1];

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900">Package Analytics</h1>
            <p className="text-gray-600 mt-1">Customer usage and profitability insights</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customers">Sort by Customers</SelectItem>
                <SelectItem value="profit">Sort by Profit</SelectItem>
                <SelectItem value="profitMargin">Sort by Margin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Customers</p>
                  <p className="text-2xl sm:text-3xl font-bold">{(totalCustomers / 1000).toFixed(1)}K</p>
                  <p className="text-blue-200 text-sm mt-1">+12.5% from last month</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold">₹{(totalRevenue / 10000000).toFixed(1)}Cr</p>
                  <p className="text-emerald-200 text-sm mt-1">+18.2% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Total Profit</p>
                  <p className="text-2xl sm:text-3xl font-bold">₹{(totalProfit / 10000000).toFixed(1)}Cr</p>
                  <p className="text-amber-200 text-sm mt-1">+22.1% from last month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Profit Margin</p>
                  <p className="text-2xl sm:text-3xl font-bold">{avgProfitMargin.toFixed(1)}%</p>
                  <p className="text-purple-200 text-sm mt-1">+2.3% from last month</p>
                </div>
                <Target className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-lg">Top Performer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{topPerformer.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Customers</p>
                  <p className="font-semibold">{topPerformer.customers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Profit Margin</p>
                  <p className="font-semibold text-emerald-600">{topPerformer.profitMargin}%</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800">Most Popular</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-lg">Growth Opportunity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{leastPerformer.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Customers</p>
                  <p className="font-semibold">{leastPerformer.customers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Potential</p>
                  <p className="font-semibold text-amber-600">+35% growth</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800">Needs Attention</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Customer Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Customer Distribution by Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="customers"
                  >
                    {packageUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value.toLocaleString(), "Customers"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Profit Analysis Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              Profit Analysis by Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'totalProfit' ? `₹${(value / 100000).toFixed(1)}L` : `${value}%`,
                      name === 'totalProfit' ? 'Total Profit' : 'Profit Margin'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="totalProfit" fill="#10B981" name="Total Profit" />
                  <Bar dataKey="profitMargin" fill="#3B82F6" name="Profit Margin %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Customer Growth Trends (6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value.toLocaleString(), "Customers"]} />
                <Legend />
                <Area type="monotone" dataKey="Premium" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="Standard" stackId="1" stroke="#10B981" fill="#10B981" />
                <Area type="monotone" dataKey="Basic" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                <Area type="monotone" dataKey="Ultra" stackId="1" stroke="#EF4444" fill="#EF4444" />
                <Area type="monotone" dataKey="Enterprise" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-600" />
            Detailed Package Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Name</TableHead>
                  <TableHead className="text-right">Customers</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                  <TableHead className="text-right">Profit Margin</TableHead>
                  <TableHead className="text-right">Market Share</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPackages.map((pkg, index) => {
                  const marketShare = ((pkg.customers / totalCustomers) * 100).toFixed(1);
                  const isTopPerformer = index < 2;
                  const needsAttention = index >= sortedPackages.length - 2;
                  
                  return (
                    <TableRow key={pkg.name}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell className="text-right">{pkg.customers.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{(pkg.revenue / 100000).toFixed(1)}L</TableCell>
                      <TableCell className="text-right">₹{(pkg.profit / 100000).toFixed(1)}L</TableCell>
                      <TableCell className="text-right">{pkg.profitMargin}%</TableCell>
                      <TableCell className="text-right">{marketShare}%</TableCell>
                      <TableCell>
                        {isTopPerformer && (
                          <Badge className="bg-emerald-100 text-emerald-800">
                            <ArrowUpCircle className="h-3 w-3 mr-1" />
                            Excellent
                          </Badge>
                        )}
                        {needsAttention && (
                          <Badge className="bg-amber-100 text-amber-800">
                            <ArrowDownCircle className="h-3 w-3 mr-1" />
                            Optimize
                          </Badge>
                        )}
                        {!isTopPerformer && !needsAttention && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Zap className="h-3 w-3 mr-1" />
                            Good
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Growth Opportunities</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <ArrowUpCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Focus marketing efforts on Student Plan to increase adoption by 35%</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Enterprise segment shows high profitability - expand B2B sales</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Premium Fiber has highest customer base - introduce loyalty benefits</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Optimization Areas</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Review pricing strategy for Basic Fiber to improve margins</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Bundle services for Standard plans to increase ARPU</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Optimize operational costs for high-volume plans</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding */}
      <div className="pb-6 lg:pb-8"></div>
    </div>
  );
}