import React, { useState, useCallback } from "react";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Wifi,
  Clock,
  CreditCard,
  Users,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "./ui/pagination";

// Mock package data
const mockPackages = [
  {
    id: 1,
    packageName: "Basic Fiber 50Mbps",
    status: "Active",
    internetSpeed: "50 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 599,
    tax: 107.82,
    lcoAmount: 419.30,
    msoAmount: 179.70,
    customerAmount: 706.82,
    type: "Prepaid",
    activeUsers: 156,
    description: "Basic high-speed internet for everyday use"
  },
  {
    id: 2,
    packageName: "Smart Fiber 75Mbps",
    status: "Active",
    internetSpeed: "75 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 799,
    tax: 143.82,
    lcoAmount: 559.30,
    msoAmount: 239.70,
    customerAmount: 942.82,
    type: "Prepaid",
    activeUsers: 243,
    description: "Enhanced speed for streaming and gaming"
  },
  {
    id: 3,
    packageName: "Premium Fiber 100Mbps",
    status: "Active",
    internetSpeed: "100 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 999,
    tax: 179.82,
    lcoAmount: 699.30,
    msoAmount: 299.70,
    customerAmount: 1178.82,
    type: "Postpaid",
    activeUsers: 412,
    description: "Premium speed for heavy usage and multiple devices"
  },
  {
    id: 4,
    packageName: "Ultra Fiber 200Mbps",
    status: "Active",
    internetSpeed: "200 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 1499,
    tax: 269.82,
    lcoAmount: 1049.30,
    msoAmount: 449.70,
    customerAmount: 1768.82,
    type: "Postpaid",
    activeUsers: 178,
    description: "Ultra-fast speed for professional use and large families"
  },
  {
    id: 5,
    packageName: "Enterprise Fiber 500Mbps",
    status: "Active",
    internetSpeed: "500 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 2499,
    tax: 449.82,
    lcoAmount: 1749.30,
    msoAmount: 749.70,
    customerAmount: 2948.82,
    type: "Postpaid",
    activeUsers: 89,
    description: "Enterprise-grade speed for businesses and power users"
  },
  {
    id: 6,
    packageName: "Student Basic 25Mbps",
    status: "Inactive",
    internetSpeed: "25 Mbps",
    validity: "30 Days",
    dataLimit: "500 GB",
    price: 399,
    tax: 71.82,
    lcoAmount: 279.30,
    msoAmount: 119.70,
    customerAmount: 470.82,
    type: "Prepaid",
    activeUsers: 0,
    description: "Budget-friendly plan for students"
  },
  {
    id: 7,
    packageName: "Gaming Pro 150Mbps",
    status: "Active",
    internetSpeed: "150 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 1299,
    tax: 233.82,
    lcoAmount: 909.30,
    msoAmount: 389.70,
    customerAmount: 1532.82,
    type: "Prepaid",
    activeUsers: 167,
    description: "Optimized for gaming with low latency"
  },
  {
    id: 8,
    packageName: "Family Pack 80Mbps",
    status: "Active",
    internetSpeed: "80 Mbps",
    validity: "30 Days",
    dataLimit: "Unlimited",
    price: 899,
    tax: 161.82,
    lcoAmount: 629.30,
    msoAmount: 269.70,
    customerAmount: 1060.82,
    type: "Postpaid",
    activeUsers: 298,
    description: "Perfect for families with multiple streaming devices"
  }
];

interface AddPlanModalProps {
  open: boolean;
  onClose: () => void;
}

