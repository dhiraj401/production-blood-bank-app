import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/build")));

//Static Routes
app.get("*", function (res, req) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const port = process.env.PORT || 8080;

//listen
app.listen(port, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${port}`.bgBlue
      .white
  );
});
