"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./default.Ctrl");

router.get("/", ctrl.temp);

module.exports = router;
