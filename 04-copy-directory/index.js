
const path = require("path");

const fs = require("fs");

const oldFolder = path.join(__dirname, "files");
const newFolder = path.join(__dirname, "files-copy");

const errorHandler = (err) => {
  if (err) console.log(err);
};

fs.mkdir(newFolder, { recursive: true }, errorHandler);

function readFiles() {
  fs.readdir(newFolder, (err, files) => {
    if (err) errorHandler(err);
    else {
      files.forEach((file) => {
        fs.unlink(path.join(newFolder, file), (err) => {
          if (err) errorHandler(err);
        });
      });
      copyDirectory();
    }
  });
}

readFiles();

function copyDirectory() {
  fs.readdir(oldFolder, (error, data) => {
    if (error) {
      errorHandler(err);
    } else {
      data.forEach((file) => {
        const oldFilePath = path.join(oldFolder, file);
        const newFilePath = path.join(newFolder, file);
        fs.copyFile(oldFilePath, newFilePath, errorHandler);
      });
    }
  });
}