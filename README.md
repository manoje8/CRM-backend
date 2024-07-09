## CRM

This repository contains the backend code for the CRM (Customer Relationship Management) application. The backend is built using Node.js, Express.js, and MongoDB, providing RESTful APIs for managing customers, communications, purchases, and generating reports.

## Features

- User authentication and authorization using JWT and Bcrypt
- Customer management (CRUD operations)
- Communication logs for tracking interactions with customers
- Purchase management
- Reporting and analytics on sales performance, lead conversion, etc.
- Role-based access control for different user roles (Admin, Customer)

### Installation and Setup

**Prerequisites:**

- Node.js
- npm (Node Package Manager)

**Instructions:**

1. Clone the repository:

```
git clone https://github.com/manoje8/repo-name.git
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev  (OR)
npm start
```

The server will start on port `3000` by default. You can access the application routes in your browser.

### Technologies Used

- Node.js: JavaScript runtime environment for server-side applications.
- Express.js: Web application framework for Node.js.
- Mongoose: Object Data Modeling (ODM) library for MongoDB.
- bcrypt: Secure password hashing library.
- cors: Enables Cross-Origin Resource Sharing (CORS) for API requests.
- dotenv: Loads environment variables from a `.env` file.
- jsonwebtoken: JSON Web Token library for secure authentication.
- nodemailer: Library for sending email messages.
- nodemon: Development utility that restarts the server automatically on code changes.
- morgan: HTTP request logger middleware for debugging purposes.