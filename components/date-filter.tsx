import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateFilterProps {
  onDateChange?: (dateRange: DateRange) => void;
}

export function DateFilter({ onDateChange }: DateFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);

  const presetRanges = [
    {
      label: "Today",
      range: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      label: "This Week",
      range: {
        from: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
        to: new Date(),
      },
    },
    {
      label: "This Month",
      range: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
    {
      label: "Last 3 Months",
      range: {
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
        to: new Date(),
      },
    },
    {
      label: "This Year",
      range: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
  ];

  const handlePresetSelect = (preset: typeof presetRanges[0]) => {
    setDateRange(preset.range);
    onDateChange?.(preset.range);
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = () => {
    if (!dateRange.from || !dateRange.to) return "Select date range";
    
    if (dateRange.from.toDateString() === dateRange.to.toDateString()) {
      return formatDate(dateRange.from);
    }
    
    const fromStr = dateRange.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const toStr = formatDate(dateRange.to);
    
    return `${fromStr} - ${toStr}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-4 w-4 text-gray-500" />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm">{formatDateRange()}</span>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 ml-12 lg:ml-0" 
          align="start" 
          side="bottom"
          sideOffset={5}
          avoidCollisions={true}
          collisionPadding={{ left: 320, right: 16, top: 16, bottom: 16 }}
        >
          <div className="flex flex-col">
            {/* Quick Select Options - Top */}
            <div className="border-b border-gray-200 p-3">
              <div className="text-sm font-medium text-gray-900 mb-2">Quick Select</div>
              <div className="flex flex-wrap gap-1">
                {presetRanges.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 h-auto"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Calendar - Bottom */}
            <div className="p-3">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range: any) => {
                  if (range) {
                    setDateRange(range);
                    onDateChange?.(range);
                  }
                }}
                numberOfMonths={1}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}