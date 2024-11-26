import React, { useEffect, useState } from "react";
import InputField from "../common/InputField";
import StatusChips from "../common/StatusChip";
import { statuses } from "@/data";
import TextArea from "../common/TextArea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  resetService,
  setSeviceData,
  updateService,
} from "@/redux/services/serviceSlice";

const ServiceForm = ({ service, onClose }) => {
  const dispatch = useDispatch();
  const { serviceData, isLoading, error } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    if (service) {
      dispatch(setSeviceData(service));
    }

    return () => dispatch(resetService());
  }, [service, dispatch]);

  const handleStatusSelect = (status) => {
    dispatch(setSeviceData({ status: status.name }));
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(setSeviceData({ [id]: value }));
  };

  const handleSubmit = () => {
    if (service) {
      dispatch(updateService({ id: serviceData._id, serviceData }));
    } else {
      dispatch(addService(serviceData));
    }

    onClose();
  };

  const currentStatus = statuses.find(
    (status) => status.name === serviceData.status
  );

  return (
    <div className="flex flex-col gap-8">
      <InputField
        label="Name"
        placeholder="Type here"
        id="name"
        value={serviceData.name}
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
          {statuses.map((status, index) => (
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
        label="Description"
        placeholder="Type here"
        id="description"
        notRequired="true"
        value={serviceData.description}
        onChange={onInputChange}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>{service ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
};

export default ServiceForm;
