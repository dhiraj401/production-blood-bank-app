import { User } from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    // Ensure userId is provided in the request body
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists and if their role is 'admin'
    if (!user || user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      });
    }

    // If the user is an admin, proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};

export default adminMiddleware;
