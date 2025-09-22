import React, { useState } from "react";
import { 
  CreditCard, 
  Wallet, 
  History, 
  Plus, 
  Search, 
  Filter,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpCircle,
  Zap,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Mock data for wallet recharge history
const rechargeHistory = [
  {
    id: "WR001",
    amount: 50000,
    method: "Bank Transfer",
    status: "completed",
    date: "2024-01-15",
    time: "10:30 AM",
    transactionId: "TXN123456789",
    reference: "Monthly Top-up"
  },
  {
    id: "WR002", 
    amount: 25000,
    method: "UPI",
    status: "completed",
    date: "2024-01-12",
    time: "02:15 PM",
    transactionId: "TXN123456788",
    reference: "Quick Recharge"
  },
  {
    id: "WR003",
    amount: 75000,
    method: "Credit Card",
    status: "pending",
    date: "2024-01-10",
    time: "09:45 AM",
    transactionId: "TXN123456787",
    reference: "Bulk Recharge"
  },
  {
    id: "WR004",
    amount: 15000,
    method: "Net Banking",
    status: "failed",
    date: "2024-01-08",
    time: "04:20 PM",
    transactionId: "TXN123456786",
    reference: "Emergency Top-up"
  },
  {
    id: "WR005",
    amount: 100000,
    method: "Bank Transfer",
    status: "completed",
    date: "2024-01-05",
    time: "11:00 AM",
    transactionId: "TXN123456785",
    reference: "Quarterly Recharge"
  }
];

const quickRechargeAmounts = [5000, 10000, 25000, 50000];

export function WalletRecharge() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const filteredHistory = rechargeHistory.filter(transaction => {
    const matchesSearch = transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBalance = 284000;
  const pendingAmount = rechargeHistory.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const monthlyRecharge = rechargeHistory.filter(t => t.date.startsWith('2024-01')).reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              Wallet Recharge
            </h1>
            <p className="text-gray-600 mt-1">Manage your wallet balance and recharge history</p>
          </div>
        </div>

        {/* Quick Recharge Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Quick Recharge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-stretch gap-6">
              {/* Current Balance - Left Side */}
              <div className="lg:w-80 lg:flex-shrink-0">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 h-full">
                  <CardContent className="p-6 h-full flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="text-blue-100 text-sm">Current Balance</p>
                        <p className="text-2xl sm:text-3xl font-bold">₹{(totalBalance / 1000).toFixed(0)}K</p>
                        <p className="text-blue-200 text-sm mt-1">Available to use</p>
                      </div>
                      <Wallet className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recharge Controls - Right Side */}
              <div className="flex-1">
                <Card className="h-full border-0 shadow-sm">
                  <CardContent className="p-6 h-full flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {quickRechargeAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className="h-10 text-sm"
                            onClick={() => setSelectedAmount(amount)}
                          >
                            ₹{(amount / 1000).toFixed(0)}K
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                          placeholder="Enter custom amount"
                          className="flex-1"
                          type="number"
                        />
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Recharge Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recharge History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-gray-600" />
              Recharge History
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.transactionId}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{transaction.date}</span>
                        <span className="text-sm text-gray-500">{transaction.time}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1 capitalize">{transaction.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredHistory.map((transaction) => (
              <Card key={transaction.id} className="border border-gray-200">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-blue-600 text-sm">{transaction.transactionId}</h3>
                      <p className="text-xs text-gray-500">Transaction ID</p>
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(transaction.status)}
                        <span className="capitalize">{transaction.status}</span>
                      </div>
                    </Badge>
                  </div>

                  {/* Amount */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Amount</span>
                      <span className="font-semibold text-lg text-emerald-600">₹{transaction.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <CreditCard className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Payment Method</span>
                      </div>
                      <p className="text-sm font-medium">{transaction.method}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Date & Time</span>
                      </div>
                      <p className="text-sm font-medium">{transaction.date}</p>
                      <p className="text-xs text-gray-500">{transaction.time}</p>
                    </div>
                  </div>

                  {/* Reference */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Reference:</p>
                    <p className="text-sm text-gray-700">{transaction.reference}</p>
                  </div>

                  {/* Action */}
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding */}
      <div className="pb-6 lg:pb-8"></div>
    </div>
  );
}