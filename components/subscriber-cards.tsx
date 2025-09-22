import { Users, UserCheck, Wifi, WifiOff, Clock } from "lucide-react";

interface SubscriberCardProps {
  title: string;
  count: string;
  percentage: string;
  gradientColor: string;
  icon: React.ReactNode;
}

function SubscriberCard({ title, count, percentage, gradientColor, icon }: SubscriberCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title} Subscribers</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{count}</p>
          <div className="flex items-center mt-1">
            <div className={`w-2 h-2 rounded-full mr-1 ${gradientColor.includes('blue') ? 'bg-blue-500' : gradientColor.includes('emerald') ? 'bg-emerald-500' : gradientColor.includes('purple') ? 'bg-purple-500' : gradientColor.includes('orange') ? 'bg-orange-500' : 'bg-red-500'}`}></div>
            <p className="text-gray-500 text-sm">{percentage}</p>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${gradientColor.includes('blue') ? 'bg-blue-50' : gradientColor.includes('emerald') ? 'bg-emerald-50' : gradientColor.includes('purple') ? 'bg-purple-50' : gradientColor.includes('orange') ? 'bg-orange-50' : 'bg-red-50'}`}>
          <div className={`w-7 h-7 ${gradientColor.includes('blue') ? 'text-blue-600' : gradientColor.includes('emerald') ? 'text-emerald-600' : gradientColor.includes('purple') ? 'text-purple-600' : gradientColor.includes('orange') ? 'text-orange-600' : 'text-red-600'}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SubscriberCards() {
  const subscriberData = [
    {
      title: "Total",
      count: "12,486",
      percentage: "100% of base",
      gradientColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: <Users className="h-7 w-7" />,
    },
    {
      title: "Active",
      count: "9,245",
      percentage: "74.1% active rate",
      gradientColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      icon: <UserCheck className="h-7 w-7" />,
    },
    {
      title: "Online",
      count: "6,892",
      percentage: "55.2% online now",
      gradientColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: <Wifi className="h-7 w-7" />,
    },
    {
      title: "Offline",
      count: "2,353",
      percentage: "18.8% offline",
      gradientColor: "bg-gradient-to-br from-orange-500 to-orange-600",
      icon: <WifiOff className="h-7 w-7" />,
    },
    {
      title: "Expiry Soon",
      count: "3,241",
      percentage: "26.0% expiring",
      gradientColor: "bg-gradient-to-br from-red-500 to-red-600",
      icon: <Clock className="h-7 w-7" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
      {subscriberData.map((item, index) => (
        <SubscriberCard
          key={index}
          title={item.title}
          count={item.count}
          percentage={item.percentage}
          gradientColor={item.gradientColor}
          icon={item.icon}
        />
      ))}
    </div>
  );
}