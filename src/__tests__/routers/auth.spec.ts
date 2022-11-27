import request from "supertest";
import { user } from "../../models/UserValidator";
import createServer from "../../util/server";
let testServer: any;

beforeAll(() => {
	testServer = createServer();
});

describe("validation functions", () => {
	it("email",() => {
		expect(user.validateEmail("test")).toBe(false);
	});

	it("right email",() => {
		expect(user.validateEmail("test@email.com")).toBe(true);
	});

	it("weak password",() => {
		expect(user.validatePassword("12345")).toBe("weak");
	});

	it("strong password",() => {
		expect(user.validatePassword("53CTa8J@ZYIl")).toBe("strong");
	});
});

describe("/api/v1/auth/signup", () => {
	it("weak password in request", async () => {
		await request(testServer)
			.post("/api/v1/auth/signup")
			.send({email: "test@gmail.com", password: "12345"})
			.expect("Content-Type", /json/)
			.expect({ message: "Your password is weak" })
			.expect(400);
	});

	it("wrong email format", async () => {
		await request(testServer)
			.post("/api/v1/auth/signup")
			.send({email: "test", password: "53CTa8J@ZYIl"})
			.expect("Content-Type", /json/)
			.expect({ message: "Your email entered incorrectly" });
	});
	
	it("register new user", async () => {
		await request(testServer)
			.post("/api/v1/auth/signup")
			.send({email: "test@gmail.com", password: "53CTa8J@ZYIl"})
			.expect("Content-Type", /json/)
			.expect(200)
			.expect({ message: "The user is registered successfully" });
	});

	it("register the same user twice", async () => {
		request(testServer)
			.post("/api/v1/auth/signup")
			.send({email: "test@gmail.com", password: "53CTa8J@ZYIl"})
			.expect("Content-Type", /json/)
			.expect({ message: "This username is already registered" })
			.expect(400);
	});
});

describe("/api/v1/auth/signn", () => {
	it("sign in", async () => {
		request(testServer)
			.post("/api/v1/auth/signin")
			.send({email: "test@gmail.com", password: "53CTa8J@ZYIl"})
			.expect("Content-Type", /json/)
			.expect(200);
	});
	it("user not found", async () => {
		request(testServer)
			.post("/api/v1/auth/signin")
			.send({email: "teerrrest@gmail.com", password: "53CTa8J@ZYIl"})
			.expect("Content-Type", /json/)
			.expect({
				message: "User is not found"
			})
			.expect(404);
	});
	it("password failed", async () => {
		request(testServer)
			.post("/api/v1/auth/signin")
			.send({email: "test@gmail.com", password: "53CT3434a8J@ZYIl"})
			.expect("Content-Type", /json/)
			.expect({
				message: "The password is wrong"
			})
			.expect(400);
	});
});