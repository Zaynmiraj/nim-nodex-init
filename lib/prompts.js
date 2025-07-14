import inquirer from "inquirer";

export async function runPrompts() {
  return inquirer.prompt([
    {
      name: "projectName",
      type: "input",
      message: "Project name:",
      default: "my-app",
    },
    {
      name: "language",
      type: "list",
      message: "Use JavaScript or TypeScript?",
      choices: ["JavaScript", "TypeScript"],
    },
    {
      name: "database",
      type: "list",
      message: "Choose a database:",
      choices: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      name: "orm",
      type: "list",
      message: "Choose an ORM:",
      choices: (answers) =>
        answers.database === "MongoDB" ? ["Mongoose"] : ["Prisma", "Sequelize"],
    },
  ]);
}
