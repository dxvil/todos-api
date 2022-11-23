import { Client } from "pg";
import app from "./app";

export const client = new Client({
	user: "postgres",
	database: "postgres",
	password: "postgres"
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS todos(
id UUID PRIMARY KEY,
name CHAR NOT NULL,
description VARCHAR(255),
user_id INT NOT NULL,
created TIMESTAMPTZ,
updated TIMESTAMPTZ,
status boolean
);`;

const dbname = "appTodo";
        
const createDatabase = async () => {
	try {
		await client.query(`DROP DATABASE IF EXISTS ${dbname};`);
		await client.query(`CREATE DATABASE ${dbname};`);
		await client.query(createTableQuery);
		return true;
	} catch (error: any) {
		console.error(error.stack);
		return false;
	} finally {
		await client.end();
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

