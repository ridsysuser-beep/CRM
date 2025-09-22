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
  Ticket, 
  Calendar, 
  Clock, 
  User, 
  Wifi,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpCircle,
  Minus,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";

// Mock ticket data for ISP customer issues
const ticketData = [
  {
    id: "TKT-2024-001247",
    ticketNumber: "TKT-001247",
    customerName: "Rajesh Kumar",
    customerId: "CUS-001247",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    issueType: "Connection Issue",
    issueDetails: "Internet connection keeps dropping frequently. Speed is very slow during peak hours. Unable to work from home.",
    priority: "high",
    status: "open",
    assignedTo: "Suresh Tech",
    assignedToId: "TECH-001",
    createdDate: "2024-01-15",
    createdTime: "10:30 AM",
    lastUpdated: "2024-01-15",
    lastUpdatedTime: "02:45 PM",
    category: "Technical",
    location: "A-123, Green Park, Delhi",
    connectionId: "CON-789123",
    planType: "Premium 100 Mbps",
    escalationLevel: 1,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001248",
    ticketNumber: "TKT-001248",
    customerName: "Priya Sharma",
    customerId: "CUS-001248",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    issueType: "Billing Query",
    issueDetails: "Charged for premium plan but still getting basic speed. Bill amount is incorrect.",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Amit Support",
    assignedToId: "SUPP-002",
    createdDate: "2024-01-14",
    createdTime: "03:15 PM",
    lastUpdated: "2024-01-15",
    lastUpdatedTime: "11:20 AM",
    category: "Billing",
    location: "B-456, Sector 15, Gurgaon",
    connectionId: "CON-789124",
    planType: "Standard 50 Mbps",
    escalationLevel: 0,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001249",
    ticketNumber: "TKT-001249",
    customerName: "Mohammed Ali",
    customerId: "CUS-001249",
    phone: "+91 76543 21098",
    email: "mohammed.ali@email.com",
    issueType: "No Internet",
    issueDetails: "Complete internet outage since yesterday evening. No connectivity at all.",
    priority: "critical",
    status: "open",
    assignedTo: "Vikram Field",
    assignedToId: "FIELD-003",
    createdDate: "2024-01-13",
    createdTime: "08:45 AM",
    lastUpdated: "2024-01-15",
    lastUpdatedTime: "09:15 AM",
    category: "Technical",
    location: "C-789, Old City, Hyderabad",
    connectionId: "CON-789125",
    planType: "Basic 25 Mbps",
    escalationLevel: 2,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001250",
    ticketNumber: "TKT-001250",
    customerName: "Sneha Reddy",
    customerId: "CUS-001250",
    phone: "+91 65432 10987",
    email: "sneha.reddy@email.com",
    issueType: "Speed Issue",
    issueDetails: "Getting only 50 Mbps instead of promised 200 Mbps enterprise connection.",
    priority: "high",
    status: "resolved",
    assignedTo: "Rahul Tech",
    assignedToId: "TECH-004",
    createdDate: "2024-01-12",
    createdTime: "02:20 PM",
    lastUpdated: "2024-01-14",
    lastUpdatedTime: "04:30 PM",
    category: "Technical",
    location: "D-012, IT Park, Bangalore",
    connectionId: "CON-789126",
    planType: "Enterprise 200 Mbps",
    escalationLevel: 0,
    resolutionTime: "36 hours",
    customerRating: 4
  },
  {
    id: "TKT-2024-001251",
    ticketNumber: "TKT-001251",
    customerName: "Vikram Singh",
    customerId: "CUS-001251",
    phone: "+91 54321 09876",
    email: "vikram.singh@email.com",
    issueType: "Equipment Issue",
    issueDetails: "Router keeps restarting automatically. WiFi signal is very weak in other rooms.",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Deepak Support",
    assignedToId: "SUPP-005",
    createdDate: "2024-01-11",
    createdTime: "06:45 PM",
    lastUpdated: "2024-01-15",
    lastUpdatedTime: "01:10 PM",
    category: "Hardware",
    location: "E-567, Business District, Mumbai",
    connectionId: "CON-789127",
    planType: "Fiber Giga 1 Gbps",
    escalationLevel: 1,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001252",
    ticketNumber: "TKT-001252",
    customerName: "Anita Desai",
    customerId: "CUS-001252",
    phone: "+91 43210 98765",
    email: "anita.desai@email.com",
    issueType: "Installation Request",
    issueDetails: "New connection installation scheduled but technician hasn't arrived yet.",
    priority: "medium",
    status: "pending",
    assignedTo: "Installation Team",
    assignedToId: "INST-006",
    createdDate: "2024-01-10",
    createdTime: "09:30 AM",
    lastUpdated: "2024-01-14",
    lastUpdatedTime: "12:45 PM",
    category: "Installation",
    location: "F-890, Residency Road, Chennai",
    connectionId: "CON-789128",
    planType: "Standard 50 Mbps",
    escalationLevel: 0,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001253",
    ticketNumber: "TKT-001253",
    customerName: "Rohit Verma",
    customerId: "CUS-001253",
    phone: "+91 32109 87654",
    email: "rohit.verma@email.com",
    issueType: "Plan Change",
    issueDetails: "Want to upgrade from Premium to Enterprise plan. Need information about pricing.",
    priority: "low",
    status: "closed",
    assignedTo: "Sales Team",
    assignedToId: "SALES-007",
    createdDate: "2024-01-09",
    createdTime: "11:15 AM",
    lastUpdated: "2024-01-12",
    lastUpdatedTime: "03:20 PM",
    category: "Sales",
    location: "G-123, Tech City, Pune",
    connectionId: "CON-789129",
    planType: "Premium 100 Mbps",
    escalationLevel: 0,
    resolutionTime: "48 hours",
    customerRating: 5
  },
  {
    id: "TKT-2024-001254",
    ticketNumber: "TKT-001254",
    customerName: "Kavita Nair",
    customerId: "CUS-001254",
    phone: "+91 21098 76543",
    email: "kavita.nair@email.com",
    issueType: "DNS Issue",
    issueDetails: "Cannot access certain websites. Getting DNS resolution errors.",
    priority: "medium",
    status: "resolved",
    assignedTo: "Network Team",
    assignedToId: "NET-008",
    createdDate: "2024-01-08",
    createdTime: "04:50 PM",
    lastUpdated: "2024-01-10",
    lastUpdatedTime: "10:30 AM",
    category: "Technical",
    location: "H-456, Marina Beach, Chennai",
    connectionId: "CON-789130",
    planType: "Basic 25 Mbps",
    escalationLevel: 0,
    resolutionTime: "18 hours",
    customerRating: 4
  },
  {
    id: "TKT-2024-001255",
    ticketNumber: "TKT-001255",
    customerName: "Arjun Patel",
    customerId: "CUS-001255",
    phone: "+91 10987 65432",
    email: "arjun.patel@email.com",
    issueType: "Port Issue",
    issueDetails: "Need additional ethernet ports for office setup. Current router has limited ports.",
    priority: "low",
    status: "pending",
    assignedTo: "Hardware Team",
    assignedToId: "HW-009",
    createdDate: "2024-01-07",
    createdTime: "01:25 PM",
    lastUpdated: "2024-01-13",
    lastUpdatedTime: "05:40 PM",
    category: "Hardware",
    location: "I-789, Business Hub, Ahmedabad",
    connectionId: "CON-789131",
    planType: "Enterprise 200 Mbps",
    escalationLevel: 0,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001256",
    ticketNumber: "TKT-001256",
    customerName: "Deepika Iyer",
    customerId: "CUS-001256",
    phone: "+91 09876 54321",
    email: "deepika.iyer@email.com",
    issueType: "WiFi Issue",
    issueDetails: "WiFi password not working. Unable to connect devices to wireless network.",
    priority: "medium",
    status: "open",
    assignedTo: "Suresh Tech",
    assignedToId: "TECH-001",
    createdDate: "2024-01-06",
    createdTime: "07:10 AM",
    lastUpdated: "2024-01-14",
    lastUpdatedTime: "11:55 AM",
    category: "Technical",
    location: "J-012, Software Park, Bangalore",
    connectionId: "CON-789132",
    planType: "Fiber Giga 1 Gbps",
    escalationLevel: 1,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001257",
    ticketNumber: "TKT-001257",
    customerName: "Suresh Kumar",
    customerId: "CUS-001257",
    phone: "+91 98765 43210",
    email: "suresh.kumar@email.com",
    issueType: "Latency Issue",
    issueDetails: "High ping and latency affecting online gaming and video calls.",
    priority: "high",
    status: "in-progress",
    assignedTo: "Network Team",
    assignedToId: "NET-008",
    createdDate: "2024-01-05",
    createdTime: "12:35 PM",
    lastUpdated: "2024-01-15",
    lastUpdatedTime: "08:25 AM",
    category: "Technical",
    location: "K-345, Civil Lines, Lucknow",
    connectionId: "CON-789133",
    planType: "Standard 50 Mbps",
    escalationLevel: 1,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001258",
    ticketNumber: "TKT-001258",
    customerName: "Meera Gupta",
    customerId: "CUS-001258",
    phone: "+91 87654 32109",
    email: "meera.gupta@email.com",
    issueType: "Account Issue",
    issueDetails: "Unable to access customer portal. Forgot password and reset link not working.",
    priority: "low",
    status: "resolved",
    assignedTo: "Support Team",
    assignedToId: "SUPP-010",
    createdDate: "2024-01-04",
    createdTime: "05:20 PM",
    lastUpdated: "2024-01-06",
    lastUpdatedTime: "02:15 PM",
    category: "Account",
    location: "L-678, New Town, Kolkata",
    connectionId: "CON-789134",
    planType: "Premium 100 Mbps",
    escalationLevel: 0,
    resolutionTime: "24 hours",
    customerRating: 5
  },
  {
    id: "TKT-2024-001259",
    ticketNumber: "TKT-001259",
    customerName: "Karthik Reddy",
    customerId: "CUS-001259",
    phone: "+91 76543 21098",
    email: "karthik.reddy@email.com",
    issueType: "Maintenance Request",
    issueDetails: "Request for cable maintenance. Visible wear and tear on outdoor cables.",
    priority: "medium",
    status: "scheduled",
    assignedTo: "Maintenance Team",
    assignedToId: "MAINT-011",
    createdDate: "2024-01-03",
    createdTime: "10:45 AM",
    lastUpdated: "2024-01-12",
    lastUpdatedTime: "09:30 AM",
    category: "Maintenance",
    location: "M-901, HITEC City, Hyderabad",
    connectionId: "CON-789135",
    planType: "Basic 25 Mbps",
    escalationLevel: 0,
    resolutionTime: null,
    customerRating: null
  },
  {
    id: "TKT-2024-001260",
    ticketNumber: "TKT-001260",
    customerName: "Nisha Sharma",
    customerId: "CUS-001260",
    phone: "+91 65432 10987",
    email: "nisha.sharma@email.com",
    issueType: "Configuration Issue",
    issueDetails: "Need help configuring VPN settings for work from home setup.",
    priority: "medium",
    status: "closed",
    assignedTo: "Technical Support",
    assignedToId: "TECH-012",
    createdDate: "2024-01-02",
    createdTime: "03:55 PM",
    lastUpdated: "2024-01-05",
    lastUpdatedTime: "06:20 PM",
    category: "Technical",
    location: "N-234, Cyber City, Gurgaon",
    connectionId: "CON-789136",
    planType: "Enterprise 200 Mbps",
    escalationLevel: 0,
    resolutionTime: "72 hours",
    customerRating: 4
  },
  {
    id: "TKT-2024-001261",
    ticketNumber: "TKT-001261",
    customerName: "Arun Singh",
    customerId: "CUS-001261",
    phone: "+91 54321 09876",
    email: "arun.singh@email.com",
    issueType: "Intermittent Connection",
    issueDetails: "Internet works for few hours then stops. Need to restart modem frequently.",
    priority: "high",
    status: "open",
    assignedTo: "Field Tech Team",
    assignedToId: "FIELD-013",
    createdDate: "2024-01-01",
    createdTime: "11:20 AM",
    lastUpdated: "2024-01-14",
    lastUpdatedTime: "07:45 PM",
    category: "Technical",
    location: "O-567, Green Valley, Jaipur",
    connectionId: "CON-789137",
    planType: "Standard 50 Mbps",
    escalationLevel: 2,
    resolutionTime: null,
    customerRating: null
  }
];

