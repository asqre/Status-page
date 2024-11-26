import React from "react";
import {
  ShieldCheckIcon,
  AlertTriangleIcon,
  XOctagonIcon,
  ActivityIcon,
  HelpCircleIcon,
} from "lucide-react";

const Chip = ({ status }) => {
  const statusConfig = {
    "Operational": { icon: ShieldCheckIcon, color: "bg-green-500" },
    "Performance Issues": { icon: ActivityIcon, color: "bg-purple-500" },
    "Partial Outage": { icon: AlertTriangleIcon, color: "bg-yellow-500" },
    "Major Outage": { icon: XOctagonIcon, color: "bg-red-500" },
    "Unknown": { icon: HelpCircleIcon, color: "bg-blue-500" },
    "Reported": { icon: HelpCircleIcon, color: "bg-red-500" },
    "Investigating": { icon: HelpCircleIcon, color: "bg-blue-500" },
    "Identified": { icon: HelpCircleIcon, color: "bg-purple-500" },
    "Watching": { icon: HelpCircleIcon, color: "bg-yellow-500" },
    "Fixed": { icon: HelpCircleIcon, color: "bg-green-500" },
  };

  const config = statusConfig[status] || statusConfig.Unknown;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-center gap-2 px-2 py-2 w-[155px] rounded-full text-white ${config.color}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs font-semibold">{status}</span>
    </div>
  );
};

export default Chip;
