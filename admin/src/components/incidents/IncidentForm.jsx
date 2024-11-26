import React, { useEffect } from "react";
import InputField from "../common/InputField";
import StatusChips from "../common/StatusChip";
import { incidentStatus } from "@/data";
import TextArea from "../common/TextArea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncident,
  resetIncident,
  setIncidentData,
  updateIncident,
} from "@/redux/incidents/incidentSlice";

const IncidentForm = ({ incident, onClose }) => {
  const dispatch = useDispatch();
  const { incidentData, isLoading, error } = useSelector(
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
      dispatch(addIncident(incidentData));
    }

    onClose();
  };

  const currentStatus = incidentStatus.find(
    (status) => status.name === incidentData.status
  );

  return (
    <div className="flex flex-col gap-8">
      <InputField
        label="Name"
        placeholder="Type here"
        id="name"
        value={incidentData.name}
        onChange={onInputChange}
      />

      <div className="flex flex-col space-y-[8px]">
        <label
          htmlFor="label"
          className="required-input"
          style={{
            fontFamily: "Noto Sans",
            fontWeight: 600,
            color: "#666666",
            fontSize: "12px",
            lineHeight: "18px",
          }}
        >
          Status
        </label>
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

      <TextArea
        label="Message"
        placeholder="Type here"
        id="message"
        notRequired="true"
        value={incidentData.message}
        onChange={onInputChange}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>{incident ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
};

export default IncidentForm;
