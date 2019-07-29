const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/piloteers";

var db = spicedPg(dbUrl);

module.exports.testAdd = function testAdd() {
  return db.query(
    `
    INSERT INTO geo (name, latitude, longitude, additional, distance_office)
    VALUES ('Berlin', 52.514818, 13.356101, 'xyc', 4);
    `
  );
};
