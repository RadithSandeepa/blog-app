import express from "express";
import { deleteUser, getUser, updatePassword, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
router.delete("/", deleteUser);
router.put("/", updateUser);
router.put("/changepassword", updatePassword);

export default router;