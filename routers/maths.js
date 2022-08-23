const express = require("express");
const { arithmetics } = require("../data/infoClasses.js").infoClasses;
const routerMath = express.Router();

//arithmetics
routerMath.get("/", (req, res) => {
  res.send(JSON.stringify(arithmetics));
});

routerMath.get("/:topic", (req, res) => {
  const topic = req.params.topic;
  const result = arithmetics.filter(
    (topicClass) => topicClass.topic === topic
  );

  if (result.length === 0) {
    return res.status(404).send(`We couldn't find courses about ${topic}.`);
  }
  res.send(JSON.stringify(result));
});

module.exports = routerMath;