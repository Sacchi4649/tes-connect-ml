const express = require("express");
const { spawn } = require("child_process");
const inputModel = require("./inputSchema");
const app = express();
const port = 3000;

app.get("/result", (req, res) => {
  const input = new inputModel(req.body);
  var largeDataSet = [];

  // spawn new child process to call the python script
  console.log(input);
  const python = spawn("python", ["nawaf.py", "tempat baca buku", "Jakarta"]);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    largeDataSet.push(data);
  });
  // in close event we are sure that stream is from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(largeDataSet.join(""));
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
