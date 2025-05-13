const { generateControllerFunction } = require("./ControllerFunctions");

function generateControllerForModel(modelDefinition) {
    const modelName = Object.keys(modelDefinition)[0];
    const fields = modelDefinition[modelName];
    const lines = [];
    lines.push(`const express = require('express');`);
    lines.push(`const router = express.Router();\n`);
    lines.push(`const ${modelName.toLowerCase()}Manager = require('../manager/${modelName}Manager');\n`);
    lines.push(generateControllerFunction("create", modelName));
    for (const fieldName of Object.keys(fields)) {
        lines.push(generateControllerFunction("find", modelName, fieldName));
    }
    lines.push(generateControllerFunction("update", modelName));


    lines.push(generateControllerFunction("delete", modelName));
    lines.push(`\nmodule.exports = router;`);

    return lines.join('\n\n');
}


module.exports = {
    generateControllerForModel
}