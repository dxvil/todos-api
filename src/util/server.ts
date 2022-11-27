import cors from "cors";
import express from "express";
import { AuthController } from "../controllers/auth.controller";
import apiContentType from "../middlewares/apiContentType";

function createServer() {
	const auth = new AuthController();
	const app = express();
	app.set("port", 3333);
	app.use(express.json());
	// Global middleware
	app.use(cors({
		origin: "*"
	}
	));
	app.use(apiContentType);

	app.post("/api/v1/auth/signup", auth.registration);
	app.post("/api/v1/auth/signin", auth.login);
	app.put("/api/v1/auth/changePassword", auth.changePassword);

	return app;
}

export default createServer;