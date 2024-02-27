// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
// const { writeFileSync } = require("fs");
// const { exec } = require("child_process");

// const app = express();

// const server = http.createServer(app);

// const io = socketIO(server);

// app.post("/python", (req, res) => {
//   const { code } = req.body;

//   const fileName = "main.py";

//   require("fs").writeFileSync(fileName, code);
//   // Construct the command to execute the Python script
//   const command = `python ${fileName}`;

//   // Execute the Python script as a child process
//   const child = exec(command, (error, stdout, stderr) => {
//     // Emit the script execution results to all connected clients
//     io.emit("scriptResult", { stdout, stderr, error });
//   });

//   // Set up Socket.IO event listeners for each client connection
//   io.on("connection", (socket) => {
//     // Listen for additional input from the client
//     socket.on("additionalInput", (input) => {
//       // Write the input to the running script's standard input
//       child.stdin.write(`${input}\n`);
//     });

//     // Handle disconnect event
//     socket.on("disconnect", () => {
//       // Close the standard input when the client disconnects
//       child.stdin.end();
//     });
//   });

//   // Provide the path of the script to the client in the response
//   res.json({ scriptPath });
// });

// // Start the server on port 4001
// server.listen(4001, () => {
//   console.log("Server is running on port 4001");
// });

const express = require("express");
const { writeFileSync } = require("fs");
const router = express.Router();
const fs = require("fs");
const { exec } = require("child_process");
const e = require("express");

const createTemporaryScript = (code) => {
  const tempScriptPath = "/tmp/temporary_script.py";
  writeFileSync(tempScriptPath, code);
  return tempScriptPath;
};

router.post("/python", async (req, res) => {
  const { code, input } = req.body;

  console.log(req.body, "req.body");

  const fileName = "main.py";

  require("fs").writeFileSync(fileName, code);

  const command = `echo ${input} | python ${fileName}`;
  const child = exec(command, { input }, (error, stdout, stderr) => {
    res.json({ stdout, stderr, error });
  });
});

module.exports = router;
