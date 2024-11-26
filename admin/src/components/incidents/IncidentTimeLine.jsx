import React from "react";

const IncidentTimeLine = ({ incident }) => {
  return (
    <div className="flex flex-col gap-6">
      {incident?.timeline?.map((entry, index) => (
        <div key={index} className="space-y-2">
          <p className="text-sm text-gray-500">{entry.updatedAt}</p>
          <p className="font-medium">{entry.message}</p>
          <p className="text-gray-700">{entry.status}</p>
        </div>
      ))}
      {!incident?.timeline?.length && (
        <p className="text-gray-500 text-center">No timeline data available.</p>
      )}
    </div>
  );
};

export default IncidentTimeLine;
