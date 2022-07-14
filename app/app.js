"use strict";

//모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(`${__dirname}/src/views`));
app.use(express.urlencoded({ extended: true }));

//라우팅
const temp = require("./src/apis/default");
const post = require("./src/apis/post");

app.use("/moae", temp); //미들웨어 등록
app.use("/moae/post", post); //미들웨어 등록

module.exports = app;
