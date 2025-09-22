import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { DateFilter } from "./date-filter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  Plus, 
  Receipt, 
  Calendar, 
  DollarSign, 
  User, 
  Wifi,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock billing data for ISP customers
const billingData = [
  {
    id: "INV-2024-001247",
    customerName: "Rajesh Kumar",
    customerId: "CUS-001247",
    plan: "Premium 100 Mbps",
    amount: 1999,
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    status: "paid",
    paymentDate: "2024-01-12",
    paymentMethod: "UPI",
    address: "A-123, Green Park, Delhi",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    connectionId: "CON-789123",
    previousBalance: 0,
    lateFee: 0,
    discount: 0,
    taxes: 359.82,
    totalAmount: 1999
  },
  {
    id: "INV-2024-001248",
    customerName: "Priya Sharma",
    customerId: "CUS-001248", 
    plan: "Standard 50 Mbps",
    amount: 899,
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    address: "B-456, Sector 15, Gurgaon",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    connectionId: "CON-789124",
    previousBalance: 150,
    lateFee: 0,
    discount: 50,
    taxes: 161.82,
    totalAmount: 899
  },
  {
    id: "INV-2024-001249",
    customerName: "Mohammed Ali",
    customerId: "CUS-001249",
    plan: "Basic 25 Mbps", 
    amount: 499,
    dueDate: "2024-01-10",
    issueDate: "2024-01-01",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    address: "C-789, Old City, Hyderabad",
    phone: "+91 76543 21098",
    email: "mohammed.ali@email.com",
    connectionId: "CON-789125",
    previousBalance: 0,
    lateFee: 99.8,
    discount: 0,
    taxes: 89.82,
    totalAmount: 598.8
  },
  {
    id: "INV-2024-001250",
    customerName: "Sneha Reddy",
    customerId: "CUS-001250",
    plan: "Enterprise 200 Mbps",
    amount: 4999,
    dueDate: "2024-02-01",
    issueDate: "2024-01-15",
    status: "paid",
    paymentDate: "2024-01-28",
    paymentMethod: "Bank Transfer",
    address: "D-012, IT Park, Bangalore",
    phone: "+91 65432 10987",
    email: "sneha.reddy@email.com",
    connectionId: "CON-789126",
    previousBalance: 0,
    lateFee: 0,
    discount: 500,
    taxes: 899.82,
    totalAmount: 4999
  },
  {
    id: "INV-2024-001251",
    customerName: "Vikram Singh",
    customerId: "CUS-001251",
    plan: "Fiber Giga 1 Gbps",
    amount: 9999,
    dueDate: "2024-02-05",
    issueDate: "2024-01-20",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    address: "E-567, Business District, Mumbai",
    phone: "+91 54321 09876",
    email: "vikram.singh@email.com",
    connectionId: "CON-789127",
    previousBalance: 0,
    lateFee: 0,
    discount: 1000,
    taxes: 1799.82,
    totalAmount: 9999
  },
  {
    id: "INV-2024-001252",
    customerName: "Anita Desai",
    customerId: "CUS-001252",
    plan: "Standard 50 Mbps",
    amount: 899,
    dueDate: "2024-01-25",
    issueDate: "2024-01-10",
    status: "failed",
    paymentDate: null,
    paymentMethod: null,
    address: "F-890, Residency Road, Chennai",
    phone: "+91 43210 98765",
    email: "anita.desai@email.com",
    connectionId: "CON-789128",
    previousBalance: 0,
    lateFee: 0,
    discount: 0,
    taxes: 161.82,
    totalAmount: 899
  },
  {
    id: "INV-2024-001253",
    customerName: "Rohit Verma",
    customerId: "CUS-001253",
    plan: "Premium 100 Mbps",
    amount: 1999,
    dueDate: "2024-02-10",
    issueDate: "2024-01-25",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    address: "G-123, Tech City, Pune",
    phone: "+91 32109 87654",
    email: "rohit.verma@email.com",
    connectionId: "CON-789129",
    previousBalance: 0,
    lateFee: 0,
    discount: 100,
    taxes: 359.82,
    totalAmount: 1999
  },
  {
    id: "INV-2024-001254",
    customerName: "Kavita Nair",
    customerId: "CUS-001254",
    plan: "Basic 25 Mbps",
    amount: 499,
    dueDate: "2024-01-30",
    issueDate: "2024-01-15",
    status: "paid",
    paymentDate: "2024-01-28",
    paymentMethod: "Credit Card",
    address: "H-456, Marina Beach, Chennai",
    phone: "+91 21098 76543",
    email: "kavita.nair@email.com",
    connectionId: "CON-789130",
    previousBalance: 0,
    lateFee: 0,
    discount: 0,
    taxes: 89.82,
    totalAmount: 499
  },
  {
    id: "INV-2024-001255",
    customerName: "Arjun Patel",
    customerId: "CUS-001255",
    plan: "Enterprise 200 Mbps",
    amount: 4999,
    dueDate: "2024-02-15",
    issueDate: "2024-02-01",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    address: "I-789, Business Hub, Ahmedabad",
    phone: "+91 10987 65432",
    email: "arjun.patel@email.com",
    connectionId: "CON-789131",
    previousBalance: 200,
    lateFee: 500,
    discount: 0,
    taxes: 899.82,
    totalAmount: 5699
  },
  {
    id: "INV-2024-001256",
    customerName: "Deepika Iyer",
    customerId: "CUS-001256",
    plan: "Fiber Giga 1 Gbps",
    amount: 9999,
    dueDate: "2024-02-20",
    issueDate: "2024-02-05",
    status: "paid",
    paymentDate: "2024-02-15",
    paymentMethod: "Net Banking",
    address: "J-012, Software Park, Bangalore",
    phone: "+91 09876 54321",
    email: "deepika.iyer@email.com",
    connectionId: "CON-789132",
    previousBalance: 0,
    lateFee: 0,
    discount: 2000,
    taxes: 1799.82,
    totalAmount: 9999
  },
  {
    id: "INV-2024-001257",
    customerName: "Suresh Kumar",
    customerId: "CUS-001257",
    plan: "Standard 50 Mbps",
    amount: 899,
    dueDate: "2024-02-05",
    issueDate: "2024-01-20",
    status: "failed",
    paymentDate: null,
    paymentMethod: null,
    address: "K-345, Civil Lines, Lucknow",
    phone: "+91 98765 43210",
    email: "suresh.kumar@email.com",
    connectionId: "CON-789133",
    previousBalance: 50,
    lateFee: 0,
    discount: 0,
    taxes: 161.82,
    totalAmount: 949
  },
  {
    id: "INV-2024-001258",
    customerName: "Meera Gupta",
    customerId: "CUS-001258",
    plan: "Premium 100 Mbps",
    amount: 1999,
    dueDate: "2024-02-25",
    issueDate: "2024-02-10",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    address: "L-678, New Town, Kolkata",
    phone: "+91 87654 32109",
    email: "meera.gupta@email.com",
    connectionId: "CON-789134",
    previousBalance: 0,
    lateFee: 0,
    discount: 200,
    taxes: 359.82,
    totalAmount: 1999
  },
  {
    id: "INV-2024-001259",
    customerName: "Karthik Reddy",
    customerId: "CUS-001259",
    plan: "Basic 25 Mbps",
    amount: 499,
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    address: "M-901, HITEC City, Hyderabad",
    phone: "+91 76543 21098",
    email: "karthik.reddy@email.com",
    connectionId: "CON-789135",
    previousBalance: 0,
    lateFee: 149.7,
    discount: 0,
    taxes: 89.82,
    totalAmount: 648.7
  },
  {
    id: "INV-2024-001260",
    customerName: "Nisha Sharma",
    customerId: "CUS-001260",
    plan: "Enterprise 200 Mbps",
    amount: 4999,
    dueDate: "2024-03-01",
    issueDate: "2024-02-15",
    status: "paid",
    paymentDate: "2024-02-28",
    paymentMethod: "UPI",
    address: "N-234, Cyber City, Gurgaon",
    phone: "+91 65432 10987",
    email: "nisha.sharma@email.com",
    connectionId: "CON-789136",
    previousBalance: 0,
    lateFee: 0,
    discount: 500,
    taxes: 899.82,
    totalAmount: 4999
  },
  {
    id: "INV-2024-001261",
    customerName: "Arun Singh",
    customerId: "CUS-001261",
    plan: "Standard 50 Mbps",
    amount: 899,
    dueDate: "2024-02-28",
    issueDate: "2024-02-12",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    address: "O-567, Green Valley, Jaipur",
    phone: "+91 54321 09876",
    email: "arun.singh@email.com",
    connectionId: "CON-789137",
    previousBalance: 0,
    lateFee: 0,
    discount: 0,
    taxes: 161.82,
    totalAmount: 899
  },
  {
    id: "INV-2024-001262",
    customerName: "Pooja Mehta",
    customerId: "CUS-001262",
    plan: "Fiber Giga 1 Gbps",
    amount: 9999,
    dueDate: "2024-03-05",
    issueDate: "2024-02-18",
    status: "failed",
    paymentDate: null,
    paymentMethod: null,
    address: "P-890, Palm Meadows, Chennai",
    phone: "+91 43210 98765",
    email: "pooja.mehta@email.com",
    connectionId: "CON-789138",
    previousBalance: 0,
    lateFee: 0,
    discount: 1500,
    taxes: 1799.82,
    totalAmount: 9999
  },
  {
    id: "INV-2024-001263",
    customerName: "Ravi Agarwal",
    customerId: "CUS-001263",
    plan: "Premium 100 Mbps",
    amount: 1999,
    dueDate: "2024-03-10",
    issueDate: "2024-02-25",
    status: "paid",
    paymentDate: "2024-03-08",
    paymentMethod: "Bank Transfer",
    address: "Q-123, Industrial Area, Indore",
    phone: "+91 32109 87654",
    email: "ravi.agarwal@email.com",
    connectionId: "CON-789139",
    previousBalance: 0,
    lateFee: 0,
    discount: 0,
    taxes: 359.82,
    totalAmount: 1999
  },
  {
    id: "INV-2024-001264",
    customerName: "Sunita Joshi",
    customerId: "CUS-001264",
    plan: "Basic 25 Mbps",
    amount: 499,
    dueDate: "2024-02-15",
    issueDate: "2024-02-01",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    address: "R-456, Lake View, Udaipur",
    phone: "+91 21098 76543",
    email: "sunita.joshi@email.com",
    connectionId: "CON-789140",
    previousBalance: 0,
    lateFee: 99.8,
    discount: 0,
    taxes: 89.82,
    totalAmount: 598.8
  },
  {
    id: "INV-2024-001265",
    customerName: "Manish Tiwari",
    customerId: "CUS-001265",
    plan: "Enterprise 200 Mbps",
    amount: 4999,
    dueDate: "2024-03-15",
    issueDate: "2024-03-01",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    address: "S-789, Tech Valley, Noida",
    phone: "+91 10987 65432",
    email: "manish.tiwari@email.com",
    connectionId: "CON-789141",
    previousBalance: 0,
    lateFee: 0,
    discount: 300,
    taxes: 899.82,
    totalAmount: 4999
  },
  {
    id: "INV-2024-001266",
    customerName: "Rekha Malhotra",
    customerId: "CUS-001266",
    plan: "Standard 50 Mbps",
    amount: 899,
    dueDate: "2024-03-20",
    issueDate: "2024-03-05",
    status: "paid",
    paymentDate: "2024-03-18",
    paymentMethod: "Credit Card",
    address: "T-012, DLF Phase 3, Gurgaon",
    phone: "+91 09876 54321",
    email: "rekha.malhotra@email.com",
    connectionId: "CON-789142",
    previousBalance: 0,
    lateFee: 0,
    discount: 50,
    taxes: 161.82,
    totalAmount: 899
  },
];

