const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
function initPrisma(outputDir) {
    execSync("npm install prisma @prisma/client", {
        cwd: outputDir,
        stdio: "inherit"
    });

    // Initialize Prisma
    execSync("npx prisma init", {
        cwd: outputDir,
        stdio: "inherit"
    });

    console.log("✅ Prisma initialized");

    // Generate the Prisma client after schema is created
  

    console.log("✅ Prisma client generated");
}

function executeGeneratePrismaSchemaCommand(outputDir) {
    execSync("npx prisma generate", {
        cwd: outputDir,
        stdio: "inherit"
    });
}

module.exports={
    initPrisma, executeGeneratePrismaSchemaCommand
}