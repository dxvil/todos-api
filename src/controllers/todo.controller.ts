import { Request, Response, NextFunction } from "express";

export const findAllTodos = async (req: Request,res: Response, next: NextFunction) => {
	await "start";
};

export const findTodoById = async (req: Request,res: Response, next: NextFunction) => {
	await "find";
};

export const updateTodo = async (req: Request,res: Response, next: NextFunction) => {
	await "update";
};

export const deleteTodo = async (req: Request,res: Response, next: NextFunction) => {
	await "delete";
};

export const createTodo = async (req: Request,res: Response, next: NextFunction) => {
	await "create";
};