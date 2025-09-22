import { Search, Bell, User, Menu, Settings, LogOut, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  onToggleMobileMenu: () => void;
  sidebarCollapsed: boolean;
  onLogout: () => void;
}

export function DashboardHeader({ onToggleSidebar, onToggleMobileMenu, sidebarCollapsed, onLogout }: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New User Registration",
      message: "John Smith has registered with Premium plan",
      time: "2 minutes ago",
      unread: true
    },
    {
      id: 2,
      title: "Payment Received",
      message: "₹2,499 received from Priya Sharma",
      time: "5 minutes ago",
      unread: true
    },
    {
      id: 3,
      title: "Plan Expiry Alert",
      message: "3 users' plans expiring tomorrow",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 4,
      title: "System Maintenance",
      message: "Scheduled maintenance completed successfully",
      time: "2 hours ago",
      unread: false
    },
    {
      id: 5,
      title: "New Support Ticket",
      message: "Ticket #1234 requires attention",
      time: "3 hours ago",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 py-4 sm:py-5 lg:py-6 shadow-sm">
      <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 max-w-2xl">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMobileMenu}
            className="mr-2 lg:hidden hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Search */}
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by username or mobile number..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100 transition-colors duration-200"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                    Mark all read
                  </Button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-l-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      notification.unread ? 'border-l-blue-500 bg-blue-50/30' : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm ${notification.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t bg-gray-50">
                <Button variant="ghost" size="sm" className="w-full text-center text-blue-600 hover:text-blue-700">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-100 transition-colors duration-200 px-2">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">admin@dashboard.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600" 
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}