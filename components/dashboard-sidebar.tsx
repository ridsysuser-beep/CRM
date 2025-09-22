import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  Wallet,
  CreditCard,
  Receipt,
  Ticket,
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Router,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: string[];
}

interface DashboardSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
  activeSection: string;
  onSectionChange: (section: string, subsection?: string) => void;
}

const menuItems: MenuItem[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
    label: "Dashboard",
  },
  {
    icon: <Users className="h-5 w-5 flex-shrink-0" />,
    label: "Users",
    hasSubmenu: true,
    submenuItems: ["All Users", "Active Users", "Inactive Users"],
  },
  {
    icon: <Package className="h-5 w-5 flex-shrink-0" />,
    label: "Packages",
    hasSubmenu: true,
    submenuItems: ["All Packages", "Package Analytics"],
  },
  {
    icon: <Wallet className="h-5 w-5 flex-shrink-0" />,
    label: "Wallet Recharge",
    hasSubmenu: true,
    submenuItems: ["Wallet Recharge", "Report"],
  },
  {
    icon: <Receipt className="h-5 w-5 flex-shrink-0" />,
    label: "Billing",
  },
  {
    icon: <Ticket className="h-5 w-5 flex-shrink-0" />,
    label: "Tickets",
  },
  {
    icon: <FileText className="h-5 w-5 flex-shrink-0" />,
    label: "Report",
  },
];

export function DashboardSidebar({ collapsed, mobileOpen, onToggle, onMobileClose, activeSection, onSectionChange }: DashboardSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    if (collapsed) return; // Prevent expanding in collapsed mode
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const sidebarWidth = collapsed ? "w-16" : "w-64";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`${sidebarWidth} bg-white border-r border-gray-200 h-screen flex-col transition-all duration-300 ease-in-out hidden lg:flex overflow-hidden relative shadow-sm`}>
        {/* Collapse button - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Header with admin profile icon and title */}
        <div className="p-4 border-b border-gray-200 pt-12.5">
          {!collapsed ? (
            <div className="flex flex-col items-center space-y-3 pr-12">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300/30">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-gray-900 text-lg font-semibold">Operator Panel</h2>
                <p className="text-blue-600 text-xs">Operator</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-2 pb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 border-2 border-blue-300/30">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>
        
        <ScrollArea className="flex-1 p-2 overflow-y-auto">
          <TooltipProvider>
            <nav className="space-y-2 pb-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`w-12 h-12 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 ${
                            (item.label.toLowerCase() === activeSection || 
                             (item.label === "Wallet Recharge" && (activeSection === "wallet-recharge" || activeSection === "wallet-report"))) ? "bg-blue-100 text-blue-700" : ""
                          }`}
                          onClick={() => {
                            onSectionChange(item.label.toLowerCase());
                          }}
                        >
                          {item.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 ${
                        (item.label.toLowerCase() === activeSection || 
                         (item.label === "Wallet Recharge" && (activeSection === "wallet-recharge" || activeSection === "wallet-report"))) ? "bg-blue-100 text-blue-700 font-semibold" : ""
                      }`}
                      onClick={() => {
                        // Always navigate to the section
                        onSectionChange(item.label.toLowerCase());
                        // Also toggle submenu if it exists
                        if (item.hasSubmenu) {
                          toggleExpanded(item.label);
                        }
                      }}
                    >
                      {item.icon}
                      <span className="ml-3 flex-1 text-left truncate">{item.label}</span>
                      {item.hasSubmenu && (
                        <div className="ml-auto flex-shrink-0">
                          {expandedItems.includes(item.label) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      )}
                    </Button>
                  )}
                  
                  {item.hasSubmenu && expandedItems.includes(item.label) && !collapsed && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenuItems?.map((subItem) => (
                        <Button
                          key={subItem}
                          variant="ghost"
                          className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm transition-colors duration-200"
                          onClick={() => {
                            // Navigate to parent section with subsection info
                            onSectionChange(item.label.toLowerCase(), subItem);
                          }}
                        >
                          <span className="truncate">{subItem}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </TooltipProvider>
        </ScrollArea>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden shadow-xl ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header with close button */}
        <div className="p-4 border-b border-gray-200 relative pt-12.5">
          {/* Close button - Top Right */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Admin profile icon and title */}
          <div className="flex items-center space-x-3 pr-12">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300/30">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 text-lg font-semibold">Operator Panel</h2>
              <p className="text-blue-600 text-xs">Operator</p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2 pb-4">
            {menuItems.map((item) => (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 ${
                    (item.label.toLowerCase() === activeSection || 
                     (item.label === "Wallet Recharge" && (activeSection === "wallet-recharge" || activeSection === "wallet-report"))) ? "bg-blue-100 text-blue-700 font-semibold" : ""
                  }`}
                  onClick={() => {
                    // Always navigate to the section
                    onSectionChange(item.label.toLowerCase());
                    // Also toggle submenu if it exists
                    if (item.hasSubmenu) {
                      toggleExpanded(item.label);
                    } else {
                      onMobileClose();
                    }
                  }}
                >
                  {item.icon}
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && (
                    <div className="ml-auto">
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      
                      )}
                    </div>
                  )}
                </Button>
                
                {item.hasSubmenu && expandedItems.includes(item.label) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenuItems?.map((subItem) => (
                      <Button
                        key={subItem}
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm transition-colors duration-200"
                        onClick={() => {
                          // Navigate to parent section with subsection info
                          onSectionChange(item.label.toLowerCase(), subItem);
                          onMobileClose();
                        }}
                      >
                        {subItem}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </>
  );
}