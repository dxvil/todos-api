import { Client } from "pg";
import app from "./app";

export const client = new Client({
	user: "postgres",
	database: "postgres",
	password: "postgres",
	host: "localhost",
	port: 5432,
});

const dropTableTodosQuery = "DROP TABLE IF EXISTS todos;";
const dropTableUsersQuery = "DROP TABLE IF EXISTS registeredUsers;";

const createTableTodosQuery = `CREATE TABLE IF NOT EXISTS todos(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	user_id SERIAL,
	created TIMESTAMPTZ,
	updated TIMESTAMPTZ,
	status boolean,
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES registeredUsers (id)
	);`;
	
const createTableUsersQuery = `CREATE TABLE IF NOT EXISTS registeredUsers(
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(150) NOT NULL,
	created TIMESTAMPTZ,
	updated TIMESTAMPTZ
	);`;
        
const createDatabase = async () => {
	try {
		await client.query(dropTableTodosQuery);
		await client.query(dropTableUsersQuery);
		await client.query(createTableUsersQuery);
		await client.query(createTableTodosQuery);
		return true;
	} catch (error: any) {
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

