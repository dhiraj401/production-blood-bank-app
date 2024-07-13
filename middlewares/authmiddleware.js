import jwt from "jsonwebtoken";

const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decoded.userId;
        next(); // Proceed to the next middleware or route handler
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export default authmiddleware;
