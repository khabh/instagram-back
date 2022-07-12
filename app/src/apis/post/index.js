"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./post.Ctrl");

router.get("/", ctrl.post);

module.exports = router;
