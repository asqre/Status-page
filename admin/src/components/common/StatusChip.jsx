import React from "react";

const StatusChip = ({ status, activeStatus, onStatusSelect }) => {
  const isActive = activeStatus && activeStatus.name === status.name;

  return (
    <div
      className={`
        flex items-center gap-2 p-2 rounded-md cursor-pointer border text-sm
        ${
          isActive
            ? `bg-${status.color}-100 text-${status.color}-700 border-${status.color}-300`
            : `hover:bg-gray-100 bg-white border-gray-300`
        }
        transition-colors
      `}
      onClick={() => onStatusSelect(status)}
    >
      <status.icon
        className={`
          w-5 h-5
          ${isActive ? `text-${status.color}-700` : `text-gray-500`}
        `}
      />
      <span>{status.name}</span>
    </div>
  );
};

export default StatusChip;
