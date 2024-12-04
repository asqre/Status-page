import organizationModal from "../models/Organization.js";
import userModel from "../models/Users.js";
import { UserRoles } from "../data/Enums.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;

    if (!userName || !userEmail || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      return res.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }

    const existingUser = await userModel.findOne({ userEmail });
    if (existingUser && existingUser.organization_id) {
      return res.status(409).send({
        success: false,
        message: "User with this email already exists",
      });
    }

    let user;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (existingUser) {
      existingUser.password = hashedPassword;
      user = existingUser;
    } else {
      user = new userModel({
        userName: userName,
        userEmail: userEmail,
        role: UserRoles.OWNER,
        password: hashedPassword,
      });
    }

    await user.save();

    const token = JWT.sign(
      {
        userId: user._id,
        userEmail: user.userEmail,
        userName: user.userName,
        role: UserRoles.OWNER,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send({
      success: false,
      message: "Error during signup",
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { userEmail, password } = req.body;

  if (!userEmail || !password) {
    return res.status(400).send({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = await userModel.findOne({ userEmail });

  if (!user) {
    return res.status(401).send({
      success: false,
      message: "Invalid email",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send({
      success: false,
      message: "Invalid password",
    });
  }

  const organization = await organizationModal.findById(user.organization_id);

  const responseData = {
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      userName: user.userName,
      userEmail: user.userEmail,
      role: user.role,
    },
    isMember: !!organization,
    organization: organization
      ? {
          id: organization._id,
          companyName: organization.companyName,
          slug: organization.slug,
        }
      : null,
  };

  const token = JWT.sign(
    {
      userId: user._id,
      userEmail: user.userEmail,
      userName: user.userName,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 3600000,
  });

  res.status(200).send({
    ...responseData,
    token,
  });
};

export const checkUserOrganization = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).send({
        success: false,
        message: "User Email is required",
      });
    }

    const user = await userModel.findOne({ userEmail });

    if (!user) {
      return res.status(200).send({
        success: true,
        message: "Organization check successful",
        isMember: false,
        organization: null,
        user: null,
      });
    }

    const organization = await organizationModal.findById(user.organization_id);

    const token = JWT.sign(
      {
        userId: user._id,
        userEmail: user.userEmail,
        userName: user.userName,
        role: user.role,
        organizationId: organization._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).send({
      success: true,
      message: "Organization check successful",
      isMember: !!organization,
      organization: organization
        ? {
            id: organization._id,
            companyName: organization.companyName,
            slug: organization.slug,
          }
        : null,
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role,
      },
      token,
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
    const { companyName, slug, userEmail, userName } = req.body;

    if (!companyName || !slug || !userEmail || !userName) {
      return res.status(400).send({
        success: false,
        message: "Invalid input. Provide all required details",
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
    if (existingUser && existingUser.organization_id) {
      return res.status(409).send({
        success: false,
        message: "User already a part of other organization",
      });
    }

    const existingOrganization = await organizationModal.findOne({ slug });
    if (existingOrganization) {
      return res.status(409).send({
        success: false,
        message: "Subdomain is already taken",
      });
    }

    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      const saltRounds = 10;
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

      user = new userModel({
        userName: userName,
        userEmail: userEmail,
        role: UserRoles.OWNER,
        password: hashedPassword,
      });
    }

    const organization = new organizationModal({
      companyName,
      slug,
      members: [{ user: userName, role: UserRoles.OWNER, user_id: user._id }],
    });

    const savedOrganization = await organization.save();

    user.organization_id = savedOrganization._id;
    await user.save();

    const token = JWT.sign(
      {
        userId: user._id,
        userEmail: user.userEmail,
        userName: user.userName,
        role: UserRoles.OWNER,
        organizationId: savedOrganization._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).send({
      success: true,
      message: "Organization created successfully",
      data: {
        companyName: savedOrganization.companyName,
        slug: savedOrganization.slug,
        id: savedOrganization._id,
        // userEmail: user.userEmail,
      },
      token,
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
    // Fetch only `companyName` and `slug` fields from the database
    const organizations = await organizationModal.find({}, "companyName slug");
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
    const { userEmail, userName, role, organization_id, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = await userModel.findOne({ userEmail });

    if (!user) {
      user = new userModel({
        userName,
        userEmail,
        password: hashedPassword,
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
        password: password,
      },
    });
  } catch (error) {
    console.error("Error adding organization member:", error);
    res.status(500).send({
      success: false,
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
