import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// import apiKeyAuth from "./src/middleware/middleware.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

import { errorHandler } from "./src/middleware/errorHandler.js";
import { swaggerDocs } from "./src/utils/swagger.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000", Credentials: true }));

const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

app.use(express.json());
app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));

// Heatlh check
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

//public routes
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

swaggerDocs(app);

export default app;
