import { Request, Response, NextFunction } from "express";
import { TodosDocument } from "../types/types";
import { client } from "../servers";

class TodoController {
	requiredFields: string[];
	constructor() {
		this.requiredFields = ["name", "description", "user_id"];
		this.createTodo = this.createTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.findTodoById = this.findTodoById.bind(this);
		this.findAllTodos = this.findAllTodos.bind(this);
	}
	checkRequired (data: TodosDocument) {
		const requiredError: string[] = [];

		this.requiredFields.every((value: string) => {
			if(value in data) return;
			requiredError.push(value);
		});

		return requiredError;
	}
	async createTodo (req: Request, res: Response, next: NextFunction) {
		try {
			let { status }: TodosDocument = req.body;
			const { name, description, user_id }: TodosDocument = req.body;
			const requiredError = this.checkRequired(req.body);
			
			if(requiredError.length > 0) {
				res.json({
					required: requiredError,
					message: "Required fields is missing"
				});
				next();
			}
		
			const created = new Date();
			status = status ? status : false;

			const newTodo = await client.query(`INSERT INTO todos 
			(name, description, status, user_id , created, updated)
			values ($1, $2, $3, $4, $5, $6) RETURNING *`, 
			[name, description, status, user_id, created, created]);

			res.json(newTodo.rows[0]);
		} catch(err){
			res.json(err);
		}
	}
	async updateTodo(req: Request,res: Response){
		try {
			const { id } = req.params;
			const { name, description, status }: TodosDocument = req.body;

			const updated = new Date();

			const todo = await client.query("SELECT * FROM todos WHERE id = $1", [id]);
			const prevTodoData = todo.rows[0];
			
			await client.query(`UPDATE todos SET 
			name = $2, description = $3, status = $4, updated = $5,
			created = $6, user_id = $7
			WHERE id = $1`,
			[
				id, 
				name ?? prevTodoData.name, 
				description ?? prevTodoData.description, 
				status ?? prevTodoData.status,
				updated,
				prevTodoData.created,
				prevTodoData.user_id
			]);
			
			res.json({
				updated: "ok"
			});
		} catch(err) {
			res.json(err);
		}
	}
	async deleteTodo(req: Request,res: Response) {
		try {
			const { id } = req.params;

			await client.query("DELETE from todos WHERE id = $1", [id]);

			res.json({
				deleted: "ok"
			});
		} catch(err) {
			res.json(err);
		}
	}
	async findTodoById(req: Request,res: Response){
		try {
			const { id } = req.params;
			const todo = await client.query("SELECT * FROM todos WHERE id = $1", [id]);

			if(todo.rows.length === 0) {
				res.status(404).json({message: "Item not Found"});
			}

			res.json(todo.rows[0]);
		} catch(err) {
			res.json(err);
		}
	}
	async findAllTodos(req: Request,res: Response){
		try {
			const { status, id } = req.query;
			const withStatus = status ? "status = $2": "";
			const withId = id ? "WHERE user_id = $1": "";
			
			const queryWithId = `SELECT * FROM todos ${withId}`;
			const queryWithStatus = `SELECT * FROM todos ${withId} AND ${withStatus}`;

			if(!id) {
				res.status(400).json({message: "id is required"});
			}
			
			const todos = id && status ? await client.query(queryWithStatus, [id, status]) 
				: await client.query(queryWithId, [id]);
			
			res.json(todos.rows);
		} catch(err) {
			res.json(err);
		}
	}
}

export const todos = new TodoController();