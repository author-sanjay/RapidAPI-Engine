function generateManagerFunction(operation, modelName, fieldName = null) {
    const pascalField = fieldName?.[0].toUpperCase() + fieldName?.slice(1);
    const pascalModel = modelName[0].toUpperCase() + modelName.slice(1);

    switch (operation) {
        case "create":
            return `
  exports.create${pascalModel}Manager = async (data) => {
    return await dal.create${pascalModel}(data);
  };
        `.trim();

        case "find":
            return `
  exports.findBy${pascalField}Manager = async (${fieldName}) => {
    return await dal.findBy${pascalField}(${fieldName});
  };
        `.trim();

        case "update":
            return `
  exports.update${pascalModel}Manager = async (id, data) => {
    return await dal.update${pascalModel}(id, data);
  };
        `.trim();

        case "delete":
            return `
  exports.delete${pascalModel}Manager = async (id) => {
    return await dal.delete${pascalModel}(id);
  };
        `.trim();

        default:
            throw new Error("Invalid operation");
    }
}


module.exports = {
    generateManagerFunction
}
  