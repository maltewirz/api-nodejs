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

app.post("/api/upload/", upload.single("file"), async (req, res) => { // use key "file" in postman
  let fileName = req.file.originalname.substring(0, req.file.originalname.length-5);
  let filePath = `./uploads/${req.file.filename}`;
  let fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let {latitude, longitude, additionalData} = fileContent;
  let distanceOffice = distance(latitude, longitude, 52.502931, 13.408249);
  try {
    await db.addGeo(fileName, latitude, longitude, additionalData, distanceOffice);
  }catch(err) {
    console.log("err in upload", err);
  }
  res.json({success:true});
});

//calculates distance between geo locations with error up to 0.3 %
function distance(lat1, lon1, lat2, lon2) {
  let p = Math.PI / 180;
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;
  let radiusEarth = 12742;
  return radiusEarth * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

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
