# 📝 To-Do List Website

REST API for to-do list website with JWT authentication, task CRUD, and input validation features using middleware.

## 🔧 Key Features:
- User registration & login with *JWT authentication*
- *Bcrypt* for secure password hashing
- Full *CRUD operations* for tasks (Create, Read, Update, Delete)
- *Middleware* for route protection and error handling
- *Environment configuration* using dotenv
- *RESTful API* architecture
- API tested with *Postman*

## 💻 Tech Stack
- Programming language: TypeScript
- Framework: Express.js
- Database: PostgreSQL via NeonDB
- Tools: Postman, Beekeeper Studio, Docker

## How to run the project locally
1. Clone this repository, then open the folder in VSCode
2. Install dependencies with `npm install` on the Terminal/CLI
3. Create a .env file in the root directory, use .env.example file as a reference
4. Get the connection string URL with NeonDB, here's the tutorial: 'https://neon.tech/docs/get-started-with-neon/connect-neon'. Put the connection string in process.env.POSTGRES_CONNECTION_STRING variable. 🛑 Do NOT push your .env file to GitHub. Make sure .env is included in your .gitignore
5. Open Beekeeper Studio to make a connection with the database. Here are the steps:
   - Click the "+ New Connection" button, then choose "Postgres"
   - Copy the connection string URL from process.env.POSTGRES_CONNECTION_STRING variable
   - Click the "Import from URL" on the right corner, then paste the connection string URL
   - Click "Test" button, then "Connect" button
   - Fill the "user_privileges" table manually with:
     - id: 1
     - name: user
     - description: *optional
     - created_at: NOW()
     - updated_at: NOW()
6. Run the project with `npm run dev` on the Terminal/CLI
7. Access "localhost:3000" in any browser
