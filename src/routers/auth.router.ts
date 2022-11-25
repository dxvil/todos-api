import express from "express";
import { auth } from "../controllers/auth.controller";
const { registration, login, changePassword } = auth;
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Registation:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *           description: should be a strong password minlen(8), uppercase chars etc
 *       example:
 *         email: dsfn@mail.ru
 *         password: "{F5#5m'm#^q`nhy2323"
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Returns a success message or error
 *     tags: [Registation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registation'
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               message:
 *                "The user is registered successfully"
 */


router.post("/signup", registration);

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Returns an object with jwt token and user id
 *     tags: [Registation]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Registation'
 *     responses:
 *       200:
 *         description: Returns an object with jwt token and user id
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *               token: "string"
 *               user_id: "number"
 *       404:
 *         description: The user was not found
 */

router.post("/signin", login);
/**
   * @openapi
   * /api/v1/auth/changePassword:
   *  put:
   *     tags: [Registation]
   *     requestBody:
   *         required: true
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Registation'
   *     responses:
   *       200:
   *         description: password is changed
   */
router.put("/changePassword", changePassword);

export default router;