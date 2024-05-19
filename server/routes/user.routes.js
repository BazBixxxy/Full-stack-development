import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import { getUsers, updateUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoutes, getUsers);
router.put("/update/:id", updateUsers);

export default router;
