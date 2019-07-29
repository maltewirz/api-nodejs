const express = require("express");
const app = express();
const server = require('http').Server(app);
const multer  = require('multer');
const fs = require("fs");
const upload = multer({ dest: 'uploads/' });
const db = require("./utils/db");
const compression = require("compression");

/////////////////////////////
app.use(compression());
app.use(express.json());

app.post("/api/upload/", upload.single("file"), async (req, res) => { // make sure to use key "file" in postman
  console.log("filename without json: ", req.file.originalname.substring(0, req.file.originalname.length-5));
  let filePath = `./uploads/${req.file.filename}`;
  console.log(filePath);
  let fileContent = fs.readFileSync(filePath, "utf-8");
  console.log(fileContent);
  fileContent = JSON.parse(fileContent);

  console.log(fileContent.latitude);

  res.json({success:true});
});

app.get("/api/location/names/", async (req, res) => {
  try {
    console.log("incoming");
    res.json({incoming: true});
  } catch(err) {
    console.log("err in /api/location/names/");
  }
});

server.listen(process.env.PORT || 5000, () =>
  console.log("I'm listening on 5000.")
);
