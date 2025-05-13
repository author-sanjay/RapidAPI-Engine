function generateDalFile(models) {
    const lines = [];

    // Import Prisma client
    lines.push(`const { PrismaClient } = require('@prisma/client');`);
    lines.push(`const prisma = new PrismaClient();\n`);

    for (const model of models) {
        const modelName = Object.keys(model)[0];
        const pascalModel = modelName[0].toUpperCase() + modelName.slice(1);
        const lowerModel = modelName.toLowerCase();
        const fields = model[modelName];

        // Create function
        lines.push(`
  exports.create${pascalModel} = async (data) => {
    return await prisma.${lowerModel}.create({ data });
  };
      `.trim());

        // FindBy<Field> for each field
        for (const fieldName of Object.keys(fields)) {
            const pascalField = fieldName[0].toUpperCase() + fieldName.slice(1);

            lines.push(`
  exports.findBy${pascalField} = async (${fieldName}) => {
    return await prisma.${lowerModel}.findMany({
      where: { ${fieldName} }
    });
  };
        `.trim());
        }

        // Update function
        lines.push(`
  exports.update${pascalModel} = async (id, data) => {
    return await prisma.${lowerModel}.update({
      where: { id },
      data,
    });
  };
      `.trim());

        // Delete function
        lines.push(`
  exports.delete${pascalModel} = async (id) => {
    return await prisma.${lowerModel}.delete({
      where: { id },
    });
  };
      `.trim());
    }

    return lines.join('\n\n');
}


module.exports = {
    generateDalFile
}