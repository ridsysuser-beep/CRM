import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  Eye
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart as RechartsPieChart, Pie, Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Mock data for wallet reports
const monthlySpendingData = [
  { month: "Jan", spending: 245000, recharge: 300000, balance: 55000 },
  { month: "Feb", spending: 280000, recharge: 250000, balance: 25000 },
  { month: "Mar", spending: 220000, recharge: 350000, balance: 155000 },
  { month: "Apr", spending: 310000, recharge: 200000, balance: 45000 },
  { month: "May", spending: 265000, recharge: 400000, balance: 180000 },
  { month: "Jun", spending: 290000, recharge: 300000, balance: 190000 },
];

const spendingCategoryData = [
  { name: "Customer Refunds", value: 45, amount: 125000 },
  { name: "Plan Upgrades", value: 25, amount: 68000 },
  { name: "Service Credits", value: 15, amount: 42000 },
  { name: "Promotional Credits", value: 10, amount: 28000 },
  { name: "Others", value: 5, amount: 14000 }
];

const recentTransactions = [
  {
    id: "TXN001",
    type: "debit",
    description: "Customer Refund - Plan Cancellation",
    amount: 2500,
    date: "2024-01-15",
    category: "Refunds",
    status: "completed"
  },
  {
    id: "TXN002",
    type: "credit",
    description: "Wallet Recharge - Bank Transfer",
    amount: 50000,
    date: "2024-01-15",
    category: "Recharge",
    status: "completed"
  },
  {
    id: "TXN003",
    type: "debit",
    description: "Service Credit - Technical Issue",
    amount: 1200,
    date: "2024-01-14",
    category: "Service Credits",
    status: "completed"
  },
  {
    id: "TXN004",
    type: "debit",
    description: "Plan Upgrade Credit",
    amount: 800,
    date: "2024-01-14",
    category: "Plan Credits",
    status: "completed"
  },
  {
    id: "TXN005",
    type: "credit",
    description: "Wallet Recharge - UPI",
    amount: 25000,
    date: "2024-01-13",
    category: "Recharge",
    status: "completed"
  }
];

const pieChartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function WalletReport() {
  const [reportType, setReportType] = useState("monthly");
  const [timeRange, setTimeRange] = useState("6months");

  const totalSpending = monthlySpendingData.reduce((sum, item) => sum + item.spending, 0);
  const totalRecharge = monthlySpendingData.reduce((sum, item) => sum + item.recharge, 0);
  const currentBalance = 284000;
  const avgMonthlySpending = totalSpending / monthlySpendingData.length;

  const spendingGrowth = ((monthlySpendingData[5].spending - monthlySpendingData[0].spending) / monthlySpendingData[0].spending) * 100;
  const rechargeGrowth = ((monthlySpendingData[5].recharge - monthlySpendingData[0].recharge) / monthlySpendingData[0].recharge) * 100;

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900">Wallet Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive wallet analytics and spending insights</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="quarterly">Quarterly Report</SelectItem>
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Current Balance</p>
                  <p className="text-2xl sm:text-3xl font-bold">₹{(currentBalance / 1000).toFixed(0)}K</p>
                  <p className="text-blue-200 text-sm mt-1">Available funds</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total Recharge</p>
                  <p className="text-2xl sm:text-3xl font-bold">₹{(totalRecharge / 100000).toFixed(1)}L</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-emerald-200 mr-1" />
                    <p className="text-emerald-200 text-sm">+{rechargeGrowth.toFixed(1)}%</p>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Total Spending</p>
                  <p className="text-2xl sm:text-3xl font-bold">₹{(totalSpending / 100000).toFixed(1)}L</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-amber-200 mr-1" />
                    <p className="text-amber-200 text-sm">+{spendingGrowth.toFixed(1)}%</p>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Monthly</p>
                  <p className="text-2xl sm:text-3xl font-bold">₹{(avgMonthlySpending / 1000).toFixed(0)}K</p>
                  <p className="text-purple-200 text-sm mt-1">Spending</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Monthly Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Monthly Wallet Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySpendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${(value / 1000).toFixed(0)}K`, ""]} />
                  <Legend />
                  <Bar dataKey="recharge" fill="#10B981" name="Recharge" />
                  <Bar dataKey="spending" fill="#EF4444" name="Spending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spending Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-emerald-600" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={spendingCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendingCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Wallet Balance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySpendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value / 1000).toFixed(0)}K`, "Balance"]} />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-600" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <Badge className={transaction.type === 'credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}>
                        {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className={`text-right font-semibold ${transaction.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-800 capitalize">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Spending Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                  <TableHead className="text-right">Transactions</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spendingCategoryData.map((category, index) => (
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: pieChartColors[index] }}
                        ></div>
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{category.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{category.value}%</TableCell>
                    <TableCell className="text-right">{Math.floor(category.value * 2.3)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {index % 2 === 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                            <span className="text-emerald-600 text-sm">+{(Math.random() * 20).toFixed(1)}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                            <span className="text-red-600 text-sm">-{(Math.random() * 10).toFixed(1)}%</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding */}
      <div className="pb-6 lg:pb-8"></div>
    </div>
  );
}