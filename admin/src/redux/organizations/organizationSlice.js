import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organization_id: null,
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setOrganizationId: (state, action) => {
      state.organization_id = action.payload;
    },
    clearOrganizationId: (state) => {
      state.organization_id = null;
    },
  },
});

export const { setOrganizationId, clearOrganizationId } =
  organizationSlice.actions;

export default organizationSlice.reducer;
