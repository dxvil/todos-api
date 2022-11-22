import express from "express";
import { createTodo, deleteTodo, findAllTodos, findTodoById, updateTodo } from "../controllers/todo.controller";

const router = express.Router();

// Every path we define here will get /api/v1/todos prefix

router.get("/", findAllTodos);
router.get("/:movieId", findTodoById);
router.put("/:movieId", updateTodo);
router.delete("/:movieId", deleteTodo);
router.post("/", createTodo);

export default router;