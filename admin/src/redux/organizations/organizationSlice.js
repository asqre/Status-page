import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organization_id: null,
  organizationDetails: {},
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
  },
});

export const {
  setOrganizationId,
  setOrganizationDetails,
  clearOrganizationId,
} = organizationSlice.actions;

export default organizationSlice.reducer;
