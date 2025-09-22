import { useState, useCallback } from "react";
import { Network } from "lucide-react";
import { Login } from "./components/login";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { DashboardHeader } from "./components/dashboard-header";
import { SummaryCards } from "./components/summary-cards";
import { SubscriberCards } from "./components/subscriber-cards";
import { RevenueChart } from "./components/revenue-chart";
import { PlanChart } from "./components/plan-chart";
import { UserManagement } from "./components/user-management";
import { PackageManagement } from "./components/package-management";
import { PackageAnalytics } from "./components/package-analytics";
import { WalletRecharge } from "./components/wallet-recharge";
import { WalletReport } from "./components/wallet-report";
import { BillingManagement } from "./components/billing-management";
import { TicketManagement } from "./components/ticket-management";
import { Reports } from "./components/reports";
import { UserAnalyticsChart } from "./components/user-analytics-chart";
import { NetworkPerformanceOverview } from "./components/network-performance-overview";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userFilter, setUserFilter] = useState<"all" | "active" | "inactive">("all");
  const [packageSubsection, setPackageSubsection] = useState<string>("all");

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleSectionChange = useCallback((section: string, subsection?: string) => {
    // Handle wallet recharge section mapping
    if (section === "wallet recharge") {
      if (subsection === "Wallet Recharge") {
        setActiveSection("wallet-recharge");
      } else if (subsection === "Report") {
        setActiveSection("wallet-report");
      } else {
        setActiveSection("wallet-recharge"); // Default to wallet recharge
      }
      return;
    }

    setActiveSection(section);

    if (section === "users" && subsection) {
      switch (subsection) {
        case "All Users":
          setUserFilter("all");
          break;
        case "Active Users":
          setUserFilter("active");
          break;
        case "Inactive Users":
          setUserFilter("inactive");
          break;
        default:
          setUserFilter("all");
      }
    } else if (section === "users") {
      setUserFilter("all");
    }

    if (section === "packages" && subsection) {
      switch (subsection) {
        case "All Packages":
          setPackageSubsection("all");
          break;
        case "Package Analytics":
          setPackageSubsection("analytics");
          break;
        default:
          setPackageSubsection("all");
      }
    } else if (section === "packages") {
      setPackageSubsection("all");
    }
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setActiveSection("dashboard");
    setUserFilter("all");
    setPackageSubsection("all");
    setSidebarCollapsed(false);
    setMobileMenuOpen(false);
  }, []);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onToggle={toggleSidebar}
        onMobileClose={handleMobileClose}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Fixed Header */}
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          onToggleMobileMenu={toggleMobileMenu}
          sidebarCollapsed={sidebarCollapsed}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Dashboard Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {activeSection === "dashboard" && (
            <div className="max-w-none 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
              {/* ISP Operator Dashboard Header */}
              <div className="mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Network className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      ISP Operator Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Comprehensive overview of your internet service operations
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Network Status: Online</span>
                  </div>
                </div>

                {/* Primary KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  {/* Total Subscribers */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Subscribers</p>
                        <p className="text-2xl sm:text-3xl font-bold">47,892</p>
                        <div className="flex items-center mt-1">
                          <svg className="w-3 h-3 text-blue-200 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <p className="text-blue-200 text-sm">+2.4% this month</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Revenue */}
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-4 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm">Monthly Revenue</p>
                        <p className="text-2xl sm:text-3xl font-bold">₹28.5L</p>
                        <div className="flex items-center mt-1">
                          <svg className="w-3 h-3 text-emerald-200 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <p className="text-emerald-200 text-sm">+18.2% from last month</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Net Profit */}
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-4 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100 text-sm">Net Profit</p>
                        <p className="text-2xl sm:text-3xl font-bold">₹9.8L</p>
                        <div className="flex items-center mt-1">
                          <svg className="w-3 h-3 text-amber-200 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <p className="text-amber-200 text-sm">34.4% profit margin</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Active Connections */}
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Active Connections</p>
                        <p className="text-2xl sm:text-3xl font-bold">44,267</p>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-purple-200 rounded-full mr-1"></div>
                          <p className="text-purple-200 text-sm">92.4% uptime</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Performance Overview */}
                <div className="mb-8">
                  <NetworkPerformanceOverview />
                </div>

                {/* Detailed Analytics Overview */}
                <div className="space-y-8 mb-8">
                  <UserAnalyticsChart />
                </div>
              </div>

              {/* Existing Components with ISP Context */}
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 lg:mb-6">
                  Monthly Performance Metrics
                </h2>
                <SummaryCards />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 lg:mb-6">
                  Subscriber Analytics
                </h2>
                <SubscriberCards />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <RevenueChart />
                <PlanChart />
              </div>

              {/* Add bottom padding */}
              <div className="pb-6 lg:pb-8"></div>
            </div>
          )}

          {activeSection === "users" && <UserManagement userFilter={userFilter} />}
          {activeSection === "packages" && packageSubsection === "all" && <PackageManagement />}
          {activeSection === "packages" && packageSubsection === "analytics" && <PackageAnalytics />}
          {activeSection === "wallet-recharge" && <WalletRecharge />}
          {activeSection === "wallet-report" && <WalletReport />}
          {activeSection === "billing" && <BillingManagement />}
          {activeSection === "tickets" && <TicketManagement />}
          {activeSection === "report" && <Reports />}
        </main>
      </div>
    </div>
  );
}