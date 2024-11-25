import React from "react";

const StatusChip = ({ status, activeStatus, onStatusSelect }) => {
  return (
    <div
      className={`
        flex items-center gap-2 p-2 rounded-md cursor-pointer border text-sm
        ${
          activeStatus?.name === status.name
            ? `bg-${status.color}-100 text-${status.color}-700 border-${status.color}-300`
            : ` hover:bg-gray-100 bg-white border-gray-300`
        }
        transition-colors
      `}
      onClick={() => onStatusSelect(status)}
    >
      <status.icon
        className={`
          w-5 h-5
          ${
            activeStatus?.name === status.name ? `text-${status.color}-700` : ``
          }
        `}
      />
      <span>{status.name}</span>
    </div>
  );
};

export default StatusChip;
