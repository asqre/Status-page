import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ShieldCheckIcon,
  AlertTriangleIcon,
  XOctagonIcon,
  ActivityIcon,
  HelpCircleIcon,
} from "lucide-react";

const Chip = ({ status }) => {
  const statusConfig = {
    Operational: {
      icon: ShieldCheckIcon,
      variant: "success",
      className: "bg-green-500 hover:bg-green-600",
    },
    "Performance Issues": {
      icon: ActivityIcon,
      variant: "purple",
      className: "bg-purple-500 hover:bg-purple-600",
    },
    "Partial Outage": {
      icon: AlertTriangleIcon,
      variant: "warning",
      className: "bg-yellow-500 hover:bg-yellow-600",
    },
    "Major Outage": {
      icon: XOctagonIcon,
      variant: "destructive",
      className: "bg-red-500 hover:bg-red-600",
    },
    Unknown: {
      icon: HelpCircleIcon,
      variant: "secondary",
      className: "bg-blue-500 hover:bg-blue-600",
    },
    Reported: {
      icon: HelpCircleIcon,
      variant: "destructive",
      className: "bg-red-500 hover:bg-red-600",
    },
    Investigating: {
      icon: HelpCircleIcon,
      variant: "secondary",
      className: "bg-blue-500 hover:bg-blue-600",
    },
    Identified: {
      icon: HelpCircleIcon,
      variant: "purple",
      className: "bg-purple-500 hover:bg-purple-600",
    },
    Watching: {
      icon: HelpCircleIcon,
      variant: "warning",
      className: "bg-yellow-500 hover:bg-yellow-600",
    },
    Fixed: {
      icon: HelpCircleIcon,
      variant: "success",
      className: "bg-green-500 hover:bg-green-600",
    },
  };

  const config = statusConfig[status] || statusConfig.Unknown;
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full text-white",
        config.className
      )}
    >
      <Icon className="w-4 h-4 mr-1" />
      <span className="text-xs font-semibold">{status}</span>
    </Badge>
  );
};

export default Chip;
