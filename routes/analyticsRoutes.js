import express from "express";
import authMiddelware from "../middlewares/authmiddleware.js";
import { bloodGroupDetailsContoller } from "../controllers/analyticsController.js";

const router = express.Router();

//routes

//GET Blood  Data
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

export default router;
