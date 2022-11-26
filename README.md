# Todos REST API

 #### Requirements:
 #### Installed [Docker](https://www.docker.com/get-started/) and [Node](https://nodejs.org/en/download/)
 
## Setup with Docker 
```sh
git clone git@github.com:dxvil/todos-api.git
sudo docker-compose build
sudo docker-compose up
```
Or: 
```sh 
git clone git@github.com:dxvil/todos-api.git
npm install
npm run build
```

Then go to swagger and try to register a new user; then login, get a jwt token in success case of login. Pass a token in Authorization of SwaggerUI like: ```Bearer token```

## [Swagger](http://localhost:9999/docs/)

### Tech stack

- Language: TypeScript
- Framework: ExpressJS
- Database: PostgreSQL

### Core features

Develop a backend application that exposes a set of REST APIs for the following endpoints:
- POST /api/v1/signup: Sign up as an user of the system, using email & password
- POST /api/v1/signin: Sign in using email & password. The system will return the JWT token that can be used to call the APIs that follow
- PUT /api/v1/changePassword: Change user’s password
- GET /api/v1/todos?status=[status]: Get a list of todo items. Optionally, a status query param can be included to return only items of specific status. If not present, return all items
- POST /api/v1/todos: Create a new todo item
- PUT /api/v1/todos/:id: Update a todo item
- DELETE /api/v1/todos/:id: Delete a todo item
