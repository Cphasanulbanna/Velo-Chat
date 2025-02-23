import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersList,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersList);
router.get("/:id", protectRoute, getMessages);

export default router;
