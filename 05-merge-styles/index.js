const path = require("path");

const fs = require("fs");

const errorHandler = (err) => {
  if (err) console.log(err);
};

const stylesPath = path.join(__dirname, "styles");

const bundlePath = path.join(__dirname, "project-dist", "bundle.css");

fs.writeFile(bundlePath, "", errorHandler);
fs.readdir(stylesPath, { withFileTypes: true }, (err, data) =>
  err ? errorHandler(err) : data.forEach((file) => {
    const pathToFile = path.join(stylesPath, file.name);
    const extentionName = path.extname(pathToFile);
      if (!file.isDirectory() && extentionName === ".css") {
        fs.readFile(pathToFile, "utf-8", (err, data) => err ? errorHandler(err) : fs.appendFile(bundlePath, data, errorHandler));
      }
  })
);