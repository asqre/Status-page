import React from "react";

const StatusChip = ({ status, activeStatus, onStatusSelect }) => {
  const isActive = activeStatus && activeStatus.name === status.name;

  const colorClasses = {
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-300",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
    },
  };

  const classes = isActive
    ? colorClasses[status.color] || {}
    : { bg: "bg-white", text: "text-gray-500", border: "border-gray-300" };

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border text-sm transition-colors ${classes.bg} ${classes.text} ${classes.border} hover:bg-gray-100`}
      onClick={() => onStatusSelect(status)}
    >
      <status.icon className={`w-5 h-5 ${classes.text}`} />
      <span>{status.name}</span>
    </div>
  );
};

export default StatusChip;
