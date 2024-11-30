import axios from "@/api/axios";
import { getUserData } from "@/utils.js/authUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const fetchMembers = createAsyncThunk(
  "organizations/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const { organization } = getUserData();
      const response = await axios.get(
        `/organization/get-all-members/${organization.id}`
      );
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addMember = createAsyncThunk(
  "organizations/addMember",
  async (memberData, { rejectWithValue }) => {
    try {
      const { user, organization } = getUserData();
      const response = await axios.post("/organization/add-member", {
        ...memberData,
        organization_id: organization.id,
        userId: user.id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data.member;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  organization_id: null,
  organizationDetails: {},
  members: [],
  isLoading: false,
  error: null,
  memberData: {
    userName: "",
    userEmail: "",
    role: "",
    password: "",
  },
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setOrganizationId: (state, action) => {
      state.organization_id = action.payload;
    },
    setOrganizationDetails: (state, action) => {
      state.organizationDetails = action.payload;
    },
    clearOrganizationId: (state) => {
      state.organization_id = null;
    },
    setMemberData: (state, action) => {
      state.memberData = { ...state.memberData, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    // Fetch Members
    builder.addCase(fetchMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // add Member
    builder.addCase(addMember.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members.push(action.payload);

      state.memberData = {
        userName: "",
        userEmail: "",
        role: "",
      };
    });
    builder.addCase(addMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  setOrganizationId,
  setOrganizationDetails,
  clearOrganizationId,
  setMemberData,
} = organizationSlice.actions;

export default organizationSlice.reducer;
