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
