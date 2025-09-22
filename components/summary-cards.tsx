import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, IndianRupee, Users, Calendar } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function SummaryCard({ title, value, change, isPositive, icon }: SummaryCardProps) {
  // Define gradient colors based on card title
  const getCardStyle = (cardTitle: string) => {
    if (cardTitle.includes('Offline')) {
      return "bg-gradient-to-br from-purple-500 to-violet-600 text-white border-none";
    } else if (cardTitle.includes('Online')) {
      return "bg-gradient-to-br from-cyan-500 to-teal-600 text-white border-none";
    } else if (cardTitle.includes('Customer Monthly')) {
      return "bg-gradient-to-br from-pink-500 to-rose-600 text-white border-none";
    } else if (cardTitle.includes('This Month Total')) {
      return "bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-none";
    } else if (cardTitle.includes('Daily')) {
      return "bg-gradient-to-br from-orange-500 to-red-600 text-white border-none";
    }
    return "bg-white border-gray-200"; // fallback
  };

  const isGradientCard = title.includes('Recharge');
  const cardStyle = getCardStyle(title);

  return (
    <Card className={`hover:shadow-xl hover:scale-105 transition-all duration-300 ${cardStyle}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-xs sm:text-sm lg:text-base font-medium leading-tight ${
          isGradientCard ? 'text-white/90' : 'text-gray-600'
        }`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className={`text-lg sm:text-2xl lg:text-3xl font-bold ${
            isGradientCard ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </div>
          <div className={`flex-shrink-0 transform scale-150 ${
            isGradientCard ? 'text-white/80' : 'text-blue-600'
          }`}>
            {icon}
          </div>
        </div>
        <div className="flex items-center text-xs">
          {isPositive ? (
            <TrendingUp className={`h-3 w-3 mr-1 flex-shrink-0 ${
              isGradientCard ? 'text-white/70' : 'text-green-500'
            }`} />
          ) : (
            <TrendingDown className={`h-3 w-3 mr-1 flex-shrink-0 ${
              isGradientCard ? 'text-white/70' : 'text-red-500'
            }`} />
          )}
          <span className={isPositive 
            ? (isGradientCard ? "text-white/90" : "text-green-500")
            : (isGradientCard ? "text-white/90" : "text-red-500")
          }>
            {change}
          </span>
          <span className={`ml-1 hidden sm:inline ${
            isGradientCard ? 'text-white/70' : 'text-gray-500'
          }`}>
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryCards() {
  const summaryData = [
    {
      title: "Monthly Offline Recharge",
      value: "₹24,500",
      change: "+12.5%",
      isPositive: true,
      icon: <IndianRupee className="h-4 w-4" />,
    },
    {
      title: "Monthly Online Recharge",
      value: "₹38,750",
      change: "+8.2%",
      isPositive: true,
      icon: <IndianRupee className="h-4 w-4" />,
    },
    {
      title: "Customer Monthly Recharge",
      value: "₹63,250",
      change: "+15.3%",
      isPositive: true,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "This Month Total Recharge",
      value: "₹89,420",
      change: "+22.1%",
      isPositive: true,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Customer Daily Recharge",
      value: "₹2,850",
      change: "-3.2%",
      isPositive: false,
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
      {summaryData.map((item, index) => (
        <SummaryCard
          key={index}
          title={item.title}
          value={item.value}
          change={item.change}
          isPositive={item.isPositive}
          icon={item.icon}
        />
      ))}
    </div>
  );
}