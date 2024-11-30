import { incidentStatus } from "@/data";
import React, { useState } from "react";
import StatusChips from "../common/StatusChip";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addTimelineEntry } from "@/redux/incidents/incidentSlice";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

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
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type here"
            value={newTimeLine.message}
            onChange={onInputChange}
          />
        </div>

        <div>
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
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default RecordUpdate;
