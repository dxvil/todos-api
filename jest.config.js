module.exports = {
	"preset": "ts-jest",
	"testEnvironment": "node",
	"coverageDirectory": "./coverage",
	"testMatch": [
		"**/?(*.)+(spec).ts"
	],
	"forceExit": true,
	"resetMocks": true,
	"clearMocks": true
};