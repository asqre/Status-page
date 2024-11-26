import { incidentStatus } from "@/data";
import React, { useState } from "react";
import TextArea from "../common/TextArea";
import StatusChips from "../common/StatusChip";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addTimelineEntry } from "@/redux/incidents/incidentSlice";

const RecordUpdate = ({ incident, onClose }) => {
  const dispatch = useDispatch();
  const [newTimeLine, setNewTimeLine] = useState({
    message: "",
    status: "",
  });

  const handleStatusSelect = (status) => {
    setNewTimeLine({ ...newTimeLine, status: status.name });
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setNewTimeLine({ ...newTimeLine, [id]: value });
  };

  const handleSubmit = () => {
    if (!newTimeLine.message || !newTimeLine.status) {
      alert("Please provide both message and status.");
      return;
    }
    dispatch(
      addTimelineEntry({
        id: incident._id,
        timelineData: { ...newTimeLine },
      })
    );
    onClose();
  };

  const currentStatus =
    incidentStatus?.find((status) => status.name === newTimeLine.status) ||
    null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col space-y-[8px]">
        <TextArea
          label="Message"
          placeholder="Type here"
          id="message"
          notRequired="true"
          value={newTimeLine.message}
          onChange={onInputChange}
        />

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

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default RecordUpdate;
