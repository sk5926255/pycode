const { PythonShell } = require("python-shell");
const express = require("express");
const { writeFileSync } = require("fs");
const router = express.Router();
const fs = require("fs");

const createTemporaryScript = (code) => {
  const tempScriptPath = "/tmp/temporary_script.py";
  writeFileSync(tempScriptPath, code);
  return tempScriptPath;
};

router.post("/python", async (req, res) => {
  const { code } = req.body;

  try {
    const tempScriptPath = createTemporaryScript(code);
    const pythonShell = new PythonShell(tempScriptPath);

    pythonShell.send(code);

    // Capture output and error streams:
    let output = "";
    let error = "";

    pythonShell.on("message", (message) => {
      output += message;
    });

    pythonShell.on("error", (error) => {
      console.error(error);
      error += err.message; // Include the error message in the response
    });

    // Wait for the script to finish:
    await new Promise((resolve, reject) => {
      pythonShell.end((err, code, signal) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    fs.unlinkSync(tempScriptPath);

    // Send the response:
    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
