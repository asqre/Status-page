import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import serviceRoutes from "./routes/Services.js";
import incidentRoutes from "./routes/Incidents.js";
import organizationRoutes from "./routes/Organization.js";
import authRoutes from "./routes/Auth.js";
import { Server } from "socket.io";
import http from "http";
import Service from "./models/Services.js";
import Incident from "./models/Incidents.js";

// configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

// web socket config
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.HOST_URL, process.env.CLIENT_LOCALHOST_URL],
    methods: ["GET", "POST"],
  },
});

// socket connection handler
io.on("connection", (socket) => {
  console.log("New Client connected");

  const serviceChangeStream = Service.watch();
  serviceChangeStream.on("change", async (change) => {
    try {
      if (change.operationType === "insert") {
        socket.emit("serviceAdded", change.fullDocument);
      } else if (change.operationType === "update") {
        const updatedService = await Service.findById(change.documentKey._id);
        socket.emit("serviceUpdated", updatedService);
      } else if (change.operationType === "delete") {
        socket.emit("serviceDeleted", change.documentKey._id);
      }
    } catch (error) {
      console.error("Error in service change stream:", error);
    }
  });

  const incidentChangeStream = Incident.watch();
  incidentChangeStream.on("change", async (change) => {
    try {
      if (change.operationType === "insert") {
        socket.emit("incidentAdded", change.fullDocument);
      } else if (change.operationType === "update") {
        const updatedIncident = await Incident.findById(change.documentKey._id);
        socket.emit("incidentUpdated", updatedIncident);
      } else if (change.operationType === "delete") {
        socket.emit("incidentDeleted", change.documentKey._id);
      }
    } catch (error) {
      console.error("Error in incident change stream:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// middlewares
app.use(
  cors({
    origin: [process.env.HOST_URL, process.env.CLIENT_LOCALHOST_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/incident", incidentRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Welcome to Status Page Server</h1>
  `);
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
server.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} at ${PORT}`.bgCyan.white
  );
});