const AddPlanModal = ({ open, onClose }: AddPlanModalProps) => {
  const [newPlan, setNewPlan] = useState({
    packageName: '',
    internetSpeed: '',
    validity: '30',
    dataLimit: 'Unlimited',
    price: '',
    type: 'Prepaid',
    description: ''
  });

  const handleSave = () => {
    console.log('Saving new plan:', newPlan);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            Add New Plan
          </DialogTitle>
          <DialogDescription>
            Create a new internet plan with detailed pricing and specifications.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Package Name</Label>
              <Input
                value={newPlan.packageName}
                onChange={(e) => setNewPlan({...newPlan, packageName: e.target.value})}
                placeholder="e.g., Premium Fiber 100Mbps"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Internet Speed</Label>
              <Input
                value={newPlan.internetSpeed}
                onChange={(e) => setNewPlan({...newPlan, internetSpeed: e.target.value})}
                placeholder="e.g., 100 Mbps"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Validity (Days)</Label>
              <Select value={newPlan.validity} onValueChange={(value) => setNewPlan({...newPlan, validity: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="365">365 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Data Limit</Label>
              <Select value={newPlan.dataLimit} onValueChange={(value) => setNewPlan({...newPlan, dataLimit: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unlimited">Unlimited</SelectItem>
                  <SelectItem value="100 GB">100 GB</SelectItem>
                  <SelectItem value="500 GB">500 GB</SelectItem>
                  <SelectItem value="1 TB">1 TB</SelectItem>
                  <SelectItem value="2 TB">2 TB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Base Price (₹)</Label>
              <Input
                type="number"
                value={newPlan.price}
                onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                placeholder="999"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Plan Type</Label>
              <Select value={newPlan.type} onValueChange={(value) => setNewPlan({...newPlan, type: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prepaid">Prepaid</SelectItem>
                  <SelectItem value="Postpaid">Postpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <textarea
                value={newPlan.description}
                onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                placeholder="Brief description of the plan features..."
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Pricing Breakdown Preview */}
        {newPlan.price && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Pricing Breakdown Preview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">₹{newPlan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%):</span>
                <span className="font-medium">₹{(parseFloat(newPlan.price) * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">LCO Amount (70%):</span>
                <span className="font-medium">₹{(parseFloat(newPlan.price) * 0.70).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">MSO Amount (30%):</span>
                <span className="font-medium">₹{(parseFloat(newPlan.price) * 0.30).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-600 col-span-2 pt-2 border-t">
                <span>Total Customer Amount:</span>
                <span>₹{(parseFloat(newPlan.price) * 1.18).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            Create Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function PackageManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'prepaid' | 'postpaid'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const itemsPerPage = 8;

  const filteredPackages = mockPackages.filter(pkg => {
    const matchesSearch = pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pkg.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || pkg.type.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (packageId: number) => {
    console.log('Edit package:', packageId);
  };

  const handleDelete = (packageId: number) => {
    console.log('Delete package:', packageId);
  };

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            Package Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">Manage internet plans, pricing, and package details</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Plan
        </Button>
      </div>



      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search plans by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                  <SelectItem value="postpaid">Postpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Internet Plans & Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Data Limit</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>LCO Amount</TableHead>
                  <TableHead>MSO Amount</TableHead>
                  <TableHead>Customer Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Active Users</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPackages.map((pkg) => (
                  <TableRow key={pkg.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{pkg.packageName}</div>
                        <div className="text-sm text-gray-500">{pkg.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={pkg.status === 'Active' ? 'default' : 'secondary'}
                        className={pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {pkg.status === 'Active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {pkg.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{pkg.internetSpeed}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{pkg.validity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={pkg.dataLimit === 'Unlimited' ? 'text-green-600 font-medium' : 'text-gray-600'}>
                        {pkg.dataLimit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">₹{pkg.price}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">₹{pkg.tax.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-600 font-medium">₹{pkg.lcoAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-purple-600 font-medium">₹{pkg.msoAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-green-600">₹{pkg.customerAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={pkg.type === 'Prepaid' ? 'text-blue-600 border-blue-200' : 'text-orange-600 border-orange-200'}>
                        {pkg.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{pkg.activeUsers}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(pkg.id)}
                          className="h-7 p-0 text-green-600 hover:text-green-800"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(pkg.id)}
                          className="h-7 p-0 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Plan Modal */}
      <AddPlanModal 
        open={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />

      {/* Add bottom padding */}
      <div className="pb-6 lg:pb-8"></div>
    </div>
  );
}