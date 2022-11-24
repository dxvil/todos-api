import express from "express";
import { todos } from "../controllers/todo.controller";
const { findAllTodos, findTodoById, updateTodo, deleteTodo, createTodo } = todos;
const router = express.Router();

// Every path we define here will get /api/v1/todos prefix

router.get("/", findAllTodos);
router.get("/:id", findTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.post("/", createTodo);

export default router;