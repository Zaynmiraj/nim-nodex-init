// lib/installer.js
import { execa } from "execa";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function installPackages(dir, language, db, orm) {
  const common = ["express", "dotenv", "nodemon", "cors", "body-parser"];
  const dev = [];

  if (language === "TypeScript") {
    dev.push("typescript", "ts-node", "@types/node", "@types/express");
  }

  let dbDeps = [];

  if (db === "MongoDB") {
    dbDeps.push("mongoose");
  } else if (orm === "Prisma") {
    dbDeps.push(db === "MySQL" ? "mysql2" : "pg", "prisma", "@prisma/client");
  } else {
    dbDeps.push(db === "MySQL" ? "mysql2" : "pg", "sequelize", "sequelize-cli");
  }

  console.log("📦 Initializing and installing...");
  await execa("npm", ["init", "-y"], { cwd: dir, stdio: "inherit" });
  await execa("npm", ["install", ...common, ...dbDeps], {
    cwd: dir,
    stdio: "inherit",
  });

  // ✅ MODIFY package.json in the project directory
  const pkgPath = path.join(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  pkg.scripts = {
    ...pkg.scripts,
    start: "node server.js",
    dev: "nodemon server.js",
  };

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("✅ Scripts updated in package.json");

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("✅ Added start & dev scripts to package.json");

  if (dev.length) {
    await execa("npm", ["install", "-D", ...dev], {
      cwd: dir,
      stdio: "inherit",
    });
  }

  if (orm === "Prisma") {
    await execa("npx", ["prisma", "init"], { cwd: dir, stdio: "inherit" });
  }
}
