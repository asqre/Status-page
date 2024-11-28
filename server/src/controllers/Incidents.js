import mongoose from "mongoose";
import incidentModel from "../models/Incidents.js";
import organizationModel from "../models/Organization.js";

export const createIncident = async (req, res) => {
  try {
    const { name, organization_id, ...incidentData } = req.body;
    console.log(req.body);

    if (!organization_id) {
      return res.status(400).send({
        success: false,
        message: "organization_id is required",
      });
    }

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "incident name or status must be specified",
      });
    }

    if (incidentData._id) {
      delete incidentData._id;
    }

    const incident = new incidentModel({
      name,
      organization_id,
      ...incidentData,
    });

    const savedIncident = await incident.save();

    const organization = await organizationModel.findByIdAndUpdate(
      organization_id,
      { $push: { incidents: savedIncident._id } },
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
      message: "Incident created successfully",
      data: savedIncident,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create incident",
      error: error.message,
    });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const { organization_id } = req.query;
    const query = organization_id ? { organization_id } : {};

    const incidents = await incidentModel.find(query);
    res.status(200).send({
      success: true,
      message: "Incidents fetched successfully",
      data: incidents,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching incidents",
      error: error.message,
    });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const incident = await incidentModel.findById(req.params.id);
    if (!incident) {
      return res
        .status(404)
        .send({ success: false, message: "Incident not found" });
    }
    res.status(200).send({
      success: true,
      message: "Incident fetched successfully",
      data: incident,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching incident",
      error: error.message,
    });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const incidentData = { ...req.body };

    const incident = await incidentModel.findByIdAndUpdate(
      req.params.id,
      incidentData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!incident) {
      return res
        .status(404)
        .send({ success: false, message: "Incident not found" });
    }

    res.status(200).send({
      success: true,
      message: "Incident updated successfully",
      data: incident,
    });
  } catch (error) {
    res.status(400).send({
      success: true,
      message: "Error updating incident",
      error: error.message,
    });
  }
};

export const deleteIncident = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const incident = await incidentModel.findById(req.params.id);

    if (!incident) {
      return res.status(404).send({
        success: false,
        message: "Incident not found",
      });
    }

    const organization = await organizationModel.findOneAndUpdate(
      { _id: incident.organization_id },
      { $pull: { incidents: incident._id } },
      { session, new: true }
    );

    const deletedIncident = await incidentModel.findByIdAndDelete(
      req.params.id,
      {
        session,
      }
    );

    await session.commitTransaction();

    res.status(200).send({
      success: true,
      message: "Incident deleted successfully",
      deletedIncident: deletedIncident,
      updatedOrganization: organization,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting incident",
      error: error.message,
    });
  }
};

export const addTimelineEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, status } = req.body;

    if (!message || !status) {
      return res.status(400).send({
        success: false,
        message: "Timeline entry message  or status is required",
      });
    }

    const incident = await incidentModel.findByIdAndUpdate(
      id,
      {
        $push: { timeline: { message, status } },
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!incident) {
      return res.status(404).send({
        success: false,
        message: "Incident not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Timeline entry added successfully",
      data: incident,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to add timeline entry",
      error: error.message,
    });
  }
};

export const getIncidentsByOrganizationSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const organization = await organizationModel.findOne({ slug }).populate({
      path: "incidents",
      model: "Incidents",
      select: "-__v",
    });

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    if (!organization.incidents || organization.incidents.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No incidents found for this organization",
        data: [],
      });
    }

    res.status(200).send({
      success: true,
      message: "Incidents fetched successfully",
      data: organization.incidents,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching incidents",
      error: error.message,
    });
  }
};
