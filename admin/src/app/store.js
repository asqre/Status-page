import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/services/serviceSlice.js";
import incidentReducer from "../redux/incidents/incidentSlice.js";

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    incidents: incidentReducer,
  },
});
