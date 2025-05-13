function generateControllerFunction(operation, modelName, fieldName = null) {
    const pascalField = fieldName?.[0].toUpperCase() + fieldName?.slice(1);
    const lowerModel = modelName.toLowerCase();
    const pascalModel = modelName[0].toUpperCase() + modelName.slice(1);

    switch (operation) {
        case "create":
            return `
  router.post('/${lowerModel}/create', async (req, res) => {
    const data = req.body;
    const created = await ${lowerModel}Manager.create${pascalModel}Manager(data);
    res.json(created);
  });
        `.trim();

        case "find":
            return `
  router.get('/${lowerModel}/findBy${pascalField}', async (req, res) => {
    const { ${fieldName} } = req.query;
    const found = await ${lowerModel}Manager.findBy${pascalField}Manager(${fieldName});
    res.json(found);
  });
        `.trim();

        case "update":
            return `
  router.put('/${lowerModel}/update', async (req, res) => {
    const { id, ...data } = req.body;
    const updated = await ${lowerModel}Manager.update${pascalModel}Manager(id, data);
    res.json(updated);
  });
        `.trim();

        case "delete":
            return `
  router.delete('/${lowerModel}/delete', async (req, res) => {
    const { id } = req.query;
    const deleted = await ${lowerModel}Manager.delete${pascalModel}Manager(id);
    res.json(deleted);
  });
        `.trim();

        default:
            throw new Error("Invalid operation");
    }
}
  

module.exports={
    generateControllerFunction
}