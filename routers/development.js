const express = require("express");
const { development } = require("../data/infoClasses.js").infoClasses;

const routerDevelopment = express.Router();

//middleware
routerDevelopment.use(express.json());

routerDevelopment.get("/", (req, res) => {
  res.send(JSON.stringify(development));
});

routerDevelopment.get("/:topic", (req, res) => {
  const topic = req.params.topic;
  const result = development.filter((course) => course.topic === topic);
  if (result.length === 0) {
    return res.status(404).send(`We couldn't find courses about ${topic}.`);
  }
  //query
  if (req.query.order === "views") {
    return res.send(JSON.stringify(result.sort((a, b) => a.views - b.views)));
  }
  res.send(JSON.stringify(result));
});

routerDevelopment.get("/:topic/:level", (req, res) => {
  const topic = req.params.topic;
  const level = req.params.level;

  const result = development.filter(
    (course) => course.topic === topic && course.level === level
  );
  if (result.length === 0) {
    return res
      .status(404)
      .send(`We couldn't find courses about ${topic} on difficult: ${level}`);
  }
  res.send(JSON.stringify(result));
});

//post
routerDevelopment.post("/", (req, res, next) => {
  let newCourse = req.body;
  development.push(newCourse);
  res.send(JSON.stringify(newCourse));
});

//put
routerDevelopment.put("/:id", (req, res) => {
  const updateCourse = req.body;
  const id = req.params.id;
  const index = development.findIndex((course) => course.id == id);

  if (index >= 0) {
    development[index] = updateCourse;
  }
  res.send(JSON.stringify(development));
});

routerDevelopment.patch("/:id", (req, res) => {
  const updateInfo = req.body;
  const id = req.params.id;
  const index = development.findIndex(course => course.id == id)

  if(index >= 0){
  const modCourse = development[index]
  Object.assign(modCourse, updateInfo);
  }
  res.send(JSON.stringify(development))
})

routerDevelopment.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = development.findIndex(course => course.id == id);

  if(index >= 0){
    development.splice(index, 1);
  }
  
  res.send(JSON.stringify(development));
})
module.exports = routerDevelopment;
