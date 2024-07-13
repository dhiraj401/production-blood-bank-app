import express from "express";
import authmiddleware from "../middlewares/authmiddleware.js";
import {
  createInventoryController,
  getDonarsController,
  getHospitalController,
  getInventoryController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} from "../controllers/inventoryController.js";

const router = express.Router();

//router
//ADD INVENTORY || POST
router.post("/create-inventory", authmiddleware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authmiddleware, getInventoryController);

//GET ALL BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authmiddleware,
  getRecentInventoryController
);

//GET Hospital BLOOD RECORDS
router.get(
  "/get-inventory-hospital",
  authmiddleware,
  getInventoryHospitalController
);

//GET DONAR RECORDS
router.get("/get-donars", authmiddleware, getDonarsController);

//GET Hospital RECORDS
router.get("/get-hospital", authmiddleware, getHospitalController);

//GET organisation RECORDS
router.get("/get-orgnaisation", authmiddleware, getOrgnaisationController);

//GET organisation RECORDS
router.get(
  "/get-orgnaisation-for-hospital",
  authmiddleware,
  getOrgnaisationForHospitalController
);
export default router;
