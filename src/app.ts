import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import apiContentType from "./middlewares/apiContentType";
import todoRouter from "./routers/todo.router";
import authRouter from "./routers/auth.router";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();

// Express configuration
app.set("port", process.env["PORT"]);

// Global middleware
app.use(cors({
	origin: "*"
}
));
app.use(apiContentType);
app.use(express.json());

// Set up routers
app.use("/api/v1/todos", authMiddleware, todoRouter);
app.use("/api/v1/auth", authRouter);

// Custom API error handler
app.use(apiErrorHandler);

export default app;