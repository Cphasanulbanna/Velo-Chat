import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // enable set cookie for client-side
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
  connectDb();
});
