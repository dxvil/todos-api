import express from "express";
import { auth } from "../controllers/auth.controller";
const { registration, login, changePassword } = auth;
const router = express.Router();

router.post("/signup", registration);
router.post("/signin", login);
router.put("/changePassword", changePassword);

export default router;