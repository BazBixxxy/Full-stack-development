import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json("unauthorized access, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json("access denied, invalid token");

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json("user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export default protectRoutes;
