const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
function initNpm(outputDir) {
    execSync("npm init -y", { cwd: outputDir, stdio: "inherit" });
    console.log("✅ Initialized npm");

    // Install basic dependencies
    execSync("npm install express body-parser", {
        cwd: outputDir,
        stdio: "inherit"
    });
    console.log("📦 Installed express, body-parser");
}


module.exports = {
    initNpm
}