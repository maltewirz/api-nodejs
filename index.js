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


// Post route for uploading new locations
app.post("/api/upload/", upload.single("file"), async (req, res) => {
  let fileName = req.file.originalname.substring(0, req.file.originalname.length-5);
  let filePath = `./uploads/${req.file.filename}`;
  let fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  fs.unlinkSync(filePath);
  let {latitude, longitude, additionalData} = fileContent;
  let distanceOffice = distance(latitude, longitude, 52.502931, 13.408249);
  try {
    await db.addGeo(fileName, latitude, longitude, additionalData, distanceOffice);
    res.json({success:true});
  }catch(err) {
    console.log("err in upload", err);
    res.json({error:true});
  }
});

//Helper function: calculates distance between geo locations with error up to 0.3 %
function distance(lat1, lon1, lat2, lon2) {
  let p = Math.PI / 180;
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;
  let radiusEarth = 12742;
  return radiusEarth * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

//Get Route for all names in DB
app.get("/api/location/names/", async (req, res) => {
  try {
    let response =  await db.getNames();
    res.json(response.rows);
  } catch(err) {
    console.log("err in /api/location/names/");
    res.json({error:true});
  }
});

//Get Route for details on Location name, this can return multiple valid
app.get("/api/location/:query", async (req, res) => {
  let query = req.params.query.toLowerCase();
  try {
    let response = await db.queryGeo(query);
    if (response.rows[0] === undefined) {
      res.json({error:true});
    } else {
      res.json(response.rows);
    }
  } catch(err) {
    console.log("err in /api/location/:query");
    res.json({error:true});
  }
});

//The server listen route
server.listen(process.env.PORT || 5000, () =>
  console.log("I'm listening on 5000.")
);
