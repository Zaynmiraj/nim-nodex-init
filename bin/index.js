#!/usr/bin/env node
import inquirer from "inquirer";
import { setupProject } from "../lib/setup.js";

console.log("🛠️  Welcome to nodex-init!");

const answers = await inquirer.prompt([
  { type: "input", name: "projectName", message: "Project name:" },
  {
    type: "list",
    name: "language",
    message: "Use JavaScript or TypeScript?",
    choices: ["JavaScript", "TypeScript"],
  },
  {
    type: "list",
    name: "database",
    message: "Choose a database:",
    choices: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    type: "list",
    name: "orm",
    message: "Choose an ORM:",
    choices: (answers) => {
      return answers.database === "MongoDB"
        ? ["Mongoose"]
        : ["Sequelize", "Prisma"];
    },
  },
]);

await setupProject(answers);
console.log("✅ Project setup complete!");
console.log("🚀Edit your .env file with your database credentials");
console.log("🚀 Run 'npm start dev' to start the server");
