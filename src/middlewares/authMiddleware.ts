import { Request, Response, NextFunction } from "express";
import { checkToken } from "../services/authServices";

export const authMiddleware = (req: Request, res: Response , next: NextFunction) => {
	if(req.method === "OPTIONS") {
		next();
	}

	try { 
		const token = req.headers.authorization?.split(" ")[1] ?? "";

		if(!token) {
			return res.status(403).json({message: "Unauthorized"});
		}
        
		const isVerified = checkToken(token);

		if("user" in req) {
			req["user"] = isVerified;
		}
        
		next();
	} catch(err) {
		return res.status(403).json(err);
	}
};