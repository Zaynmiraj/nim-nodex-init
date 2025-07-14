# 🚀 nim-nodex-init

**`nim-nodex-init`** is a powerful CLI tool that scaffolds a complete Node.js & Express.js app with your preferred database, ORM, authentication system, and organized folder structure — all in seconds.

---

## ⚙️ What It Does

When you run:

```bash
npx nim-nodex-init
```

It guides you through an interactive setup to:

- 🏷️ Set project name
- 💻 Choose language: JavaScript or TypeScript
- 🛢️ Select a database: MongoDB, MySQL, PostgreSQL, or SQLite
- 🔌 If SQL, choose ORM: Sequelize or Prisma
- ⚙️ Automatically install dependencies
- 📁 Generate a fully structured Express project:
  - DB configuration
  - Environment setup
  - Clean project architecture

---

## 🧠 Why Use nim-nodex-init?

- No need to manually configure Express, database, routes, controllers, or middleware.
- Great for quickly bootstrapping REST APIs.
- Flexible with JS or TS.
- Includes modern best practices: JWT, bcrypt, input validation.

---

## 🛠️ Tech Stack

- **Node.js**
- **Inquirer.js** — CLI prompts
- **Chalk** — Terminal output styling
- **Execa** — Shell command execution
- **fs / path** — File generation
- **dotenv** — Environment management

---

## 💡 How It Works

When you run the command, `nim-nodex-init` will:

1. Prompt for:
   - Project name
   - Language: JavaScript or TypeScript
   - Database (MongoDB, MySQL, PostgreSQL, SQLite)
   - ORM (Sequelize or Prisma)
2. Create a project folder with:
   - Configured `server.js` or `server.ts`
   - Connected `.env` file
   - Installed dependencies
   - JWT auth (register & login)
   - Folder structure: routes, models, controllers, config
3. Add sample user model and controller
4. Set up static `public` directory

---

## ✨ Example CLI Interaction

```bash
$ npx nim-nodex-init

🛠️  Welcome to nim-nodex-init!

✔ Project name: my-api
✔ Use JavaScript or TypeScript? → JavaScript
✔ Choose a database → MySQL
✔ Choose ORM → Sequelize
✔ Add register/login logic with real hashing? → Yes

📦 Installing packages...
📁 Creating folders and boilerplate...
✅ Setup complete!
👉 cd my-api
👉 npm run dev
```

---

## 📂 Generated Project Structure

```bash
your-project/
├── server.js                 # Entry point
├── .env                      # Environment variables (DB_URI, PORT, BASE_URL)
├── public/                   # Static assets
├── config/
│   └── db.js                 # Database connection logic
├── routes/
│   └── AuthRoute.js          # /auth routes
├── controllers/
│   └── AuthController.js     # Register & Login logic
├── models/
│   └── User.js               # User model based on DB/ORM
├── package.json              # Scripts and metadata
```

---

## 🔐 Auth Features

Includes:

- `/auth/register` — Create new user with hashed password
- `/auth/login` — Authenticate user and return JWT

---

## 🧪 Scripts

```bash
npm start        # Run app with node
npm run dev      # Run app with nodemon (auto-reloads)
```

---

## 📝 Environment File (.env)

```env
PORT=5000
BASE_URL=http://localhost:5000
DB_URI=mysql://username:password@localhost/dbname
JWT_SECRET=your_jwt_secret_here
```

---

## 🧠 Future Improvements

- Add CLI flags for non-interactive usage
- Optional frontend boilerplate integration
- Testing setup with Jest or Vitest
- Docker support

---

## 📦 Contributing

Feel free to fork, improve, and make PRs — your contributions are welcome!

---

## 🙏 Credits

Built by **ZaYn Miraj**  
CLI Creator: [@zaynmiraj](https://www.zaynmiraj.com)

## 🏁 License

MIT © 2025 [Zayn Miraj](https://github.com/zaynmiraj)
