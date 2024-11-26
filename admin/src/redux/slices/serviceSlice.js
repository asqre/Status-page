import { createSlice } from "@reduxjs/toolkit";
import { services } from "../../data";

const initialState = {
  services: [...services],
  isLoading: false,
  serviceData: {
    id: "",
    tenant_id: "1",
    name: "",
    status: "",
    description: "",
  },
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSeviceData: (state, action) => {
      state.serviceData = { ...state.serviceData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetService: (state, action) => {
      return initialState;
    },
    addService: (state, action) => {
      const newService = {
        ...action.payload,
        id: state.services.length + 1,
      };
      state.services.push(newService);
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (service) => service.id !== action.payload
      );
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(
        (service) => service.id === action.payload.id
      );

      if (index !== -1) {
        state.services[index] = {
          ...state.services[index],
          ...action.payload,
        };
      }
    },
  },
});

export const {
  setSeviceData,
  setLoading,
  resetService,
  deleteService,
  updateService,
  addService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
