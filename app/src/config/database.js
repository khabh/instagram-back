const mysql = require("mysql2/promise");
// const mysql = require("mysql2");

const db = mysql.createPool({
  host: "maria-database.cmoaszmmhjtx.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "kimhyun0809",
  database: "cloned_instagram",
});

module.exports = db;
