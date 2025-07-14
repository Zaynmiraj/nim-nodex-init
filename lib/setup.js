// lib/setup.js
import path from "path";
import { mkdirSync } from "fs";
import { installPackages } from "./installer.js";
import { writeFilesAndFolders } from "./writer.js";

export async function setupProject(answers) {
  const { projectName } = answers;
  const projectPath = path.join(process.cwd(), projectName);

  mkdirSync(projectPath, { recursive: true });
  writeFilesAndFolders(projectPath, answers);
  await installPackages(
    projectPath,
    answers.language,
    answers.database,
    answers.orm
  );
}
