import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/slices/serviceSlice.js";

export const store = configureStore({
  reducer: {
    services: serviceReducer,
  },
});
