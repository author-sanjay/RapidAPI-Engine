const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
function jsTypeToPrisma(type) {
    const map = {
        string: "String",
        int: "Int",
        boolean: "Boolean",
        float: "Float",
        datetime: "DateTime"
    };
    return map[type.toLowerCase()] || "String";
}

function generatePrismaSchema(models, outputDir) {
    const schemaPath = path.join(outputDir, "prisma/schema.prisma");

    let modelDefs = models.map((modelObj) => {
        const [modelName, fields] = Object.entries(modelObj)[0];
        const lines = [`model ${modelName} {`];
        lines.push(`  id        Int      @id @default(autoincrement())`);

        for (const [fieldName, fieldConfig] of Object.entries(fields)) {
            const type = jsTypeToPrisma(fieldConfig.type);
            const optional = fieldConfig.optional ? "?" : "";
            lines.push(`  ${fieldName}  ${type}${optional}`);
        }

        lines.push(`  createdAt DateTime @default(now())`);
        lines.push(`  updatedAt DateTime @updatedAt`);
        lines.push(`}`);
        return lines.join("\n");
    });

    const content = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

${modelDefs.join("\n\n")}
  `.trim();

    fs.writeFileSync(schemaPath, content);
    console.log("📄 Updated: prisma/schema.prisma");
}


module.exports = {
    generatePrismaSchema
}