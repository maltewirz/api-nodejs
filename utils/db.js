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

module.exports.getNames = function getNames() {
  return db.query(
    `
    SELECT name
    FROM geo;
    `
  );
};

module.exports.queryGeo = function queryGeo(query) {
  return db.query(
    `
    SELECT name, latitude, longitude, additional, distance_office
    FROM geo
    WHERE name ILIKE $1;
    `,[query]
  );
};
