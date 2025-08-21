import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// import apiKeyAuth from "./src/middleware/middleware.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

import { errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

//public routes
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT} on ${new Date().toISOString()}`);
});
