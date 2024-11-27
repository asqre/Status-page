import mongoose from "mongoose";
import organizationModal from "../models/Organization.js";
import userModel from "../models/Users.js";
import { UserRoles } from "../data/Enums.js";

export const checkUserOrganization = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const organization = await organizationModal.findOne({
      "members.user": userId,
    });

    res.status(200).send({
      success: true,
      message: "Organization check successful",
      isMember: !!organization,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error checking organization",
      error: error.message,
    });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const { userId, companyName, slug, userEmail, userName } = req.body;

    if ((!userId && (!userEmail || !userName)) || !companyName || !slug) {
      return res.status(400).send({
        success: false,
        message:
          "Invalid input. Provide either existing user ID or new user details",
      });
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return res.status(400).send({
        success: false,
        message: "Invalid slug format",
      });
    }

    const existingUser = await userModel.findOne({ userEmail });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already a part of other organization",
      });
    }

    const user = new userModel({
      userName: userName,
      userEmail: userEmail,
      role: UserRoles.OWNER,
    });

    await user.save();

    const organization = new organizationModal({
      companyName,
      slug,
      members: [{ user: userId, role: UserRoles.OWNER, user_id: user._id }],
    });

    const savedOrganization = await organization.save();

    user.organization_id = savedOrganization._id;
    await user.save();

    res.status(201).send({
      success: true,
      message: "Organization created successfully",
      data: savedOrganization,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({
        success: false,
        message: "Subdomain is already taken",
        error: error.message,
      });
    }
    res.status(500).send({
      success: false,
      message: "Error creating organization",
      error: error.message,
    });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await organizationModal.find();
    res.status(200).send({
      success: true,
      message: "Organizations fetched successfully",
      data: organizations,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching organizations",
      error: error.message,
    });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await organizationModal.findById(id);

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Organization fetched successfully",
      data: organization,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching organization",
      error: error.message,
    });
  }
};

export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const organization = await organizationModal.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Organization updated successfully",
      data: organization,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating organization",
      error: error.message,
    });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await organizationModal.findByIdAndDelete(id);

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Organization deleted successfully",
      deletedOrganization: organization,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting organization",
      error: error.message,
    });
  }
};
