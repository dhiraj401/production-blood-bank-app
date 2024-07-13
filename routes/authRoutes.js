import express from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/authController.js";
import authmiddleware from "../middlewares/authmiddleware.js";

const routes = express.Router();

//router
routes.post("/register", registerController);

routes.post("/login", loginController);

routes.get("/current-user", authmiddleware, getCurrentUserController);

export default routes;
