import React, { useState } from "react";
import { 
  FileText, 
  Users, 
  Package, 
  Wallet, 
  CreditCard, 
  Ticket,
  Search, 
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Mock data for different report types
const allReports = [
  // User Reports
  {
    id: "UR001",
    type: "User",
    reportName: "Active Users Analysis",
    dateRange: "Jan 1 - Jan 31, 2024",
    generatedDate: "2024-01-31",
    totalUsers: 47892,
    activeUsers: 44267,
    newUsers: 1247,
    churnRate: "2.1%",
    avgRevenue: "₹1,245",
    status: "completed",
    icon: <Users className="h-4 w-4" />,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "UR002", 
    type: "User",
    reportName: "User Demographics",
    dateRange: "Dec 1 - Dec 31, 2023",
    generatedDate: "2023-12-31",
    totalUsers: 46645,
    activeUsers: 43521,
    newUsers: 892,
    churnRate: "1.8%",
    avgRevenue: "₹1,189",
    status: "in-progress",
    icon: <Users className="h-4 w-4" />,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "UR003", 
    type: "User",
    reportName: "Churn Analysis Report",
    dateRange: "Feb 1 - Feb 28, 2024",
    generatedDate: "2024-02-28",
    totalUsers: 48234,
    activeUsers: 45123,
    newUsers: 987,
    churnRate: "1.9%",
    avgRevenue: "₹1,298",
    status: "pending",
    icon: <Users className="h-4 w-4" />,
    color: "from-blue-500 to-blue-600"
  },
  
  // Package Reports
  {
    id: "PR001",
    type: "Package",
    reportName: "Package Performance",
    dateRange: "Jan 1 - Jan 31, 2024",
    generatedDate: "2024-01-31",
    totalPackages: 12,
    popularPackage: "Premium 100",
    revenue: "₹28.5L",
    subscriptions: 13245,
    conversionRate: "68.2%",
    status: "completed",
    icon: <Package className="h-4 w-4" />,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: "PR002",
    type: "Package",
    reportName: "Upgrade Analysis", 
    dateRange: "Dec 1 - Dec 31, 2023",
    generatedDate: "2023-12-31",
    totalPackages: 11,
    popularPackage: "Standard 50",
    revenue: "₹24.1L",
    subscriptions: 12567,
    conversionRate: "71.5%",
    status: "scheduled",
    icon: <Package className="h-4 w-4" />,
    color: "from-emerald-500 to-emerald-600"
  },

  // Wallet Reports
  {
    id: "WR001",
    type: "Wallet",
    reportName: "Wallet Transaction Summary",
    dateRange: "Jan 1 - Jan 31, 2024",
    generatedDate: "2024-01-31",
    totalTransactions: 5847,
    totalAmount: "₹142.3L",
    avgTransaction: "₹24,356",
    successRate: "96.8%",
    pendingAmount: "₹3.2L",
    status: "completed",
    icon: <Wallet className="h-4 w-4" />,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "WR002",
    type: "Wallet",
    reportName: "Recharge Patterns",
    dateRange: "Dec 1 - Dec 31, 2023",
    generatedDate: "2023-12-31",
    totalTransactions: 5234,
    totalAmount: "₹128.7L",
    avgTransaction: "₹24,589",
    successRate: "97.2%",
    pendingAmount: "₹2.8L",
    status: "in-progress",
    icon: <Wallet className="h-4 w-4" />,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "WR003",
    type: "Wallet",
    reportName: "Payment Gateway Analysis",
    dateRange: "Feb 1 - Feb 28, 2024",
    generatedDate: "2024-02-28",
    totalTransactions: 6123,
    totalAmount: "₹156.8L",
    avgTransaction: "₹25,598",
    successRate: "97.8%",
    pendingAmount: "₹2.1L",
    status: "pending",
    icon: <Wallet className="h-4 w-4" />,
    color: "from-purple-500 to-purple-600"
  },

  // Billing Reports
  {
    id: "BR001",
    type: "Billing",
    reportName: "Monthly Billing Summary",
    dateRange: "Jan 1 - Jan 31, 2024",
    generatedDate: "2024-01-31",
    totalBills: 44267,
    totalRevenue: "₹28.5L",
    paidBills: 42156,
    pendingBills: 1834,
    overdueAmount: "₹1.2L",
    status: "completed",
    icon: <CreditCard className="h-4 w-4" />,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "BR002",
    type: "Billing",
    reportName: "Payment Methods Analysis",
    dateRange: "Dec 1 - Dec 31, 2023",
    generatedDate: "2023-12-31",
    totalBills: 42834,
    totalRevenue: "₹26.8L", 
    paidBills: 40923,
    pendingBills: 1567,
    overdueAmount: "₹945K",
    status: "scheduled",
    icon: <CreditCard className="h-4 w-4" />,
    color: "from-amber-500 to-orange-600"
  },

  // Ticket Reports
  {
    id: "TR001",
    type: "Ticket",
    reportName: "Support Ticket Analysis",
    dateRange: "Jan 1 - Jan 31, 2024",
    generatedDate: "2024-01-31",
    totalTickets: 1247,
    resolvedTickets: 1089,
    pendingTickets: 123,
    avgResolutionTime: "4.2 hours",
    satisfactionRate: "94.2%",
    status: "completed",
    icon: <Ticket className="h-4 w-4" />,
    color: "from-rose-500 to-rose-600"
  },
  {
    id: "TR002",
    type: "Ticket",
    reportName: "Issue Category Breakdown",
    dateRange: "Dec 1 - Dec 31, 2023",
    generatedDate: "2023-12-31",
    totalTickets: 1156,
    resolvedTickets: 1034,
    pendingTickets: 89,
    avgResolutionTime: "3.8 hours",
    satisfactionRate: "95.1%",
    status: "in-progress",
    icon: <Ticket className="h-4 w-4" />,
    color: "from-rose-500 to-rose-600"
  }
];

export function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [activeQuickFilter, setActiveQuickFilter] = useState("all");

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuickFilter = activeQuickFilter === "all" || report.type.toLowerCase() === activeQuickFilter;
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "current" && report.generatedDate.startsWith("2024")) ||
                       (dateFilter === "previous" && report.generatedDate.startsWith("2023"));
    return matchesSearch && matchesQuickFilter && matchesDate;
  });

  const handleSelectReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const handleQuickFilter = (filterType: string) => {
    setActiveQuickFilter(filterType);
    setReportTypeFilter("all"); // Reset dropdown filter when using quick access
    setSelectedReports([]); // Clear selections when filtering
  };

  const handleDownloadPDF = (reportId?: string) => {
    if (reportId) {
      // Download single report
      console.log(`Downloading PDF for report: ${reportId}`);
    } else {
      // Download selected reports
      console.log(`Downloading PDFs for reports: ${selectedReports.join(', ')}`);
    }
    // In a real implementation, this would trigger PDF generation and download
  };

  const getReportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'package': return 'bg-emerald-100 text-emerald-800';
      case 'wallet': return 'bg-purple-100 text-purple-800';
      case 'billing': return 'bg-amber-100 text-amber-800';
      case 'ticket': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-amber-100 text-amber-800';
      case 'pending': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Summary statistics
  const summaryStats = {
    totalReports: allReports.length,
    userReports: allReports.filter(r => r.type.toLowerCase() === 'user').length,
    packageReports: allReports.filter(r => r.type.toLowerCase() === 'package').length,
    walletReports: allReports.filter(r => r.type.toLowerCase() === 'wallet').length,
    billingReports: allReports.filter(r => r.type.toLowerCase() === 'billing').length,
    ticketReports: allReports.filter(r => r.type.toLowerCase() === 'ticket').length,
  };

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">Comprehensive reporting across all business operations</p>
          </div>
          
          <div className="flex items-center gap-3">

            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={() => handleDownloadPDF()}
              disabled={selectedReports.length === 0}
            >
              <Download className="h-4 w-4" />
              Download Selected ({selectedReports.length})
            </Button>
          </div>
        </div>

        {/* Quick Access Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={activeQuickFilter === "all" ? "default" : "outline"}
            onClick={() => handleQuickFilter("all")}
            className={`${activeQuickFilter === "all" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"}`}
          >
            All Reports ({allReports.length})
          </Button>
          <Button
            variant={activeQuickFilter === "user" ? "default" : "outline"}
            onClick={() => handleQuickFilter("user")}
            className={`${activeQuickFilter === "user" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"}`}
          >
            User ({allReports.filter(r => r.type.toLowerCase() === 'user').length})
          </Button>
          <Button
            variant={activeQuickFilter === "package" ? "default" : "outline"}
            onClick={() => handleQuickFilter("package")}
            className={`${activeQuickFilter === "package" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"}`}
          >
            Package ({allReports.filter(r => r.type.toLowerCase() === 'package').length})
          </Button>
          <Button
            variant={activeQuickFilter === "wallet" ? "default" : "outline"}
            onClick={() => handleQuickFilter("wallet")}
            className={`${activeQuickFilter === "wallet" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"}`}
          >
            Wallet ({allReports.filter(r => r.type.toLowerCase() === 'wallet').length})
          </Button>
          <Button
            variant={activeQuickFilter === "billing" ? "default" : "outline"}
            onClick={() => handleQuickFilter("billing")}
            className={`${activeQuickFilter === "billing" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"}`}
          >
            Billing ({allReports.filter(r => r.type.toLowerCase() === 'billing').length})
          </Button>
          <Button
            variant={activeQuickFilter === "ticket" ? "default" : "outline"}
            onClick={() => handleQuickFilter("ticket")}
            className={`${activeQuickFilter === "ticket" ? "bg-rose-600 hover:bg-rose-700" : "hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300"}`}
          >
            Ticket ({allReports.filter(r => r.type.toLowerCase() === 'ticket').length})
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {activeQuickFilter === "all" ? "All Reports" : 
                 `${activeQuickFilter.charAt(0).toUpperCase() + activeQuickFilter.slice(1)} Reports`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredReports.length} of {allReports.length} reports
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <Input
                  type="date"
                  placeholder="From"
                  className="w-full sm:w-36"
                />
                <span className="text-gray-500 text-sm flex-shrink-0">to</span>
                <Input
                  type="date"
                  placeholder="To"
                  className="w-full sm:w-36"
                />
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Key Metrics</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={() => handleSelectReport(report.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${report.color} flex items-center justify-center text-white`}>
                          {report.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{report.reportName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getReportTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{report.dateRange}</TableCell>
                    <TableCell className="text-gray-600">{report.generatedDate}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        {report.type === 'User' && (
                          <>
                            <div>Users: {report.totalUsers?.toLocaleString()}</div>
                            <div className="text-emerald-600">+{report.newUsers} new</div>
                          </>
                        )}
                        {report.type === 'Package' && (
                          <>
                            <div>Revenue: {report.revenue}</div>
                            <div className="text-blue-600">{report.conversionRate} conversion</div>
                          </>
                        )}
                        {report.type === 'Wallet' && (
                          <>
                            <div>Volume: {report.totalAmount}</div>
                            <div className="text-emerald-600">{report.successRate} success</div>
                          </>
                        )}
                        {report.type === 'Billing' && (
                          <>
                            <div>Revenue: {report.totalRevenue}</div>
                            <div className="text-amber-600">{report.pendingBills} pending</div>
                          </>
                        )}
                        {report.type === 'Ticket' && (
                          <>
                            <div>Total: {report.totalTickets}</div>
                            <div className="text-emerald-600">{report.satisfactionRate} satisfaction</div>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadPDF(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No reports found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom padding */}
      <div className="pb-6 lg:pb-8"></div>
    </div>
  );
}