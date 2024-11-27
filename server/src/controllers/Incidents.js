import incidentModel from "../models/Incidents.js";

export const createIncident = async (req, res) => {
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
        message: "incident name or status must be specified",
      });
    }

    const incident = new incidentModel({ ...req.body });

    const savedIncident = await incident.save();

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
  try {
    const incident = await incidentModel.findByIdAndDelete(req.params.id);

    if (!incident) {
      return res
        .status(404)
        .send({ success: false, message: "Incident not found" });
    }

    res.status(200).send({
      success: true,
      message: "Incident deleted successfully",
      deletedIncident: incident,
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
