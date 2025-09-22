import React, { useState, useCallback, useMemo } from "react";
import { 
  Users, 
  Plus, 
  Edit, 
  Eye, 
  Shield, 
  Calendar,
  Phone,
  User,
  Key,
  Package,
  Wifi,
  PlayCircle,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  CreditCard,
  History
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "./ui/pagination";


// Mock plan history data
const mockPlanHistory = {
  1: [
    { id: 'TXN001', date: '2024-01-15', status: 'Completed', plan: 'Premium Fiber 100Mbps', iptvStatus: 'Active', amount: '₹999' },
    { id: 'TXN002', date: '2023-12-15', status: 'Completed', plan: 'Smart Fiber 75Mbps', iptvStatus: 'Active', amount: '₹799' },
    { id: 'TXN003', date: '2023-11-15', status: 'Completed', plan: 'Basic Fiber 50Mbps', iptvStatus: 'Inactive', amount: '₹599' }
  ],
  2: [
    { id: 'TXN004', date: '2024-02-01', status: 'Completed', plan: 'Basic Fiber 50Mbps', iptvStatus: 'Active', amount: '₹599' },
    { id: 'TXN005', date: '2024-01-01', status: 'Completed', plan: 'Basic Fiber 50Mbps', iptvStatus: 'Active', amount: '₹599' }
  ],
  3: [
    { id: 'TXN006', date: '2023-12-01', status: 'Completed', plan: 'Ultra Fiber 200Mbps', iptvStatus: 'Active', amount: '₹1499' },
    { id: 'TXN007', date: '2023-11-01', status: 'Failed', plan: 'Ultra Fiber 200Mbps', iptvStatus: 'Active', amount: '₹1499' }
  ],
  4: [
    { id: 'TXN008', date: '2024-03-10', status: 'Completed', plan: 'Smart Fiber 75Mbps', iptvStatus: 'Active', amount: '₹799' },
    { id: 'TXN009', date: '2024-02-10', status: 'Completed', plan: 'Smart Fiber 75Mbps', iptvStatus: 'Active', amount: '₹799' }
  ],
  5: [
    { id: 'TXN010', date: '2024-04-01', status: 'Completed', plan: 'Enterprise Fiber 500Mbps', iptvStatus: 'Active', amount: '₹2499' },
    { id: 'TXN011', date: '2024-03-01', status: 'Completed', plan: 'Enterprise Fiber 500Mbps', iptvStatus: 'Active', amount: '₹2499' }
  ],
  6: [
    { id: 'TXN012', date: '2024-05-15', status: 'Completed', plan: 'Basic Fiber 50Mbps', iptvStatus: 'Active', amount: '₹599' }
  ],
  7: [
    { id: 'TXN013', date: '2023-11-20', status: 'Completed', plan: 'Premium Fiber 100Mbps', iptvStatus: 'Active', amount: '₹999' },
    { id: 'TXN014', date: '2023-10-20', status: 'Failed', plan: 'Premium Fiber 100Mbps', iptvStatus: 'Active', amount: '₹999' }
  ],
  8: [
    { id: 'TXN015', date: '2024-06-01', status: 'Completed', plan: 'Smart Fiber 75Mbps', iptvStatus: 'Active', amount: '₹799' },
    { id: 'TXN016', date: '2024-05-01', status: 'Completed', plan: 'Smart Fiber 75Mbps', iptvStatus: 'Active', amount: '₹799' }
  ],
  9: [
    { id: 'TXN017', date: '2024-07-10', status: 'Completed', plan: 'Ultra Fiber 200Mbps', iptvStatus: 'Active', amount: '₹1499' },
    { id: 'TXN018', date: '2024-06-10', status: 'Completed', plan: 'Ultra Fiber 200Mbps', iptvStatus: 'Active', amount: '₹1499' }
  ],
  10: [
    { id: 'TXN019', date: '2024-08-05', status: 'Completed', plan: 'Basic Fiber 50Mbps', iptvStatus: 'Active', amount: '₹599' }
  ],
  11: [
    { id: 'TXN020', date: '2023-10-15', status: 'Completed', plan: 'Premium Fiber 100Mbps', iptvStatus: 'Active', amount: '₹999' }
  ],
  12: [
    { id: 'TXN021', date: '2024-09-01', status: 'Completed', plan: 'Enterprise Fiber 500Mbps', iptvStatus: 'Active', amount: '₹2499' },
    { id: 'TXN022', date: '2024-08-01', status: 'Completed', plan: 'Enterprise Fiber 500Mbps', iptvStatus: 'Active', amount: '₹2499' }
  ],
  13: [
    { id: 'TXN023', date: '2024-10-12', status: 'Completed', plan: 'Smart Fiber 75Mbps', iptvStatus: 'Active', amount: '₹799' }
  ],
  14: [
    { id: 'TXN024', date: '2024-11-20', status: 'Completed', plan: 'Ultra Fiber 200Mbps', iptvStatus: 'Active', amount: '₹1499' }
  ]
};

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    planName: "Premium Fiber 100Mbps",
    status: "Active",
    startDate: "2024-01-15",
    expiryDate: "2025-01-15",
    mobile: "+91 9876543210",
    username: "rajesh_kumar",
    password: "R@j3sh2024",
    lco: "Mumbai Central LCO",
    quotaDays: 15,
    ottServices: ["Netflix", "Amazon Prime", "Disney+"],
    iptvStatus: "Active",
    iptvChannels: 150,
    email: "rajesh.kumar@email.com"
  },
  {
    id: 2,
    name: "Priya Sharma",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150&h=150&fit=crop&crop=face",
    planName: "Basic Fiber 50Mbps",
    status: "Active",
    startDate: "2024-02-01",
    expiryDate: "2025-02-01",
    mobile: "+91 9876543211",
    username: "priya_sharma",
    password: "Pri@2024!",
    lco: "Delhi North LCO",
    quotaDays: 28,
    ottServices: ["Netflix", "YouTube Premium"],
    iptvStatus: "Active",
    iptvChannels: 85,
    email: "priya.sharma@email.com"
  },
  {
    id: 3,
    name: "Amit Patel",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    planName: "Ultra Fiber 200Mbps",
    status: "Inactive",
    startDate: "2023-12-01",
    expiryDate: "2024-12-01",
    mobile: "+91 9876543212",
    username: "amit_patel",
    password: "Am!t@123",
    lco: "Bangalore South LCO",
    quotaDays: 0,
    ottServices: ["All Premium Channels"],
    iptvStatus: "Inactive",
    iptvChannels: 0,
    email: "amit.patel@email.com"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    planName: "Smart Fiber 75Mbps",
    status: "Active",
    startDate: "2024-03-10",
    expiryDate: "2025-03-10",
    mobile: "+91 9876543213",
    username: "sneha_reddy",
    password: "Sneha#456",
    lco: "Hyderabad East LCO",
    quotaDays: 45,
    ottServices: ["Netflix", "Hotstar", "SonyLiv"],
    iptvStatus: "Active",
    iptvChannels: 120,
    email: "sneha.reddy@email.com"
  },
  // Adding 10 new customers
  {
    id: 5,
    name: "Vikram Singh",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    planName: "Enterprise Fiber 500Mbps",
    status: "Active",
    startDate: "2024-04-01",
    expiryDate: "2025-04-01",
    mobile: "+91 9876543214",
    username: "vikram_singh",
    password: "Vikr@m789",
    lco: "Chennai West LCO",
    quotaDays: 60,
    ottServices: ["Netflix", "Amazon Prime", "Disney+", "Hotstar"],
    iptvStatus: "Active",
    iptvChannels: 200
  },
  {
    id: 6,
    name: "Anjali Gupta",
    profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    planName: "Basic Fiber 50Mbps",
    status: "Active",
    startDate: "2024-05-15",
    expiryDate: "2025-05-15",
    mobile: "+91 9876543215",
    username: "anjali_gupta",
    password: "Anj@li2024",
    lco: "Pune Central LCO",
    quotaDays: 22,
    ottServices: ["YouTube Premium", "Hotstar"],
    iptvStatus: "Active",
    iptvChannels: 75
  },
  {
    id: 7,
    name: "Rahul Verma",
    profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    planName: "Premium Fiber 100Mbps",
    status: "Inactive",
    startDate: "2023-11-20",
    expiryDate: "2024-11-20",
    mobile: "+91 9876543216",
    username: "rahul_verma",
    password: "Rahu1@567",
    lco: "Mumbai Central LCO",
    quotaDays: 0,
    ottServices: ["Netflix"],
    iptvStatus: "Inactive",
    iptvChannels: 0
  },
  {
    id: 8,
    name: "Kavita Joshi",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    planName: "Smart Fiber 75Mbps",
    status: "Active",
    startDate: "2024-06-01",
    expiryDate: "2025-06-01",
    mobile: "+91 9876543217",
    username: "kavita_joshi",
    password: "Kav!ta321",
    lco: "Delhi North LCO",
    quotaDays: 35,
    ottServices: ["Netflix", "SonyLiv", "YouTube Premium"],
    iptvStatus: "Active",
    iptvChannels: 110
  },
  {
    id: 9,
    name: "Deepak Mehta",
    profilePicture: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    planName: "Ultra Fiber 200Mbps",
    status: "Active",
    startDate: "2024-07-10",
    expiryDate: "2025-07-10",
    mobile: "+91 9876543218",
    username: "deepak_mehta",
    password: "Deep@k890",
    lco: "Bangalore South LCO",
    quotaDays: 40,
    ottServices: ["All Premium Channels", "Netflix"],
    iptvStatus: "Active",
    iptvChannels: 180
  },
  {
    id: 10,
    name: "Sunita Agarwal",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150&h=150&fit=crop&crop=face",
    planName: "Basic Fiber 50Mbps",
    status: "Active",
    startDate: "2024-08-05",
    expiryDate: "2025-08-05",
    mobile: "+91 9876543219",
    username: "sunita_agarwal",
    password: "Sun!ta456",
    lco: "Hyderabad East LCO",
    quotaDays: 25,
    ottServices: ["Hotstar", "YouTube Premium"],
    iptvStatus: "Active",
    iptvChannels: 90
  },
  {
    id: 11,
    name: "Arjun Nair",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    planName: "Premium Fiber 100Mbps",
    status: "Inactive",
    startDate: "2023-10-15",
    expiryDate: "2024-10-15",
    mobile: "+91 9876543220",
    username: "arjun_nair",
    password: "Arj@n123",
    lco: "Chennai West LCO",
    quotaDays: 0,
    ottServices: ["Netflix", "Amazon Prime"],
    iptvStatus: "Inactive",
    iptvChannels: 0
  },
  {
    id: 12,
    name: "Meera Kapoor",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    planName: "Enterprise Fiber 500Mbps",
    status: "Active",
    startDate: "2024-09-01",
    expiryDate: "2025-09-01",
    mobile: "+91 9876543221",
    username: "meera_kapoor",
    password: "Meer@789",
    lco: "Pune Central LCO",
    quotaDays: 55,
    ottServices: ["Netflix", "Amazon Prime", "Disney+", "Hotstar", "SonyLiv"],
    iptvStatus: "Active",
    iptvChannels: 250
  },
  {
    id: 13,
    name: "Sanjay Choudhary",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    planName: "Smart Fiber 75Mbps",
    status: "Active",
    startDate: "2024-10-12",
    expiryDate: "2025-10-12",
    mobile: "+91 9876543222",
    username: "sanjay_choudhary",
    password: "Sanj@y654",
    lco: "Mumbai Central LCO",
    quotaDays: 18,
    ottServices: ["Netflix", "Disney+", "YouTube Premium"],
    iptvStatus: "Active",
    iptvChannels: 135
  },
  {
    id: 14,
    name: "Pooja Desai",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150&h=150&fit=crop&crop=face",
    planName: "Ultra Fiber 200Mbps",
    status: "Active",
    startDate: "2024-11-20",
    expiryDate: "2025-11-20",
    mobile: "+91 9876543223",
    username: "pooja_desai",
    password: "Poo@ja987",
    lco: "Delhi North LCO",
    quotaDays: 8,
    ottServices: ["All Premium Channels", "Netflix", "Amazon Prime"],
    iptvStatus: "Active",
    iptvChannels: 190
  }
];

