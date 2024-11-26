import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import serviceRoutes from "./routes/Services.js";

// configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/service", serviceRoutes);

//rest api
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Welcome to Status Page Server</h1>
  `);
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `server Running on ${process.env.DEV_MODE} at ${PORT}`.bgCyan.white
  );
});
