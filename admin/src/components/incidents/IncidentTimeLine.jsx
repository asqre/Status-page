import React from "react";
import moment from "moment";

const IncidentTimeLine = ({ incident }) => {
  if (!incident) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{incident.name}</h1>
          <p className="text-sm text-gray-500">
            {moment(incident.createdAt).format("MMM DD, YYYY, h:mm:ss A")} -{" "}
            {moment(incident.updatedAt).format("MMM DD, YYYY, h:mm:ss A")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {incident.timeline
          .slice()
          .reverse()
          .map((entry, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <div className="flex flex-col ">
                <div className="font-semibold">{entry.status}</div>
                <div className="text-gray-500 text-xs">
                  {moment(entry.updatedAt).format("MMM DD, YYYY, h:mm:ss A")}
                </div>
              </div>
              <p className="mt-2">{entry.message}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IncidentTimeLine;
