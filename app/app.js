"use strict";

//모듈
const express = require("express");
const app = express();

//라우팅
const post = require("./src/apis/post");

//앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", post); //미들웨어 등록

module.exports = app;
