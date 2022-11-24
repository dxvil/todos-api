import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import apiContentType from "./middlewares/apiContentType";
import todoRouter from "./routers/todo.router";

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
app.use("/api/v1/todos", todoRouter);

// Custom API error handler
app.use(apiErrorHandler);

export default app;