const statusConfig = {
  open: { color: "bg-blue-100 text-blue-800", icon: AlertCircle, label: "Open" },
  "in-progress": { color: "bg-amber-100 text-amber-800", icon: Clock, label: "In Progress" },
  resolved: { color: "bg-emerald-100 text-emerald-800", icon: CheckCircle2, label: "Resolved" },
  closed: { color: "bg-gray-100 text-gray-800", icon: XCircle, label: "Closed" },
  pending: { color: "bg-purple-100 text-purple-800", icon: Minus, label: "Pending" },
  scheduled: { color: "bg-indigo-100 text-indigo-800", icon: Calendar, label: "Scheduled" },
};

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800", label: "Low" },
  medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
  high: { color: "bg-orange-100 text-orange-800", label: "High" },
  critical: { color: "bg-red-100 text-red-800", label: "Critical" },
};

export function TicketManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showNewTicketDialog, setShowNewTicketDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDateChange = (dateRange: any) => {
    console.log("Date range changed:", dateRange);
  };

  const filteredTickets = ticketData.filter((ticket) => {
    const matchesSearch = 
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (newFilter: string, filterType: 'status' | 'priority') => {
    if (filterType === 'status') {
      setStatusFilter(newFilter);
    } else {
      setPriorityFilter(newFilter);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              Ticket Management
            </h1>
            <p className="text-gray-600 mt-1">Manage customer support tickets and technical issues</p>
          </div>
          
          {/* New Ticket Button */}
          <Dialog open={showNewTicketDialog} onOpenChange={setShowNewTicketDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-blue-600" />
                  Create New Support Ticket
                </DialogTitle>
                <DialogDescription>
                  Create a new support ticket for customer issues. Fill in the required details to track and resolve the issue.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer ID</Label>
                    <Input placeholder="Enter customer ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Issue Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="connection">Connection Issue</SelectItem>
                        <SelectItem value="speed">Speed Issue</SelectItem>
                        <SelectItem value="no-internet">No Internet</SelectItem>
                        <SelectItem value="wifi">WiFi Issue</SelectItem>
                        <SelectItem value="equipment">Equipment Issue</SelectItem>
                        <SelectItem value="billing">Billing Query</SelectItem>
                        <SelectItem value="installation">Installation Request</SelectItem>
                        <SelectItem value="maintenance">Maintenance Request</SelectItem>
                        <SelectItem value="account">Account Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-001">Suresh Tech</SelectItem>
                        <SelectItem value="tech-002">Amit Support</SelectItem>
                        <SelectItem value="tech-003">Vikram Field</SelectItem>
                        <SelectItem value="tech-004">Rahul Tech</SelectItem>
                        <SelectItem value="tech-005">Network Team</SelectItem>
                        <SelectItem value="tech-006">Hardware Team</SelectItem>
                        <SelectItem value="tech-007">Installation Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Issue Details</Label>
                  <Textarea 
                    placeholder="Describe the customer's issue in detail..." 
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Customer Contact</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Phone number" />
                    <Input placeholder="Email address" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowNewTicketDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Ticket className="w-4 h-4 mr-2" />
                    Create Ticket
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
            onClick={() => handleFilterChange("all", "status")}
            className={`${statusFilter === "all" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"}`}
          >
            All Tickets ({ticketData.length})
          </Button>
          <Button
            variant={statusFilter === "open" ? "default" : "outline"}
            onClick={() => handleFilterChange("open", "status")}
            className={`${statusFilter === "open" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"}`}
          >
            Open ({ticketData.filter(t => t.status === 'open').length})
          </Button>
          <Button
            variant={statusFilter === "in-progress" ? "default" : "outline"}
            onClick={() => handleFilterChange("in-progress", "status")}
            className={`${statusFilter === "in-progress" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"}`}
          >
            In Progress ({ticketData.filter(t => t.status === 'in-progress').length})
          </Button>
          <Button
            variant={statusFilter === "resolved" ? "default" : "outline"}
            onClick={() => handleFilterChange("resolved", "status")}
            className={`${statusFilter === "resolved" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"}`}
          >
            Resolved ({ticketData.filter(t => t.status === 'resolved').length})
          </Button>
          <Button
            variant={statusFilter === "closed" ? "default" : "outline"}
            onClick={() => handleFilterChange("closed", "status")}
            className={`${statusFilter === "closed" ? "bg-gray-600 hover:bg-gray-700" : "hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Closed ({ticketData.filter(t => t.status === 'closed').length})
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-blue-600" />
              Support Tickets
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
                placeholder="Search by ticket number, customer name, issue type, or assigned technician..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={priorityFilter} onValueChange={(value) => handleFilterChange(value, "priority")}>
                <SelectTrigger className="w-40">
                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div 
              className="h-[600px] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300/50 hover:scrollbar-thumb-gray-400/70 transition-colors duration-200"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
              }}
            >
              <Table className="min-w-[1200px] w-full">
                <TableHeader className="bg-gray-50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700 min-w-[120px] whitespace-nowrap px-4">Ticket Number</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[180px] whitespace-nowrap px-4">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[250px] whitespace-nowrap px-4">Issue Details</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[100px] whitespace-nowrap px-4">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[90px] whitespace-nowrap px-4">Time</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[140px] whitespace-nowrap px-4">Assigned To</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[110px] whitespace-nowrap px-4">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[90px] whitespace-nowrap px-4">Priority</TableHead>
                    <TableHead className="font-semibold text-gray-700 min-w-[120px] whitespace-nowrap px-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTickets.map((ticket) => {
                    const statusInfo = statusConfig[ticket.status as keyof typeof statusConfig];
                    const priorityInfo = priorityConfig[ticket.priority as keyof typeof priorityConfig];
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <TableRow key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-semibold text-blue-600 px-4 whitespace-nowrap">
                          {ticket.ticketNumber}
                        </TableCell>
                        <TableCell className="px-4">
                          <div className="min-w-[160px]">
                            <div className="font-semibold text-gray-900 truncate">{ticket.customerName}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <User className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{ticket.customerId}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4">
                          <div className="min-w-[230px] max-w-[280px]">
                            <div className="font-medium text-gray-900 truncate">{ticket.issueType}</div>
                            <div className="text-sm text-gray-600 truncate" title={ticket.issueDetails}>
                              {ticket.issueDetails.length > 60 
                                ? `${ticket.issueDetails.substring(0, 60)}...` 
                                : ticket.issueDetails}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 min-w-[80px]">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm">{new Date(ticket.createdDate).toLocaleDateString('en-IN')}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 min-w-[70px]">
                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm">{ticket.createdTime}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="font-medium text-sm truncate">{ticket.assignedTo}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                          <Badge className={`${statusInfo.color} flex items-center gap-1 w-fit text-xs`}>
                            <StatusIcon className="w-3 h-3 flex-shrink-0" />
                            <span className="whitespace-nowrap">{statusInfo.label}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                          <Badge className={`${priorityInfo.color} w-fit text-xs`}>
                            <span className="whitespace-nowrap">{priorityInfo.label}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 min-w-[100px]">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewTicket(ticket)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 h-8 w-8"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-1 h-8 w-8"
                              title="Edit Ticket"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 p-1 h-8 w-8"
                              title="Add Comment"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} results
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
                      className={`w-8 h-8 ${currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}`}
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

      {/* Ticket Details Dialog */}
      <Dialog open={showTicketDetails} onOpenChange={setShowTicketDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-blue-600" />
                  Ticket Details - {selectedTicket.ticketNumber}
                </DialogTitle>
                <DialogDescription>
                  Complete information and history for this support ticket
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Name</Label>
                        <p className="text-gray-900">{selectedTicket.customerName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Customer ID</Label>
                        <p className="text-gray-900">{selectedTicket.customerId}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Phone</Label>
                        <p className="text-gray-900 flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {selectedTicket.phone}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Email</Label>
                        <p className="text-gray-900 flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {selectedTicket.email}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Plan</Label>
                        <p className="text-gray-900 flex items-center gap-1">
                          <Wifi className="w-4 h-4" />
                          {selectedTicket.planType}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ticket Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-emerald-600" />
                        Ticket Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Issue Type</Label>
                        <p className="text-gray-900">{selectedTicket.issueType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Priority</Label>
                        <Badge className={`${priorityConfig[selectedTicket.priority as keyof typeof priorityConfig].color} w-fit`}>
                          {priorityConfig[selectedTicket.priority as keyof typeof priorityConfig].label}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <Badge className={`${statusConfig[selectedTicket.status as keyof typeof statusConfig].color} flex items-center gap-1 w-fit`}>
                          {React.createElement(statusConfig[selectedTicket.status as keyof typeof statusConfig].icon, { className: "w-3 h-3" })}
                          {statusConfig[selectedTicket.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Assigned To</Label>
                        <p className="text-gray-900">{selectedTicket.assignedTo}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Created</Label>
                        <p className="text-gray-900">{new Date(selectedTicket.createdDate).toLocaleDateString('en-IN')} at {selectedTicket.createdTime}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Issue Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-amber-600" />
                      Issue Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{selectedTicket.issueDetails}</p>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowTicketDetails(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Ticket
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}