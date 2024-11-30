import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const StatusChip = ({ status, activeStatus, onStatusSelect }) => {
  const isActive = activeStatus && activeStatus.name === status.name;

  const colorVariants = {
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    yellow: "bg-amber-500 hover:bg-amber-600",
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600",
  };

  const getVariantClasses = () => {
    if (isActive) {
      return colorVariants[status.color] || "bg-gray-500";
    }
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={cn(
        "cursor-pointer flex items-center gap-2 py-1 px-3 rounded-md",
        getVariantClasses(),
        "hover:opacity-90 transition-all"
      )}
      onClick={() => onStatusSelect(status)}
    >
      <status.icon className="w-4 h-4 mr-1" />
      {status.name}
    </Badge>
  );
};

export default StatusChip;
