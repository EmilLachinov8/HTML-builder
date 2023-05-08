const fs = require("fs");

const path = require("path");
const { stdout } = process;

const dir = path.join(__dirname, "secret-folder");

const errorHandler = (err) => {
  if (err) console.log(err)
};

fs.readdir(dir, { withFileTypes: true }, (err, files) => {
  if (err) {
    errorHandler(err);
  } else {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        const fileName = file.name;
        const extName = path.extname(fileName.toString());
        const pathName = path.join(dir, file.name);
        fs.stat(pathName, (err, stats) => err ? errorHandler(err) : stdout.write(`${fileName} - ${extName} - ${stats.size}\n`));
      }
    });
  }
});