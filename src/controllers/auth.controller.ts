import { Response, Request } from "express";
import { client } from "../servers";
import { TUser } from "../types/types";
import bcrypt from "bcryptjs";
import { user } from "../models/UserValidator";
import { generateToken } from "../services/authServices";

class AuthController {
	constructor(){
		this.registration = this.registration.bind(this);
		this.login = this.login.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.checkUserIsExist = this.checkUserIsExist.bind(this);
	}
	async registration(req: Request, res: Response) {
		try {  
			const { email, password }: TUser = req.body;
			const isUserExist = await this.checkUserIsExist(email);
			if(isUserExist && "rows" in isUserExist) {
				return res.status(400).json({
					"message": "This username is already registered"
				});
			}
			if(typeof isUserExist === "string") res.status(500).json({message: "Something went wrong..."});

			const passwordCheck = this.checkPassword(password);
            
			if(passwordCheck) {
				return res.status(400).json(passwordCheck);
			}

			const emailCheck = user.validateEmail(email);

			if(!emailCheck) {
				return res.status(400).json({
					message: "Your email entered incorrectly"
				});
			}

			const created = new Date();
			const hashedPassword = bcrypt.hashSync(password, 7);
            
			await client.query(`INSERT into registeredUsers 
            (email, password, created, updated)
            VALUES ($1, $2, $3, $3)
            `, [email, hashedPassword, created]);
            
			res.json({message: "The user is registered successfully"});
		} catch(err) {
			return res.send(err);
		}
	}
	async login(req: Request, res: Response) {
		try {
			const {email, password} = req.body;

			const isUserExist = await this.checkUserIsExist(email);
			if((typeof isUserExist === "boolean") && !isUserExist) {
				return res.status(404).json({
					message: "User is not found"
				});
			}
            
			if(isUserExist && "password" in isUserExist) {
				const passwordFromDb = String(isUserExist?.password) ?? "";
				const validatePassword = bcrypt.compareSync(password, passwordFromDb);

				if(!validatePassword) {
					return res.status(400).json({
						message: "The password is wrong"
					});
				}
			}
			
			const token = generateToken(isUserExist.id, email);

			return res.json({token, user_id: isUserExist.id});
		} catch(err) {
			return res.send(err);
		}
	}
	async changePassword(req: Request, res: Response) {
		try {
			const { id, email, password } = req.body;

			const userIsExist = await this.checkUserIsExist(email);
            
			if(typeof userIsExist === "boolean" && !userIsExist) {
				return res.status(404).json({message: "User is not exist"});
			} else if(typeof userIsExist === "string") {
				return res.status(500).json({message: "Something went wrong..."});
			}

			const passwordCheck = this.checkPassword(password);
            
			if(passwordCheck) {
				return res.status(400).json(passwordCheck);
			}

			const hashedPassword = bcrypt.hashSync(password, 7);
			const updated = new Date();
            
			await client.query("UPDATE registeredUsers SET email = $2, password = $3, updated = $4 WHERE id = $1",
				[id, email, hashedPassword, updated]
			);
			return res.json({
				message: "Password is changed succesfuly"
			});
		} catch(err) {
			return res.send(err);
		}
	}
	async checkUserIsExist(email: string) {
		try {
			const user = await client.query("SELECT * FROM registeredUsers WHERE email = $1", [email]);
            
			if(user.rows[0]) {
				return user.rows[0];
			} 
			return false;
		} catch (err) {
			return "err";
		}
	}
	checkPassword(password: string) {
		const passwordCheck = user.validatePassword(password);
            
		if(passwordCheck === "weak" || passwordCheck === "medium") {
			return {
				message: `Your password is ${passwordCheck}`
			};
		}
		return null;
	}
}

export const auth = new AuthController();