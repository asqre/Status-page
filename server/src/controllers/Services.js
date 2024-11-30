import serviceModel from "../models/Services.js";
import organizationModel from "../models/Organization.js";
import mongoose from "mongoose";

export const createService = async (req, res) => {
  try {
    const { name, organization_id } = req.body;

    if (!organization_id) {
      return res.status(400).send({
        success: false,
        message: "organization_id is required",
      });
    }

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "service name or status must be specified",
      });
    }

    if (req.body._id) {
      delete req.body._id;
    }

    if (req.body._id) {
      return res.status(400).send({
        success: false,
        message: "Custom _id is not allowed",
      });
    }

    const service = new serviceModel({ ...req.body });

    const savedService = await service.save();

    const organization = await organizationModel.findByIdAndUpdate(
      organization_id,
      { $push: { services: savedService._id } },
      { new: true }
    );

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

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
    const { organization_id } = req.query;
    const query = organization_id ? { organization_id } : {};

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
    const serviceData = { ...req.body };

    const service = await serviceModel.findByIdAndUpdate(
      req.params.id,
      serviceData,
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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const service = await serviceModel.findById(req.params.id);

    if (!service) {
      return res.status(404).send({
        success: false,
        message: "Service not found",
      });
    }

    const organization = await organizationModel.findOneAndUpdate(
      { _id: service.organization_id },
      { $pull: { services: service._id } },
      { session, new: true }
    );

    const deletedService = await serviceModel.findByIdAndDelete(req.params.id, {
      session,
    });

    await session.commitTransaction();

    res.status(200).send({
      success: true,
      message: "Service deleted successfully",
      deletedService: deletedService,
      updatedOrganization: organization,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting service",
      error: error.message,
    });
  }
};

export const getServicesByOrganizationSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const organization = await organizationModel.findOne({ slug }).populate({
      path: "services",
      model: "Services",
      select: "-__v",
    });

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    if (!organization.services || organization.services.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No services found for this organization",
        data: [],
      });
    }

    res.status(200).send({
      success: true,
      message: "Services fetched successfully",
      data: organization.services,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching services",
      error: error.message,
    });
  }
};
