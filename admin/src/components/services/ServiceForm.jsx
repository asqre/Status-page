import React, { useEffect } from "react";
import StatusChips from "../common/StatusChip";
import { serviceStatus } from "@/data";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  resetService,
  setSeviceData,
  updateService,
} from "@/redux/services/serviceSlice";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

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

  const currentStatus = serviceStatus.find(
    (status) => status.name === serviceData.status
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
          value={serviceData.name}
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
          {serviceStatus.map((status, index) => (
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Type here"
          value={serviceData.description}
          onChange={onInputChange}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>{service ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
};

export default ServiceForm;
