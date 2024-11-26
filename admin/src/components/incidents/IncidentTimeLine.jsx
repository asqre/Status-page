import React from "react";

const IncidentTimeLine = ({ selectedIncident }) => {
  return (
    <div className="flex flex-col gap-6">
      {selectedIncident?.timeline?.map((entry, index) => (
        <div key={index} className="space-y-2">
          <p className="text-sm text-gray-500">{entry.time}</p>
          <p className="font-medium">{entry.title}</p>
          <p className="text-gray-700">{entry.description}</p>
        </div>
      ))}
      {!selectedIncident?.timeline?.length && (
        <p className="text-gray-500 text-center">No timeline data available.</p>
      )}
    </div>
  );
};

export default IncidentTimeLine;
