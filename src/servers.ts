import { Client, Pool } from "pg";
import app from "./app";

export const client = new Client({
	user: "postgres",
	database: "postgres",
	password: "postgres",
	host: "localhost",
	port: 5432,
});

export const pool = new Pool({
	user: "postgres",
	database: "postgres",
	password: "postgres",
	host: "localhost",
	port: 5432
});

const dropTableQuery = "DROP TABLE IF EXISTS todos;";
const createTableQuery = `CREATE TABLE IF NOT EXISTS todos(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description VARCHAR(255),
user_id INTEGER,
created TIMESTAMPTZ,
updated TIMESTAMPTZ,
status boolean
);`;

        
const createDatabase = async () => {
	try {
		await client.query(dropTableQuery);
		await client.query(createTableQuery);
		return true;
	} catch (error: any) {
		console.error(error.stack);
		return false;
	}
};

client.connect((err: any) => {
	if (err) {
		console.error("connection error", err.stack);
	} else {
		app.listen(app.get("port"), () => {
			createDatabase()
				.then((result) => {
					if (result) {
						console.log("Database created", result);
					}
				});
		});
	}
});

