import fs from "fs";
import path from "path";

export function writeFilesAndFolders(projectPath, { language, database, orm }) {
  const ext = language === "TypeScript" ? "ts" : "js";

  // Create folders
  ["config", "routes", "controllers", "models", "public"].forEach((dir) => {
    fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
  });

  // .env
  const env = `PORT=5000\nDB_URI=your_${database.toLowerCase()}_uri_here\nBASE_URL=http://localhost:5000\n\n#JWT secret key\nJWT_SECRET=your_secret_key_here\n\n    # Client URL\nCLIENT_URL=http://localhost:3000\n #SMTP\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=587\nSMTP_USER=your_email\nSMTP_PASSWORD=your_password\n\n`;
  fs.writeFileSync(path.join(projectPath, ".env"), env);

  // server.js / server.ts
  const serverCode = getServerCode(ext);
  fs.writeFileSync(path.join(projectPath, `server.${ext}`), serverCode);

  // config/db.js / db.ts
  const dbCode = getDbCode(database, orm, ext);
  fs.writeFileSync(path.join(projectPath, `config/db.${ext}`), dbCode);

  // routes/AuthRoute.js
  const routeCode = getRouteCode(ext);
  fs.writeFileSync(
    path.join(projectPath, `routes/AuthRoute.${ext}`),
    routeCode
  );

  // controllers/AuthController.js
  const controllerCode = getControllerCode(ext);
  fs.writeFileSync(
    path.join(projectPath, `controllers/AuthController.${ext}`),
    controllerCode
  );

  // models/User.js (based on db + orm)
  const modelCode = getUserModelCode(database, orm, ext);
  fs.writeFileSync(path.join(projectPath, `models/User.${ext}`), modelCode);
}

function getServerCode(ext) {
  return `import express from 'express';\nimport dotenv from 'dotenv';\nimport cors from 'cors';\nimport bodyParser from 'body-parser';\nimport connectDB from './config/db.${ext}';\nimport AuthRoute from './routes/AuthRoute.${ext}';\nimport path from 'path';\nimport { fileURLToPath } from 'url';\n\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\n\ndotenv.config();\nconst app = express();\nconnectDB(); \n\napp.use(cors()); \napp.use(bodyParser.json()); \n\napp.use(express.json());\napp.use('/auth', AuthRoute);\napp.use('/public', express.static(path.join(__dirname, 'public')));\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));\n`;
}

function getDbCode(database, orm, ext) {
  if (database === "MongoDB") {
    return `import dotenv from 'dotenv';\nimport mongoose from 'mongoose';\n\ndotenv.config();\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.DB_URI);\n    console.log('MongoDB connected');\n  } catch (error) {\n    console.error('MongoDB connection failed:', error);\n    process.exit(1);\n  }\n};\n\nexport default connectDB;\n`;
  }

  if (orm === "Prisma") {
    return `import dotenv from 'dotenv';\nimport { PrismaClient } from '@prisma/client';\n\ndotenv.config();\n\nconst prisma = new PrismaClient();\n\nconst connectDB = async () => {\n  try {\n    await prisma.\$connect();\n    console.log('${database} connected with Prisma');\n  } catch (error) {\n    console.error('Prisma connection failed:', error);\n  }\n};\n\nexport default connectDB;\n`;
  }

  return `import { Sequelize } from 'sequelize';\n\n import dotenv from 'dotenv';\ndotenv.config();\n\n const sequelize = new Sequelize(process.env.DB_URI, {\n  dialect: '${database.toLowerCase()}'\n});\n\nconst connectDB = async () => {\n  try {\n    await sequelize.authenticate();\n    console.log('${database} connected with Sequelize');\n  } catch (error) {\n    console.error('Sequelize connection failed:', error);\n  }\n};\n\nexport default connectDB;\n`;
}

function getRouteCode(ext) {
  return `import express from 'express';\nimport { login } from '../controllers/AuthController.${ext}';\n\nconst router = express.Router();\n\nrouter.post('/login', login);\n\nexport default router;\n`;
}

function getControllerCode(ext) {
  return `export const login = (req, res) => {\n  res.send('Login route works!');\n};\n`;
}

function getUserModelCode(database, orm, ext) {
  if (database === "MongoDB") {
    return `import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  name: String,\n  email: String,\n  password: String\n});\n\nexport default mongoose.model('User', userSchema);\n`;
  }

  if (orm === "Prisma") {
    return `// Define your user model in schema.prisma\n// Then run: npx prisma migrate dev\n\n// model User {\n//   id       Int    @id @default(autoincrement())\n//   name     String\n//   email    String @unique\n//   password String\n// }`;
  }

  return `import { DataTypes } from 'sequelize';\nimport sequelize from '../config/db.${ext}';\n\nconst User = sequelize.define('User', {\n  name: { type: DataTypes.STRING },\n  email: { type: DataTypes.STRING, unique: true },\n  password: { type: DataTypes.STRING }\n});\n\nexport default User;\n`;
}
