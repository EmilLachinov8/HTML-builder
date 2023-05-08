const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const nameOfPath = path.join(__dirname, "text.txt");

const writeText = "Write something\n";
const continueWrite = "Success, continue\n";
const exitText = "I just want to say goodbye\n";


const errorHandler = (err) => {
  if (err) console.log(err);
};

const exitMaker = function() {
  stdout.write(exitText);
  process.exit();
};

fs.writeFile(nameOfPath, "", errorHandler);

stdout.write(writeText);

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") exitMaker();
  fs.appendFile(nameOfPath, data.toString(), errorHandler);
  stdout.write(continueWrite);
});

process.on("SIGINT", () => exitMaker());