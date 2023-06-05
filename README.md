# Task Management API

This is a RESTful API for managing tasks. It allows users to create, read, update, and delete tasks. The API also includes authentication and authorization mechanisms to secure the endpoints.

## Features

- User Authentication: Supports user registration and authentication using JSON Web Tokens (JWT). Users can sign up, log in, and receive a token for subsequent API requests.
- Task CRUD Operations: Provides APIs for creating, retrieving, updating, and deleting tasks.
- Task Filtering and Sorting: Includes endpoints to filter and sort tasks based on various criteria, such as status, priority, due date, or assignee.
- User Roles and Permissions: Implements role-based authorization, allowing different users to have different levels of access and permissions to tasks.
- User Profile: Provides APIs for users to view and update their profiles, including features like changing passwords or updating personal information.
- Error Handling and Validation: Properly handles errors and validates request data to ensure data integrity.
- Pagination and Limiting: Supports pagination to limit the number of tasks returned per request and enables users to navigate through larger sets of data.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt.js (for password hashing)
- Other necessary dependencies (body-parser, dotenv, etc.)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/task-management-api.git
   ```
2. Install the dependencies:
```shell
cd task-management-api
npm install
```
3. Set up environment variables:

Create a .env file in the root directory and provide the following variables:

```dotenv
PORT=3000
MONGODB_URI=mongodb://localhost/taskmanagerdb
JWT_SECRET=your_jwt_secret
```
4. Start the server:

```shell
npm start
```
The server will start running on http://localhost:3000.
