const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
function createServerFile(outputDir) {
    const serverContent = `
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());


const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(\`./routes/\${file}\`);
  const base = file.replace(".js", "").toLowerCase();
  app.use(\`/api/\${base}\`, route);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
  `.trim();

    fs.writeFileSync(path.join(outputDir, "server.js"), serverContent);
    console.log("📄 Created: server.js");
}


module.exports={
    createServerFile
}