const lcoOptions = [
  "Mumbai Central LCO",
  "Delhi North LCO", 
  "Bangalore South LCO",
  "Hyderabad East LCO",
  "Chennai West LCO",
  "Pune Central LCO"
];

const planOptions = [
  "Basic Fiber 50Mbps",
  "Smart Fiber 75Mbps", 
  "Premium Fiber 100Mbps",
  "Ultra Fiber 200Mbps",
  "Enterprise Fiber 500Mbps"
];

interface UserDetailProps {
  user: typeof mockUsers[0];
  open: boolean;
  onClose: () => void;
}

const UserDetailModal = React.memo(({ user, open, onClose }: UserDetailProps) => {
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [editedPlan, setEditedPlan] = useState({
      planName: user.planName,
      startDate: user.startDate,
      expiryDate: user.expiryDate
    });

    const quotaStatus = useMemo(() => 
      user.quotaDays > 7 ? 'good' : user.quotaDays > 0 ? 'warning' : 'expired',
      [user.quotaDays]
    );
    const statusColor = user.status === 'Active' ? 'text-green-600' : 'text-red-600';
    const statusBgColor = user.status === 'Active' ? 'bg-green-100' : 'bg-red-100';

    // Get plan history for this user
    const planHistory = mockPlanHistory[user.id as keyof typeof mockPlanHistory] || [];

    const handleSaveDetails = () => {
      // Handle save user details logic
      console.log('Saving user details:', editedUser);
      setIsEditingDetails(false);
    };

    const handleSavePlan = () => {
      // Handle save plan logic
      console.log('Saving plan changes:', editedPlan);
      setIsEditingPlan(false);
    };

    return (
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-y-auto" style={{ maxWidth: '1300px' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">Customer Details & Plan Information</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            View detailed customer information, plan details, and service status for {user.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Customer Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-between items-center mb-4">
                <div></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingDetails(!isEditingDetails)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isEditingDetails ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              <div className="mx-auto mb-4 relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={editedUser.profilePicture || user.profilePicture} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {isEditingDetails && (
                  <div className="absolute -bottom-2 right-0">
                    <div className="relative">
                      <Input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileUrl = URL.createObjectURL(file);
                            setEditedUser({...editedUser, profilePicture: fileUrl});
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="profile-upload"
                      />
                      <label 
                        htmlFor="profile-upload"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              {isEditingDetails ? (
                <div className="space-y-3">
                  <Input
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    placeholder="Full Name"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveDetails} size="sm" className="bg-green-600 hover:bg-green-700 text-white">Save</Button>
                  </div>
                </div>
              ) : (
                <>
                  <CardTitle className="text-xl font-bold text-gray-900">{user.name}</CardTitle>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusBgColor} ${statusColor}`}>
                    {user.status === 'Active' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {user.status}
                  </div>
                </>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {isEditingDetails ? (
                <div className="space-y-3">
                  <Input
                    value={editedUser.mobile}
                    onChange={(e) => setEditedUser({...editedUser, mobile: e.target.value})}
                    placeholder="Mobile Number"
                  />
                  <Input
                    value={editedUser.email || ''}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    placeholder="Email Address"
                    type="email"
                  />

                  <Select 
                    value={editedUser.lco} 
                    onValueChange={(value) => setEditedUser({...editedUser, lco: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select LCO" />
                    </SelectTrigger>
                    <SelectContent>
                      {lcoOptions.map((lco) => (
                        <SelectItem key={lco} value={lco}>{lco}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">Address Proof</Label>
                    
                    {/* Show previously uploaded document if exists */}
                    {user.addressProof && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {user.addressProof.endsWith('.pdf') ? (
                              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 18h12V6l-4-4H4v16zm8-14v4h4l-4-4z"/>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Current Document</p>
                            <p className="text-xs text-gray-500">
                              {user.addressProof.split('/').pop() || 'address-proof'}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(user.addressProof, '_blank')}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Upload new document */}
                    <Input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Handle file upload here - in a real app this would upload to server
                          console.log('Address proof file:', file);
                          // Simulate upload by creating object URL for preview
                          const fileUrl = URL.createObjectURL(file);
                          setEditedUser({...editedUser, addressProof: fileUrl});
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {user.addressProof ? 'Upload new document to replace current one' : 'Supports PDF, PNG, JPG, JPEG files'}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{user.mobile}</span>
                  </div>
                  {user.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{user.lco}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Plan Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  Plan Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingPlan(!isEditingPlan)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isEditingPlan ? 'Cancel' : 'Edit Plan'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plan Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Plan</label>
                    {isEditingPlan ? (
                      <Select 
                        value={editedPlan.planName} 
                        onValueChange={(value) => setEditedPlan({...editedPlan, planName: value})}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {planOptions.map((plan) => (
                            <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Wifi className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-900">{user.planName}</span>
                        <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Plan Duration</label>
                    {isEditingPlan ? (
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div>
                          <Label className="text-xs text-gray-500">Start Date</Label>
                          <Input
                            type="date"
                            value={editedPlan.startDate}
                            onChange={(e) => setEditedPlan({...editedPlan, startDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Expiry Date</Label>
                          <Input
                            type="date"
                            value={editedPlan.expiryDate}
                            onChange={(e) => setEditedPlan({...editedPlan, expiryDate: e.target.value})}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-xs text-gray-500">Start Date</p>
                            <p className="font-semibold text-gray-900">{user.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="text-xs text-gray-500">Expiry Date</p>
                            <p className="font-semibold text-gray-900">{user.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {isEditingPlan && (
                      <div className="flex gap-2 mt-3">
                        <Button onClick={handleSavePlan} size="sm" className="bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Quota Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{user.quotaDays} days remaining</p>
                        <div className={`h-2 w-full rounded-full mt-1 ${
                          quotaStatus === 'good' ? 'bg-green-200' : 
                          quotaStatus === 'warning' ? 'bg-orange-200' : 'bg-red-200'
                        }`}>
                          <div 
                            className={`h-full rounded-full ${
                              quotaStatus === 'good' ? 'bg-green-600' : 
                              quotaStatus === 'warning' ? 'bg-orange-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${Math.max(0, Math.min(100, (user.quotaDays / 30) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OTT Services */}
                <div>
                  <label className="text-sm font-medium text-gray-500">OTT Activation Status</label>
                  <div className="mt-2 space-y-2">
                    {user.ottServices.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                          <PlayCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{service}</p>
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            <span>Active & Verified</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            <Star className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plan History Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <History className="w-4 h-4 text-white" />
                </div>
                Plan Recharge History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {planHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>IPTV Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {planHistory.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`${
                                transaction.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : transaction.status === 'Failed'
                                  ? 'bg-red-100 text-red-800 border-red-200'
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              }`}
                            >
                              {transaction.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {transaction.status === 'Failed' && <XCircle className="w-3 h-3 mr-1" />}
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{transaction.plan}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={`${
                                transaction.iptvStatus === 'Active' 
                                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                  : 'bg-gray-100 text-gray-800 border-gray-200'
                              }`}
                            >
                              <PlayCircle className="w-3 h-3 mr-1" />
                              {transaction.iptvStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{transaction.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No recharge history available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}

      </DialogContent>
    </Dialog>
  );
});

UserDetailModal.displayName = "UserDetailModal";

interface UserManagementProps {
  userFilter: 'all' | 'active' | 'inactive';
}

type QuickFilterType = 'all' | 'active' | 'inactive' | 'expiring';

export function UserManagement({ userFilter }: UserManagementProps) {
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | null>(null);
  const [changingPlan, setChangingPlan] = useState<typeof mockUsers[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [newUser, setNewUser] = useState({
    name: "",
    mobile: "",
    email: "",
    lco: "",
    plan: "",
    profilePicture: "",
    iptvEnabled: false,
    iptvSubscription: "" as "basic" | "pro" | "premium" | "",
    addressProof: null as File | null
  });

  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");

  const USERS_PER_PAGE = 10;

  // Filter users based on status, quick filter and search term
  const filteredUsers = useMemo(() => {
    let users = mockUsers;
    
    // Apply main status filter from sidebar
    if (userFilter === 'active') {
      users = users.filter(user => user.status === 'Active');
    } else if (userFilter === 'inactive') {
      users = users.filter(user => user.status === 'Inactive');
    }
    
    // Apply quick filter
    if (quickFilter === 'active') {
      users = users.filter(user => user.status === 'Active');
    } else if (quickFilter === 'inactive') {
      users = users.filter(user => user.status === 'Inactive');
    } else if (quickFilter === 'expiring') {
      users = users.filter(user => user.quotaDays <= 7 && user.quotaDays > 0);
    }
    
    // Apply search filter
    if (searchTerm) {
      users = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm) ||
        user.planName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return users;
  }, [userFilter, quickFilter, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [userFilter, quickFilter, searchTerm]);

  const handleAddUser = useCallback(() => {
    // Handle add user logic here
    console.log("Adding new user:", newUser);
    console.log("Profile picture file:", profilePictureFile);
    console.log("Address proof file:", newUser.addressProof);
    setShowAddUser(false);
    setNewUser({ 
      name: "", 
      mobile: "", 
      email: "", 
      lco: "", 
      plan: "", 
      profilePicture: "",
      iptvEnabled: false,
      iptvSubscription: "",
      addressProof: null
    });
    setProfilePictureFile(null);
    setProfilePicturePreview("");
  }, [newUser, profilePictureFile]);

  const handleProfilePictureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAddressProofChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        setNewUser({ ...newUser, addressProof: file });
      } else {
        alert('Please upload only PDF, PNG, or JPEG files for address proof.');
      }
    }
  }, [newUser]);

  const handleUserSelect = useCallback((user: typeof mockUsers[0]) => {
    setSelectedUser(user);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const handleEditUser = useCallback((user: typeof mockUsers[0]) => {
    setEditingUser(user);
  }, []);

  const handleChangePlan = useCallback((user: typeof mockUsers[0]) => {
    setChangingPlan(user);
  }, []);

  const handleSavePlanChange = useCallback((newPlan: string) => {
    if (changingPlan) {
      // Here you would typically update the user's plan in your backend
      console.log(`Changing plan for ${changingPlan.name} to ${newPlan}`);
      setChangingPlan(null);
    }
  }, [changingPlan]);

  const handleSaveUserEdit = useCallback(() => {
    if (editingUser) {
      // Here you would typically save the user changes to your backend
      console.log("Saving user changes:", editingUser);
      setEditingUser(null);
    }
  }, [editingUser]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleQuickFilterChange = useCallback((filter: QuickFilterType) => {
    setQuickFilter(filter);
  }, []);

  const getQuickFilterCounts = useMemo(() => {
    const allUsers = userFilter === 'all' ? mockUsers : 
                     userFilter === 'active' ? mockUsers.filter(u => u.status === 'Active') :
                     mockUsers.filter(u => u.status === 'Inactive');
    
    return {
      all: allUsers.length,
      active: allUsers.filter(u => u.status === 'Active').length,
      inactive: allUsers.filter(u => u.status === 'Inactive').length,
      expiring: allUsers.filter(u => u.quotaDays <= 7 && u.quotaDays > 0).length,
    };
  }, [userFilter]);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );

    // First page and ellipsis
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
            className="cursor-pointer"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              User Management
              {userFilter !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    userFilter === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {userFilter === 'active' ? 'Active Only' : 'Inactive Only'}
                </Badge>
              )}
            </h1>
            <p className="text-gray-600 mt-1">
              {userFilter === 'all' && 'Manage customer accounts, plans, and services'}
              {userFilter === 'active' && 'Showing active customers only'}
              {userFilter === 'inactive' && 'Showing inactive customers only'}
            </p>
          </div>
          
          {/* Add New User Button */}
          <Dialog open={showAddUser} onOpenChange={(open) => setShowAddUser(open)}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-h-[90vh] overflow-y-auto" style={{ maxWidth: '1200px' }}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  Add New Customer
                </DialogTitle>
                <DialogDescription>
                  Create a new customer account with complete profile information, plan selection, and document uploads.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                {/* Profile Picture Upload Section */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-3">Profile Picture</h3>
                  <div className="flex flex-col sm:flex-row lg:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      {profilePicturePreview ? (
                        <img
                          src={profilePicturePreview}
                          alt="Profile preview"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-12 h-12 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="profilePictureFile">Upload Profile Picture</Label>
                      <Input
                        id="profilePictureFile"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-sm text-gray-500">Accepted formats: JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="Enter customer full name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        value={newUser.mobile}
                        onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                        placeholder="+91 XXXXXXXXXX"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="customer@email.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lco">LCO Assignment *</Label>
                      <Select value={newUser.lco} onValueChange={(value) => setNewUser({ ...newUser, lco: value })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select LCO" />
                        </SelectTrigger>
                        <SelectContent>
                          {lcoOptions.map((lco) => (
                            <SelectItem key={lco} value={lco}>{lco}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Plan & Services Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Plan & Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="plan">Select Plan *</Label>
                      <Select value={newUser.plan} onValueChange={(value) => setNewUser({ ...newUser, plan: value })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {planOptions.map((plan) => (
                            <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>IPTV Service</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="iptvEnabled"
                          checked={newUser.iptvEnabled}
                          onChange={(e) => setNewUser({ 
                            ...newUser, 
                            iptvEnabled: e.target.checked,
                            iptvSubscription: e.target.checked ? newUser.iptvSubscription : ""
                          })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <Label htmlFor="iptvEnabled" className="text-sm font-medium text-gray-900">
                          Enable IPTV Service
                        </Label>
                      </div>
                      {newUser.iptvEnabled && (
                        <div>
                          <Label htmlFor="iptvSubscription">IPTV Subscription Plan</Label>
                          <Select 
                            value={newUser.iptvSubscription} 
                            onValueChange={(value) => setNewUser({ ...newUser, iptvSubscription: value as "basic" | "pro" | "premium" })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select IPTV plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">
                                <div className="flex flex-col">
                                  <span className="font-medium">Basic</span>
                                  <span className="text-xs text-gray-500">85+ Channels</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="pro">
                                <div className="flex flex-col">
                                  <span className="font-medium">Pro</span>
                                  <span className="text-xs text-gray-500">150+ Channels + HD</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="premium">
                                <div className="flex flex-col">
                                  <span className="font-medium">Premium</span>
                                  <span className="text-xs text-gray-500">250+ Channels + 4K + Sports</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Document Upload</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="addressProof">Address Proof *</Label>
                      <Input
                        id="addressProof"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleAddressProofChange}
                        className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">PDF</Badge>
                        <Badge variant="outline" className="text-xs">PNG</Badge>
                        <Badge variant="outline" className="text-xs">JPEG</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload government issued address proof (Aadhaar, Voter ID, Passport, etc.)
                      </p>
                    </div>
                    
                    {newUser.addressProof && (
                      <div className="flex items-start lg:items-center">
                        <div className="w-full p-3 bg-green-50 rounded-lg flex items-center gap-3 border border-green-200">
                          <div className="flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-green-800 truncate">
                              {newUser.addressProof.name}
                            </p>
                            <p className="text-xs text-green-600">
                              File uploaded successfully
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center gap-3 mt-6 pt-6 border-t">
                <div className="text-sm text-gray-500">
                  * Required fields
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddUser} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!newUser.name || !newUser.mobile || !newUser.email || !newUser.lco || !newUser.plan || !newUser.addressProof}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Customer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Access Filters */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={quickFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickFilterChange('all')}
                className={`${
                  quickFilter === 'all' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                    : 'text-gray-900 border-gray-300 hover:bg-gray-100 bg-white'
                }`}
              >
                All Users
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    quickFilter === 'all' 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {getQuickFilterCounts.all}
                </Badge>
              </Button>
              
              <Button
                variant={quickFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickFilterChange('active')}
                className={`${
                  quickFilter === 'active' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                    : 'text-gray-900 border-gray-300 hover:bg-gray-100 bg-white'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    quickFilter === 'active' 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {getQuickFilterCounts.active}
                </Badge>
              </Button>
              
              <Button
                variant={quickFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickFilterChange('inactive')}
                className={`${
                  quickFilter === 'inactive' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                    : 'text-gray-900 border-gray-300 hover:bg-gray-100 bg-white'
                }`}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Inactive
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    quickFilter === 'inactive' 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {getQuickFilterCounts.inactive}
                </Badge>
              </Button>
              
              <Button
                variant={quickFilter === 'expiring' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickFilterChange('expiring')}
                className={`${
                  quickFilter === 'expiring' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                    : 'text-gray-900 border-gray-300 hover:bg-gray-100 bg-white'
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                Expiring Soon
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    quickFilter === 'expiring' 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {getQuickFilterCounts.expiring}
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Input
              placeholder="Search customers by name, mobile, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>
                {userFilter === 'all' && `All Customers (${filteredUsers.length})`}
                {userFilter === 'active' && `Active Customers (${filteredUsers.length})`}
                {userFilter === 'inactive' && `Inactive Customers (${filteredUsers.length})`}
              </span>
              {filteredUsers.length > USERS_PER_PAGE && (
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {userFilter === 'all' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {filteredUsers.filter(u => u.status === 'Active').length} Active
                </Badge>
              )}
              {userFilter === 'active' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  All Active Users
                </Badge>
              )}
              {userFilter === 'inactive' && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  All Inactive Users
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IPTV Status</TableHead>
                  <TableHead>Plan Period</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Credentials</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.profilePicture} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <button
                            onClick={() => handleUserSelect(user)}
                            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors text-[16px]"
                          >
                            {user.name}
                          </button>
                          <p className="text-sm text-gray-500">{user.lco}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{user.planName}</p>

                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'destructive'}
                        className={user.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                      >
                        {user.status === 'Active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.iptvStatus === 'Active' ? 'default' : 'destructive'}
                        className={user.iptvStatus === 'Active' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : ''}
                      >
                        {user.iptvStatus === 'Active' ? (
                          <PlayCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.iptvStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-[14px]"><strong>Start:</strong> {user.startDate}</p>
                        <p className="text-[14px]"><strong>Expiry:</strong> {user.expiryDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium text-[14px]">{user.mobile}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-[14px]"><strong>User:</strong> {user.username}</p>
                        <p className="text-[14px]"><strong>Pass:</strong> {user.password}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t bg-gray-50/50">
            <Pagination>
              <PaginationContent>
                {renderPaginationItems()}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          key={selectedUser.id}
          user={selectedUser}
          open={selectedUser !== null}
          onClose={handleCloseModal}
        />
      )}

      {/* Plan Change Dialog */}
      {changingPlan && (
        <Dialog open={changingPlan !== null} onOpenChange={(open) => !open && setChangingPlan(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                Change Plan for {changingPlan.name}
              </DialogTitle>
              <DialogDescription>
                Select a new plan and billing period for the customer. Changes will take effect immediately.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Current Plan Info */}
              <div>
                <Label>Current Plan</Label>
                <div className="p-4 bg-gray-50 rounded-lg border mt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{changingPlan.planName}</p>
                      <p className="text-sm text-gray-500">Active until {changingPlan.expiryDate}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* New Plan Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPlan">Select New Plan</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {planOptions.map((plan) => (
                        <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="planPeriod">Plan Period</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month - ₹299</SelectItem>
                      <SelectItem value="2">2 Months - ₹598</SelectItem>
                      <SelectItem value="3">3 Months - ₹897</SelectItem>
                      <SelectItem value="6">6 Months - ₹1,794</SelectItem>
                      <SelectItem value="12">12 Months - ₹3,588</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Plan Summary */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Plan Change Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>New Plan:</span>
                    <span className="font-medium">Premium Fiber 100Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing Period:</span>
                    <span className="font-medium">3 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium">₹897</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Expiry Date:</span>
                    <span className="font-medium">March 16, 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setChangingPlan(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  console.log("Plan changed successfully!");
                  setChangingPlan(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Confirm Change
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Edit className="w-4 h-4 text-white" />
                </div>
                Edit Customer - {editingUser.name}
              </DialogTitle>
              <DialogDescription>
                Update customer table information including contact details, plan periods, and account settings.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editPlan">Plan Name</Label>
                  <Select value={editingUser.planName} onValueChange={(value) => setEditingUser({ ...editingUser, planName: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {planOptions.map((plan) => (
                        <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="editStatus">Account Status</Label>
                  <Select value={editingUser.status} onValueChange={(value) => setEditingUser({ ...editingUser, status: value as 'Active' | 'Inactive' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="editIptvStatus">IPTV Status</Label>
                  <Select value={editingUser.iptvStatus} onValueChange={(value) => setEditingUser({ ...editingUser, iptvStatus: value as 'Active' | 'Inactive' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editStartDate">Plan Start Date</Label>
                  <Input
                    id="editStartDate"
                    type="date"
                    value={editingUser.startDate}
                    onChange={(e) => setEditingUser({ ...editingUser, startDate: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="editExpiryDate">Plan Expiry Date</Label>
                  <Input
                    id="editExpiryDate"
                    type="date"
                    value={editingUser.expiryDate}
                    onChange={(e) => setEditingUser({ ...editingUser, expiryDate: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="editMobile">Mobile Number</Label>
                  <Input
                    id="editMobile"
                    value={editingUser.mobile}
                    onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="editUsername">Username</Label>
                    <Input
                      id="editUsername"
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                      placeholder="Enter username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="editPassword">Password</Label>
                    <Input
                      id="editPassword"
                      value={editingUser.password}
                      onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUserEdit} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Bottom padding */}
      <div className="pb-6 lg:pb-8"></div>
    </div>
  );
}