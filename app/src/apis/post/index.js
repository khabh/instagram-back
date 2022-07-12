"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("./post.Ctrl");

// router.get("/post", ctrl.post);
router.post("/", postCtrl.process.create);
router.get("/", postCtrl.process.read);
router.put("/", postCtrl.process.update);
// router.delete("/", postCtrl.process.update);

module.exports = router;
