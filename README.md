# 🔧 Instant Backend Generator (Auto CRUD API Builder)

This project generates a complete Express.js backend (with Prisma ORM) from a simple JSON schema.

**Give it a model structure, and it gives you:**

- ✅ Auto-generated REST API endpoints
- ✅ Controllers, Managers, and DAL (Data Access Layer)
- ✅ Prisma schema and client setup
- ✅ Ready-to-run Express server

---

## 📦 Features

- 🧠 Smart code generation based on model schema
- 🔁 Endpoints like:
  - `POST /<model>/create`
  - `GET /<model>/findBy<field>`
  - `PUT /<model>/update`
  - `DELETE /<model>/delete`
- ⚙️ Prisma ORM with SQLite (default) setup
- 📂 Clean file structure



---

## 🚀 How to Use

### 1. 📁 Define Your Schema

In `schema.json` (or any file), use the following format:

```json
{
"models": [
  {
    "User": {
      "name": { "type": "string", "optional": false },
      "email": { "type": "string", "optional": false },
      "age": { "type": "number", "optional": true },
      "isActive": { "type": "boolean", "optional": false }
    }
  }
]
}
```

## 🛠️ Run the Generator
```js
node index.js path/to/schema.json
```
This will create a new generated-backend/ folder with everything set up.

## ▶️ Start the Server
```js
cd generated-backend
node server.js

```
Your API is now running! Try:
```bash
curl http://localhost:3000/user/findByName?name=Alice
```

## 🧩 Tech Stack
- Node.js
- Express.js
- Prisma ORM
- SQLite (default, but can be customized)
- File system-based code generation

## 📌 To-Do / Improvements
 - Add validation using Zod or Joi
 - Add relationship support in Prisma schema
 - Auto-generate Swagger/OpenAPI docs
 - Add support for other databases (PostgreSQL, MySQL)
 - Auto Generate testing scripts
 - Auto Generate Complex logics

## Built by Sanjay Kumar with ❤️ for fast MVP development and learning Prisma internals.
