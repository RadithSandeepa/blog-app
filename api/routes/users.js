import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
router.delete("/", deleteUser);
router.put("/", updateUser);

export default router;