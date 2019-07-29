const express = require("express");
const app = express();
const server = require('http').Server(app);
const path = require("path");
const db = require("./utils/db");
const compression = require("compression");



/////////////////////////////
app.use(compression());
app.use(express.json());
////////////////////////////

app.get("/api/location/names/", async (req, res) => {
  try {
    console.log("incoming");
    res.json({incoming: true});
  } catch(err) {
    console.log("err in /api/location/names/");
  }
})

server.listen(process.env.PORT || 5000, () =>
  console.log("I'm listening on 5000.")
);
