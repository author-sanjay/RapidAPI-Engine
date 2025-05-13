const { generateManagerFunction } = require("./ManagerFunctions");

function generateManagerForModel(modelDefinition) {
    const modelName = Object.keys(modelDefinition)[0];
    const fields = modelDefinition[modelName];
    const lines = [];

    // Require DAL at the top
    lines.push(`const dal = require('../dal');\n`);

    // Add create function
    lines.push(generateManagerFunction("create", modelName));

    // Add findBy<Field> for each field
    for (const fieldName of Object.keys(fields)) {
        lines.push(generateManagerFunction("find", modelName, fieldName));
    }

    // Add update and delete
    lines.push(generateManagerFunction("update", modelName));
    lines.push(generateManagerFunction("delete", modelName));

    return lines.join('\n\n');
}


module.exports = {
    generateManagerForModel
}