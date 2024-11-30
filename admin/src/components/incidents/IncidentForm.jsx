import React, { useEffect } from "react";
import StatusChips from "../common/StatusChip";
import { incidentStatus } from "@/data";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncident,
  resetIncident,
  setIncidentData,
  updateIncident,
} from "@/redux/incidents/incidentSlice";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const IncidentForm = ({ incident, onClose }) => {
  const dispatch = useDispatch();
  const { incidentData } = useSelector(
    (state) => state.incidents
  );

  useEffect(() => {
    if (incident) {
      dispatch(setIncidentData(incident));
    }

    return () => dispatch(resetIncident());
  }, [incident, dispatch]);

  const handleStatusSelect = (status) => {
    dispatch(setIncidentData({ status: status.name }));
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(setIncidentData({ [id]: value }));
  };

  const handleSubmit = () => {
    if (incident) {
      dispatch(updateIncident({ id: incidentData._id, incidentData }));
    } else {
      const newIncidentData = {
        ...incidentData,
        timeline: [
          {
            message: incidentData.message || "Incident created",
            status: incidentData.status,
          },
        ],
      };
      dispatch(addIncident(newIncidentData));
    }

    onClose();
  };

  const currentStatus = incidentStatus.find(
    (status) => status.name === incidentData.status
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label htmlFor="name" className="required-input">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          value={incidentData.name}
          onChange={onInputChange}
          placeholder="Enter service name"
          required
        />
      </div>

      <div className="flex flex-col space-y-[8px]">
        <Label htmlFor="status" className="required-input">
          Status
        </Label>
        <div className="flex flex-wrap gap-5">
          {incidentStatus.map((status, index) => (
            <StatusChips
              key={index}
              status={status}
              activeStatus={currentStatus}
              onStatusSelect={handleStatusSelect}
            />
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Type here"
          value={incidentData.message}
          onChange={onInputChange}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>{incident ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
};

export default IncidentForm;
