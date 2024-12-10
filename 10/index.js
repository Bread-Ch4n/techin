const sqlite3 = require("sqlite3");
const fs = require("fs");

let filename = fs
  .readdirSync("./")
  .find((file) => file.startsWith("gift") && file.endsWith(".sqlite"));

let db = new sqlite3.Database(filename, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the database.");
});

const sql = `SELECT SUM(retail_price) AS total
             FROM customer_gift_purchases`;

db.get(sql, [], (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log(`Total: ${row.total}`);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Database connection closed.");
});
