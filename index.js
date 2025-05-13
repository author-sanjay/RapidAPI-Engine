const fs = require("fs");
const path = require("path");
const { createProjectStructure } = require("./Init/initProjectStructure");
const { createServerFile } = require("./Init/serverFileGenerator");
const { initNpm } = require("./Init/initNpm");
const { initPrisma, executeGeneratePrismaSchemaCommand } = require("./Init/initPrisma");
const { generatePrismaSchema } = require("./Prisma/DefineModels");
const { generateControllerForModel } = require("./GenerateLogic/ControllerGenerator");
const { generateManagerForModel } = require("./GenerateLogic/ManagerGenerator");
const { generateDalFile } = require("./GenerateLogic/DalFunctions");

// Step 1: Create folders



// Step 3: Run `npm init -y`

// Main generator entry point
function generateBackend(schemaPath, outputDir = "generated-backend") {
    const absoluteSchemaPath = path.resolve(schemaPath);
    const raw = fs.readFileSync(absoluteSchemaPath, "utf8");
    const schema = JSON.parse(raw);

    console.log("✅ Loaded schema.json");
    createProjectStructure(outputDir);
    createServerFile(outputDir);
    initNpm(outputDir);
    initPrisma(outputDir);
    generatePrismaSchema(schema.models, outputDir)
    executeGeneratePrismaSchemaCommand(outputDir)
   

    schema.models.forEach((modelObj) => {
        const controllerCode = generateControllerForModel(modelObj);
        const managerCode = generateManagerForModel(modelObj);

        const modelName = Object.keys(modelObj)[0];
        fs.writeFileSync(path.join(outputDir, "controller", `${modelName}Controller.js`), controllerCode);
        fs.writeFileSync(path.join(outputDir, "manager", `${modelName}Manager.js`), managerCode);
    });

    const dalCode = generateDalFile(schema.models);
    fs.writeFileSync(path.join(outputDir, 'dal.js'), dalCode);
    console.log("✅ Generated dal.js");

}

module.exports = generateBackend;

// CLI usage
if (require.main === module) {
    const schemaPath = process.argv[2];
    if (!schemaPath) {
        console.error("❌ Please provide the path to your schema JSON file.");
        process.exit(1);
    }

    generateBackend(schemaPath);
}
