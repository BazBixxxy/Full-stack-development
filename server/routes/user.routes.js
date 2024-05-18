import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoutes, getUsers);

export default router;
