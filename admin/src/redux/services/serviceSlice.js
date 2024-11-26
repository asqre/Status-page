import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/axios";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/service");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addService = createAsyncThunk(
  "services/addService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/service", serviceData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/service/${id}`, serviceData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/service/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  services: [],
  isLoading: false,
  serviceData: {
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
    resetService: (state) => {
      state.serviceData = {
        ...state.serviceData,
        name: "",
        status: "",
        description: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch Services
    builder.addCase(fetchServices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services = action.payload;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Add service
    builder.addCase(addService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services.push(action.payload);
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update service
    builder.addCase(updateService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.services.findIndex(
        (service) => service._id === action.payload._id
      );
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete service
    builder.addCase(deleteService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services = state.services.filter(
        (service) => service._id !== action.payload
      );
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setSeviceData, resetService } = serviceSlice.actions;

export default serviceSlice.reducer;
