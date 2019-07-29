const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/piloteers";

var db = spicedPg(dbUrl);

module.exports.addGeo = function addGeo(fileName, latitude, longitude, additionalData, distanceOffice) {
  return db.query(
    `
    INSERT INTO geo (name, latitude, longitude, additional, distance_office)
    VALUES ($1, $2, $3, $4, $5);
    `, [fileName, latitude, longitude, additionalData, distanceOffice]
  );
};
