import express from "express";
import { todos } from "../controllers/todo.controller";
const { findAllTodos, findTodoById, updateTodo, deleteTodo, createTodo } = todos;
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - name
 *         - user_id
 *       properties:
 *         name:
 *           type: string
 *         user_id:
 *           type: number
 *           description: should be get after success signin
 *         description:
 *           type: string
 *         status:
 *           type: enum
 *           oneOf: ['NotStarted', 'OnGoing', 'Completed']
 *       example:
 *         name: todo 1
 *         user_id: 1
 *         status: NotStarted
 */


/**
 * @swagger
 * /api/v1/todos/:
 *   get:
 *     summary: Returns a list of todos for user
 *     security: 
 *       - Authorization: []
 *     tags: [Todos]
 *     parameters:
 *     - in: query
 *       name: id
 *       schema:
 *         type: string
 *     - in: query
 *       name: status
 *       schema:
 *         type: string
 *       description: "Choose one of NotStarted, OnGoing, Completed"
 *     responses:
 *       200:
 *         description: A list of todos or empty list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */

router.get("/", findAllTodos);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   get:
 *     summary: Returns a single todo by id
 *     security: 
 *       - Authorization: []
 *     tags: [Todos]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *     responses:
 *       200:
 *         description: A single todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */

router.get("/:id", findTodoById);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   put:
 *     summary: Changes a single todo by id
 *     security: 
 *       - Authorization: []
 *     tags: [Todos]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Successfully changed
 */

router.put("/:id", updateTodo);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   delete:
 *     summary: Deletes a todo
 *     security: 
 *       - Authorization: []
 *     tags: [Todos]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *     responses:
 *       200:
 *         description: Successfylly deleted a todo
 */

router.delete("/:id", deleteTodo);

/**
 * @swagger
 * /api/v1/todos/:
 *   post:
 *     summary: Creates a new todo
 *     security: 
 *       - Authorization: []
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: A created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post("/", createTodo);

export default router;