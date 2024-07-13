import express from "express";
import {
  deleteDonarController,
  deleteHospitalController,
  deleteOrganistionController,
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
} from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import adminMiddlewre from "../middlewares/adminMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

//Routes object
const router = express.Router();

//Routes

//GET || DONAR LIST
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddlewre,
  getDonarsListController
);

router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddlewre,
  getHospitalListController
);

router.get("/org-list", authMiddleware, adminMiddlewre, getOrgListController);

//Delete Donar || GET
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

//Hospital Donar || GET
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);

//Organistion Donar || GET
router.delete(
  "/delete-Organistion/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrganistionController
);
//Export
export default router;
