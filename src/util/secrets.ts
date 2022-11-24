import dotenv from "dotenv";
import fs from "fs";

import logger from "./logger";

if (fs.existsSync(".env")) {
	logger.debug("Using .env file to supply config environment variables");
	dotenv.config({ path: ".env" });
} else {
	logger.debug("Using .env.example file to supply config environment variables");
}

export const ENVIRONMENT = process.env.NODE_ENV;

export const JWT_SECRET = process.env["JWT_SECRET"] as string;

if (!JWT_SECRET) {
	logger.error("No client secret. Set JWT_SECRET environment variable.");
	process.exit(1);
}