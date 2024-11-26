import { createSlice } from "@reduxjs/toolkit";
import { services } from "../../data";

const initialState = {
  services: [...services],
  isLoading: false,
  serviceData: {
    id: "",
    name: "",
    status: "",
    description: "",
    updated_at: "",
    created_at: "",
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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
          updated_at: new Date().toISOString(),
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
