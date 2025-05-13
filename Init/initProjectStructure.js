const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
function createProjectStructure(outputDir) {
    const folders = [
        outputDir,
        path.join(outputDir, "models"),
        path.join(outputDir, "controller"),
        path.join(outputDir, "manager"),
        path.join(outputDir, "routes")
    ];

    folders.forEach((folder) => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            console.log(`📁 Created: ${folder}`);
        }
    });
}


module.exports = {
    createProjectStructure
}