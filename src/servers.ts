import { Client } from "pg";
import app from "./app";
import swaggerDocs from "./util/swagger";

export const client = new Client({
	user: "postgres",
	database: "postgres",
	password: "postgres",
	host: "localhost",
	port: 5432,
});
const status = "CREATE TYPE statusEnum AS ENUM ('NotStarted', 'OnGoing', 'Completed');";
const dropStatus = "DROP TYPE IF EXISTS statusEnum";

const dropTableTodosQuery = "DROP TABLE IF EXISTS todos;";
const dropTableUsersQuery = "DROP TABLE IF EXISTS registeredUsers;";

const createTableTodosQuery = `CREATE TABLE IF NOT EXISTS todos(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	user_id SERIAL NOT NULL,
	created TIMESTAMPTZ,
	updated TIMESTAMPTZ,
	status statusEnum,
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
		await client.query(dropStatus);
		await client.query(createTableUsersQuery);
		await client.query(status);
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
				})
				.catch((err) => {
					console.log(err);
				});
			swaggerDocs(app, app.get("port"));
		});
	}
});

