const express = require("express");
const browserSync = require("browser-sync");

const app = express();
const port = 3000;

app.use(express.static("src"));

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

browserSync.init({
  proxy: `http://localhost:${port}`,
  files: ["src/*"],
  open: false,
  port: 3001,
});
