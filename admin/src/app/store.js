import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/services/serviceSlice.js";

export const store = configureStore({
  reducer: {
    services: serviceReducer,
  },
});