const statusConfig = {
  paid: { color: "bg-emerald-100 text-emerald-800", icon: CheckCircle2, label: "Paid" },
  pending: { color: "bg-amber-100 text-amber-800", icon: Clock, label: "Pending" },
  overdue: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Overdue" },
  failed: { color: "bg-gray-100 text-gray-800", icon: AlertCircle, label: "Failed" },
};

export function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showNewBillingDialog, setShowNewBillingDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [showBillDetails, setShowBillDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDateChange = (dateRange: any) => {
    console.log("Date range changed:", dateRange);
  };

  const filteredBills = billingData.filter((bill) => {
    const matchesSearch = 
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBills = filteredBills.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (newFilter: string) => {
    setStatusFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewBill = (bill: any) => {
    setSelectedBill(bill);
    setShowBillDetails(true);
  };



  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Receipt className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              Billing Management
            </h1>
            <p className="text-gray-600 mt-1">Manage customer bills and generate new invoices</p>
          </div>
          
          {/* New Billing Button */}
          <Dialog open={showNewBillingDialog} onOpenChange={setShowNewBillingDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                New Billing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  Generate New Bill
                </DialogTitle>
                <DialogDescription>
                  Create a new billing invoice for a customer. Fill in the required details to generate the bill.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer ID</Label>
                    <Input placeholder="Enter customer ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bill Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Month</SelectItem>
                        <SelectItem value="previous">Previous Month</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic 25 Mbps - ₹499</SelectItem>
                        <SelectItem value="standard">Standard 50 Mbps - ₹899</SelectItem>
                        <SelectItem value="premium">Premium 100 Mbps - ₹1,999</SelectItem>
                        <SelectItem value="enterprise">Enterprise 200 Mbps - ₹4,999</SelectItem>
                        <SelectItem value="giga">Fiber Giga 1 Gbps - ₹9,999</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Discount (₹)</Label>
                    <Input placeholder="0" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Late Fee (₹)</Label>
                    <Input placeholder="0" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Previous Balance (₹)</Label>
                    <Input placeholder="0" type="number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Enter any additional notes or charges..." />
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowNewBillingDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Receipt className="w-4 h-4 mr-2" />
                    Generate Bill
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
            className={`${statusFilter === "all" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"}`}
          >
            All ({billingData.length})
          </Button>
          <Button
            variant={statusFilter === "paid" ? "default" : "outline"}
            onClick={() => handleFilterChange("paid")}
            className={`${statusFilter === "paid" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"}`}
          >
            Paid ({billingData.filter(b => b.status === 'paid').length})
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => handleFilterChange("pending")}
            className={`${statusFilter === "pending" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"}`}
          >
            Pending ({billingData.filter(b => b.status === 'pending').length})
          </Button>
          <Button
            variant={statusFilter === "failed" ? "default" : "outline"}
            onClick={() => handleFilterChange("failed")}
            className={`${statusFilter === "failed" ? "bg-gray-600 hover:bg-gray-700" : "hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Failed ({billingData.filter(b => b.status === 'failed').length})
          </Button>
          <Button
            variant={statusFilter === "overdue" ? "default" : "outline"}
            onClick={() => handleFilterChange("overdue")}
            className={`${statusFilter === "overdue" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50 hover:text-red-700 hover:border-red-300"}`}
          >
            Overdue ({billingData.filter(b => b.status === 'overdue').length})
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              Customer Bills
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <DateFilter onDateChange={handleDateChange} />
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by customer name, bill ID, or email..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            

          </div>

          {/* Bills Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700">Bill ID</TableHead>
                    <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-700">Plan</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-700">Due Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBills.map((bill) => {
                    const statusInfo = statusConfig[bill.status as keyof typeof statusConfig];
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <TableRow key={bill.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-semibold text-blue-600">
                          {bill.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">{bill.customerName}</div>
                            <div className="text-sm text-gray-500">{bill.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{bill.plan}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${statusInfo.color} flex items-center gap-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-gray-900">
                            ₹{bill.totalAmount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(bill.dueDate).toLocaleDateString('en-IN')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewBill(bill)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredBills.length)} of {filteredBills.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === page 
                          ? "bg-blue-600 hover:bg-blue-700" 
                          : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bill Details Dialog */}
      <Dialog open={showBillDetails} onOpenChange={setShowBillDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedBill && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  Bill Details - {selectedBill.id}
                </DialogTitle>
                <DialogDescription>
                  View complete bill information including customer details, charges breakdown, and payment status.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Customer Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedBill.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer ID:</span>
                        <span className="font-medium">{selectedBill.customerId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Connection ID:</span>
                        <span className="font-medium">{selectedBill.connectionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedBill.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedBill.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right">{selectedBill.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Bill Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="font-medium">{new Date(selectedBill.issueDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{new Date(selectedBill.dueDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{selectedBill.plan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={statusConfig[selectedBill.status as keyof typeof statusConfig].color}>
                          {statusConfig[selectedBill.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      {selectedBill.paymentDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Date:</span>
                          <span className="font-medium">{new Date(selectedBill.paymentDate).toLocaleDateString('en-IN')}</span>
                        </div>
                      )}
                      {selectedBill.paymentMethod && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium">{selectedBill.paymentMethod}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bill Breakdown */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Bill Breakdown</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Plan Amount:</span>
                      <span>₹{selectedBill.amount.toLocaleString()}</span>
                    </div>
                    {selectedBill.previousBalance > 0 && (
                      <div className="flex justify-between">
                        <span>Previous Balance:</span>
                        <span>₹{selectedBill.previousBalance.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedBill.lateFee > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Late Fee:</span>
                        <span>₹{selectedBill.lateFee.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedBill.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-₹{selectedBill.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Taxes & Fees:</span>
                      <span>₹{selectedBill.taxes.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-lg">
                      <span>Total Amount:</span>
                      <span>₹{selectedBill.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Bill
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  {selectedBill.status === 'pending' && (
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}