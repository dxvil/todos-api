import jwt from "jsonwebtoken";

export const generateToken = (id: number, email: string) => {
	const payload = {id, email};
	return jwt.sign(payload, process.env.JWT_SECRET ?? "", {expiresIn: "6h"});
};

export const checkToken = (token: string) => {
	try {
		const isVerified = jwt.verify(token, process.env.JWT_SECRET ?? "");
		
		return isVerified;
	} catch(err) {
		return {
			message: "The token is invalid"
		};
	}
};