const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "maria-database.cmoaszmmhjtx.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "kimhyun0809",
  database: "cloned_instagram",
  multipleStatements: true,
});

module.exports = db;
