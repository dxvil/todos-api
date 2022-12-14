class UserValidator {
	validatePassword(password: string) {
		const strongPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
		const mediumPassword = new RegExp("((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))");
		
		if(strongPassword.test(password)) {
			return "strong";
		} else if(mediumPassword.test(password)) {
			return "medium";
		}
		return "weak";
	}
	validateEmail(email: "string") {
		const emailSchema = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
        
		if(emailSchema.test(email)) return true;
		return false;
	}
}

export const user = new UserValidator();