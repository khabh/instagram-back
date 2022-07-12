"use strict";
const PORT = 8080;
const app = require("../app");
app.listen(PORT, () => {
  console.log("서버 가동");
});
