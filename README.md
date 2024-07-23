### CRM Backend - Customer Relationship Management Application

This repository contains the backend code for a comprehensive Customer Relationship Management (CRM) application. Built with Node.js, Express.js, and MongoDB, it offers a robust suite of RESTful APIs for managing customers, interactions, purchases, and generating insightful reports.

**Features:**

- Secure user authentication and authorization with JWT and Bcrypt hashing.
- Comprehensive customer management including creation, retrieval, updates, and deletion (CRUD) operations.
- Detailed communication logs for tracking all customer interactions.
- Queries management system for handling employee inquiries.
- Powerful reporting and analytics for sales performance, lead conversion, and more.
- Granular role-based access control (RBAC) for Admin, Manager, and Employee user roles.

**API Endpoints**

The CRM application provides a comprehensive set of API endpoints for user management and data analysis:

**User Management**

- **Create User:** `(POST /user/register)` - Creates a new user account and set user role as `new`. Admin only set user role.
- **User Login:** `(POST /user/login)` - Authenticates a user with email and password.
- **Forgot Password:** `(POST /user/forgot-password)` - Initiates password reset by sending a One-Time Password (OTP) to the user's registered email address. (Admin password reset functionality is not available)
- **Reset Password:** `(POST /user/reset-password)` - Validates the OTP and email, then securely updates the user's password in the database using a hashing algorithm.
- **Retrieve All Users (Admin Only):** `(GET /user/all-users)` - Retrieves a list of all users for administrative purposes.
- **Update User Role (Admin Only):** `(PUT /user/update-role)` - Updates the user's role by an authorized admin.
- **Delete User (Admin Only):** `(DELETE /user/:email)` - Deletes a user from the database by an authorized admin.

**Customer Management**

- **Retrieve All Customers:** `(GET /customer/get-customers)` - Retrieves a list of all customers stored in the database.
- **Get Customer Details:** `(GET /customer/overview/:id)` - Retrieves detailed information about a specific customer using their unique identifier.
- **Create Customer:** `(POST /customer/create-customer)` - Creates a new customer entry in the database.
- **Update Customer Status:** `(PUT /customer/overview/update/status)` - Updates the status of a specific customer using their ID.
- **Assign Customer:**
    - `(GET /customer/overview/update/assign)` - Assigns a customer to a manager by an admin.
    - `(GET /customer/overview/update/assign)` - Assigns a customer to an employee by a manager .
- **Update Customer Details:** `(PUT /customer/overview/update/:id)` - Updates the details of a specific customer using their ID.
- **Delete Customer:** `(DELETE /customer/overview/delete/:id)` - Deletes a customer and all associated data from the database (use with caution).

**Communication Management**

- **Send Email:** `(POST /communication/send-email)` - Sends an email message to a customer.
- **Retrieve Communication History:** `(GET /communication/:userId/communications)` - Retrieves all communication records associated with a specific user (identified by user ID).

**Query Management**

- **Submit Query:** `(POST /service/add-query)` - Submits a new query for management review.
- **Retrieve All Queries:** `(GET /service/queries)` - Retrieves a list of all queries stored in the database.
- **Update Query Status:** `(PUT /service/update-query)` - Updates the status of a specific query using its ID.
- **Provide Query Solution:** `(PUT /service/query-solution)` - Provides a solution or response to a specific query.

**Installation and Setup**

**Prerequisites:**

- Node.js and npm (Node Package Manager) installed on your system.

**Instructions:**

1. **Clone the Repository:**


```
git clone https://github.com/manoje8/repo-name.git
```


2. **Install Dependencies:**


```
npm install
```


3. **Start the Development Server:**


```
npm run dev  (OR)
npm start
```


The server will start on port `3000` by default. You can access the application endpoints in your web browser.

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