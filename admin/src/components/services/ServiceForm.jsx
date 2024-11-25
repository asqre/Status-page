import React, { useState } from "react";
import InputField from "../common/InputField";
import StatusChips from "../common/StatusChip";
import { statuses } from "@/data";
import TextArea from "../common/TextArea";
import { Button } from "../ui/button";

const ServiceForm = ({ service, onClose }) => {
  const [activeStatus, setActiveStatus] = useState(null);

  const handleStatusSelect = (status) => {
    setActiveStatus(status);
  };

  return (
    <div className="flex flex-col gap-8">
      <InputField label="Name" placeholder="Type here" id="name" />

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
        <div className="flex gap-5">
          {statuses.map((status, index) => (
            <StatusChips
              key={index}
              status={status}
              activeStatus={activeStatus}
              onStatusSelect={handleStatusSelect}
            />
          ))}
        </div>
      </div>

      <TextArea
        label="Description"
        placeholder="Type here"
        id="description"
        notRequired="true"
      />

      <div className="flex justify-end mt-4">
        <Button>Add</Button>
      </div>
    </div>
  );
};

export default ServiceForm;
