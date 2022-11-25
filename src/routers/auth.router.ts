import express from "express";
import { auth } from "../controllers/auth.controller";
const { registration, login, changePassword } = auth;
const router = express.Router();
/**
   * @openapi
   * /api/v1/auth/signup:
   *  post:
   *     tags:
   *     - Registration
   *     description: Creates a new user with email and password
   *     responses:
   *       200:
   *         description: The user is created
   */
router.post("/signup", registration);
/**
   * @openapi
   * /api/v1/auth/signin:
   *  post:
   *     tags:
   *     - Login
   *     description: Login with email and password
   *     responses:
   *       200:
   *         description: Return a jwt token
   */
router.post("/signin", login);
/**
   * @openapi
   * /api/v1/auth/changePassword:
   *  put:
   *     tags:
   *     - Change a password
   *     responses:
   *       200:
   *         description: password is changed
   */
router.put("/changePassword", changePassword);

export default router;