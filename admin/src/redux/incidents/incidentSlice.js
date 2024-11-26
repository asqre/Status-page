import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/axios";

export const fetchIncidents = createAsyncThunk(
  "incidents/fetchIncidents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/incident");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addIncident = createAsyncThunk(
  "incidents/addIncident",
  async (incidentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/incident", incidentData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIncident = createAsyncThunk(
  "incidents/updateIncident",
  async ({ id, incidentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/incident/${id}`, incidentData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteIncident = createAsyncThunk(
  "incidents/deleteIncident",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/incident/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTimelineEntry = createAsyncThunk(
  "incidents/addTimelineEntry",
  async ({ id, timelineData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/incident/${id}/timeline`,
        timelineData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  incidents: [],
  isLoading: false,
  incidentData: {
    tenant_id: "1",
    name: "",
    status: "",
    message: "",
    occurredAt: "",
    timeline: [],
  },
  error: null,
};

const incidentSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setIncidentData: (state, action) => {
      state.incidentData = { ...state.incidentData, ...action.payload };
    },
    resetIncident: (state) => {
      state.incidentData = {
        ...state.incidentData,
        name: "",
        status: "",
        message: "",
        occurredAt: "",
        timeline: [],
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch Incidents
    builder.addCase(fetchIncidents.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchIncidents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incidents = action.payload;
    });
    builder.addCase(fetchIncidents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Add Incidents
    builder.addCase(addIncident.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addIncident.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incidents.push(action.payload);
    });
    builder.addCase(addIncident.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update Incidents
    builder.addCase(updateIncident.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateIncident.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.incidents.findIndex(
        (incident) => incident._id === action.payload._id
      );
      if (index !== -1) {
        state.incidents[index] = action.payload;
      }
    });
    builder.addCase(updateIncident.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete Incidents
    builder.addCase(deleteIncident.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteIncident.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incidents = state.incidents.filter(
        (incident) => incident._id !== action.payload
      );
    });
    builder.addCase(deleteIncident.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Add Timeline Entry
    builder.addCase(addTimelineEntry.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // builder.addCase(addTimelineEntry.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   const index = state.incidents.findIndex(
    //     (incident) => incident._id === action.payload._id
    //   );
    //   if (index !== -1) {
    //     state.incidents[index].timeline.push(action.payload);
    //   }
    // });
    builder.addCase(addTimelineEntry.fulfilled, (state, action) => {
      const index = state.incidents.findIndex(
        (incident) => incident._id === action.payload._id
      );
      if (index !== -1) {
        state.incidents[index] = action.payload;
      }
    });
    builder.addCase(addTimelineEntry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setIncidentData, resetIncident } = incidentSlice.actions;

export default incidentSlice.reducer;
