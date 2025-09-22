import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { DateFilter } from "./date-filter";
import { TrendingUp, TrendingDown, Users, Wifi, Activity, DollarSign, Clock, Globe, Signal, Zap } from "lucide-react";

// Enhanced ISP-specific operational data
const connectionStats = [
  { 
    metric: "Total Connections", 
    value: "47,892", 
    change: "+2.4%", 
    status: "up", 
    icon: Users, 
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
    description: "Active subscriber connections"
  },
  { 
    metric: "Bandwidth Utilization", 
    value: "78.5%", 
    change: "+5.2%", 
    status: "up", 
    icon: Activity, 
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50", 
    textColor: "text-emerald-700",
    description: "Peak hour usage capacity"
  },
  { 
    metric: "Network Uptime", 
    value: "99.92%", 
    change: "+0.05%", 
    status: "up", 
    icon: Signal, 
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-700",
    description: "Service availability this month"
  },
  { 
    metric: "Avg Speed Delivered", 
    value: "89.7 Mbps", 
    change: "+12.3%", 
    status: "up", 
    icon: Zap, 
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
    description: "Average speed across all plans"
  },
  { 
    metric: "Support Tickets", 
    value: "127", 
    change: "-18.5%", 
    status: "down", 
    icon: Clock, 
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700",
    description: "Open tickets this week"
  },
  { 
    metric: "Service Areas", 
    value: "24", 
    change: "+2", 
    status: "up", 
    icon: Globe, 
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    description: "Coverage zones active"
  },
];

const planPerformance = [
  { 
    plan: "Basic 25 Mbps", 
    users: "12,450", 
    revenue: "₹62.25L", 
    growth: "+5.2%", 
    satisfaction: "87%",
    churn: "2.1%",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700"
  },
  { 
    plan: "Standard 50 Mbps", 
    users: "18,900", 
    revenue: "₹169.11L", 
    growth: "+12.8%", 
    satisfaction: "92%",
    churn: "1.4%",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700"
  },
  { 
    plan: "Premium 100 Mbps", 
    users: "8,920", 
    revenue: "₹178.28L", 
    growth: "+8.4%", 
    satisfaction: "95%",
    churn: "0.8%",
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700"
  },
  { 
    plan: "Enterprise 200 Mbps", 
    users: "5,780", 
    revenue: "₹288.89L", 
    growth: "+22.1%", 
    satisfaction: "98%",
    churn: "0.3%",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700"
  },
  { 
    plan: "Fiber Giga", 
    users: "1,756", 
    revenue: "₹175.60L", 
    growth: "+45.7%", 
    satisfaction: "99%",
    churn: "0.1%",
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-700"
  },
];

const operationalMetrics = [
  { 
    category: "New Installations", 
    count: "1,247", 
    percentage: "26.1%", 
    trend: "up",
    monthlyTarget: "1,200",
    status: "exceeded",
    icon: TrendingUp,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700" 
  },
  { 
    category: "Service Upgrades", 
    count: "892", 
    percentage: "18.6%", 
    trend: "up",
    monthlyTarget: "800",
    status: "exceeded",
    icon: TrendingUp,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700"
  },
  { 
    category: "Disconnections", 
    count: "156", 
    percentage: "3.3%", 
    trend: "down",
    monthlyTarget: "200",
    status: "better",
    icon: TrendingDown,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-700"
  },
  { 
    category: "Maintenance", 
    count: "89", 
    percentage: "1.9%", 
    trend: "down",
    monthlyTarget: "100",
    status: "on-track",
    icon: Activity,
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700"
  },
  { 
    category: "Network Expansion", 
    count: "12", 
    percentage: "New Areas", 
    trend: "up",
    monthlyTarget: "10",
    status: "exceeded",
    icon: Globe,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700"
  },
];

export function StatisticsTables() {
  const handleDateChange = (dateRange: any) => {
    console.log("Date range changed:", dateRange);
    // Here you would typically filter your data based on the selected date range
  };

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl border border-gray-200">
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Real-time Operational Dashboard
          </h3>
          <p className="text-gray-600 text-sm">Live metrics and performance indicators</p>
        </div>
        <DateFilter onDateChange={handleDateChange} />
      </div>
      
      {/* Enhanced Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        
        {/* Network & Connection Statistics */}
        <Card className="lg:col-span-2 2xl:col-span-1 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-500 group">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wifi className="w-5 h-5" />
              Network Operations
            </CardTitle>
            <p className="text-blue-100 text-sm">Live connection and performance metrics</p>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="p-4 space-y-3">
                {connectionStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className={`${stat.lightColor} p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group/item`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`${stat.color} p-2 rounded-lg text-white group-hover/item:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{stat.metric}</div>
                            <div className="text-xs text-gray-600">{stat.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${stat.textColor}`}>{stat.value}</div>
                          <div className="flex items-center gap-1">
                            {stat.status === "up" ? (
                              <TrendingUp className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            )}
                            <span className={`text-xs font-medium ${stat.status === "up" ? "text-emerald-600" : "text-red-600"}`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Plan Performance Analysis */}
        <Card className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="w-5 h-5" />
              Plan Performance
            </CardTitle>
            <p className="text-emerald-100 text-sm">Revenue and subscriber metrics by plan</p>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-700">Plan</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700">Users</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700 hidden sm:table-cell">Revenue</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planPerformance.map((plan, index) => (
                    <TableRow key={index} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                      <TableCell className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{plan.plan}</div>
                            <div className="text-xs text-gray-500">Satisfaction: {plan.satisfaction}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="text-sm font-semibold text-gray-900">{plan.users}</div>
                        <div className="text-xs text-gray-500">Churn: {plan.churn}</div>
                      </TableCell>
                      <TableCell className="p-3 hidden sm:table-cell">
                        <div className="text-sm font-semibold text-gray-900">{plan.revenue}</div>
                      </TableCell>
                      <TableCell className="p-3">
                        <Badge className={`${plan.lightColor} ${plan.textColor} border-0 font-semibold`}>
                          {plan.growth}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Operational Activities */}
        <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5" />
              Operations Tracker
            </CardTitle>
            <p className="text-purple-100 text-sm">Monthly activities and targets</p>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="p-4 space-y-3">
                {operationalMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div key={index} className={`${metric.lightColor} p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group/item`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`${metric.color} p-2 rounded-lg text-white group-hover/item:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{metric.category}</div>
                            <div className="text-xs text-gray-600">Target: {metric.monthlyTarget}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${metric.textColor}`}>{metric.count}</div>
                          <div className="flex items-center gap-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              metric.status === 'exceeded' ? 'bg-emerald-100 text-emerald-700' :
                              metric.status === 'better' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {metric.status === 'exceeded' ? '✓ Exceeded' :
                               metric.status === 'better' ? '✓ Better' : '→ On Track'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${metric.color} transition-all duration-500`}
                            style={{ 
                              width: `${Math.min(100, (parseInt(metric.count.replace(/,/g, '')) / parseInt(metric.monthlyTarget.replace(/,/g, ''))) * 100)}%` 
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0</span>
                          <span className="text-xs text-gray-500">{metric.monthlyTarget}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">₹696.1L</div>
            <div className="text-sm text-gray-300">Total Monthly Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">47,892</div>
            <div className="text-sm text-gray-300">Active Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">99.92%</div>
            <div className="text-sm text-gray-300">Network Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">₹1,454</div>
            <div className="text-sm text-gray-300">ARPU (Avg Revenue/User)</div>
          </div>
        </div>
      </div>
    </div>
  );
}