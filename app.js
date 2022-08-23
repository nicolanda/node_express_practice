const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { infoClasses } = require("./data/infoClasses.js");

//routers

//development route

const routerDevelopment = require('./routers/development.js');
app.use('/api/infoClasses/development', routerDevelopment);

//math route

const routerMath = require('./routers/maths.js')
app.use('/api/infoClasses/arithmetics', routerMath)

//general info
app.get("/", (req, res, next) => {
  res.send("Hello nodemon 🥶");
});

app.get("/api/infoClasses", (req, res) => {
  res.send(JSON.stringify(infoClasses));
});

//listen
app.listen(PORT, () => {
  console.log(`server listening at ${PORT}...`);
});
