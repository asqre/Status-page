import serviceModel from "../models/Services.js";

export const createService = async (req, res) => {
  try {
    const { name, tenant_id } = req.body;

    if (!tenant_id) {
      return res.status(400).send({
        success: false,
        message: "tenand_id is required",
      });
    }

    if (!name ) {
      return res.status(400).send({
        success: false,
        message: "service name or status must be specified",
      });
    }

    const service = new serviceModel({ ...req.body });

    const savedService = await service.save();

    res.status(201).send({
      success: true,
      message: "Service created successfully",
      data: savedService,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const { tenant_id } = req.query;
    const query = tenant_id ? { tenant_id } : {};

    const services = await serviceModel.find(query);
    res.status(200).send({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching services",
      error: error.message,
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not found" });
    }
    res.status(200).send({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching service",
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const service = await serviceModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not found" });
    }

    res.status(200).send({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    res.status(400).send({
      success: true,
      message: "Error updating service",
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await serviceModel.findByIdAndDelete(req.params.id);

    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not found" });
    }

    res.status(200).send({
      success: true,
      message: "Service deleted successfully",
      deletedService: service,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting service",
      error: error.message,
    });
  }
};
