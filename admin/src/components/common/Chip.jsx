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
    Operational: { icon: ShieldCheckIcon, color: "bg-green-500" },
    "Performance Issues": { icon: ActivityIcon, color: "bg-purple-500" },
    "Partial Outage": { icon: AlertTriangleIcon, color: "bg-yellow-500" },
    "Major Outage": { icon: XOctagonIcon, color: "bg-red-500" },
    Unknown: { icon: HelpCircleIcon, color: "bg-blue-500" },
  };

  const config = statusConfig[status] || statusConfig.Unknown;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-center gap-2 px-3 py-2 w-[180px] rounded-full text-white ${config.color}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm">{status}</span>
    </div>
  );
};

export default Chip;
