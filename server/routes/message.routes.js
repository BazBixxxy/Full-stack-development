import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoutes from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/send/:id", protectRoutes, sendMessage);
router.get("/:id", protectRoutes, getMessages);

export default router;
