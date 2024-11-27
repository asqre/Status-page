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

export const addOrganizationMember = async (req, res) => {
  try {
    const { userEmail, userName, role = UserRoles.MEMBER } = req.body;

    const { organization_id } = req.user;

    let user = await userModel.findOne({ userEmail });

    if (!user) {
      user = new userModel({
        userName,
        userEmail,
        password: process.env.DEFAULT_PASSWORD,
        role,
        organization_id,
      });

      await user.save();
    }

    const organization = await organizationModal.findById(organization_id);

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    const existingMember = organization.members.find(
      (member) => member.user_id.toString() === user._id.toString()
    );

    if (existingMember) {
      return res.status(400).send({
        success: false,
        message: "User is already a member",
      });
    }

    organization.members.push({
      user: user.userName,
      role: role,
      user_id: user._id,
    });

    await organization.save();

    res.status(201).send({
      success: true,
      message: "Member added successfully",
      member: {
        user_id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: role,
      },
    });
  } catch (error) {
    console.error("Error adding organization member:", error);
    res.status(500).send({
      success: fasle,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchAllMembers = async (req, res) => {
  try {
    const { organization_id } = req.params;

    const organization = await organizationModal
      .findById(organization_id)
      .populate({
        path: "members.user_id",
        model: "Users",
        select: "userName userEmail role", // Select only necessary fields
      });

    if (!organization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    const members = organization.members.map((member) => ({
      userName: member.user_id.userName,
      userEmail: member.user_id.userEmail,
      role: member.role,
    }));

    res.status(200).send({
      success: true,
      message: "Members fetched successfully",
      data: members,
    });
  } catch (error) {
    console.error("Error fetching organization members:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
