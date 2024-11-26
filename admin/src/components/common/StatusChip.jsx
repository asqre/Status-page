import React from "react";

const StatusChip = ({ status, activeStatus, onStatusSelect }) => {
  const isActive = activeStatus && activeStatus.name === status.name;

  const colorClasses = {
    green: {
      bg: "bg-[#22c55E]",
      text: "text-white font-bold",
    },
    purple: {
      bg: "bg-[#9333EA]",
      text: "text-white font-bold",
    },
    yellow: {
      bg: "bg-[#D97706]",
      text: "text-white font-bold",
    },
    red: {
      bg: "bg-[#DC2626]",
      text: "text-white font-bold",
    },
    blue: {
      bg: "bg-[#2563EB]",
      text: "text-white font-bold",
    },
  };

  const classes = isActive
    ? colorClasses[status.color] || {}
    : { bg: "bg-white", text: "text-gray-500", border: "border-gray-300" };

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border text-sm transition-colors ${classes.bg} ${classes.text} hover:opacity-85`}
      onClick={() => onStatusSelect(status)}
    >
      <status.icon className={`w-5 h-5 ${classes.text}`} />
      <span>{status.name}</span>
    </div>
  );
};

export default StatusChip;
