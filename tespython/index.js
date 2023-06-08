const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true })); //buat parsing url encode
app.use(express.json());
app.post("/result", (req, res) => {
  var largeDataSet = [];
  const { keywords, city } = req.body;
  console.log(req.body);
  // spawn new child process to call the python script

  const python = spawn("python", ["./python/nawaf.py", keywords, city]);
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
    // res.json(JSON.parse(largeDataSet));
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
