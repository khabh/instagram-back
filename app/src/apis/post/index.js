"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("./post.Ctrl");

// router.get("/post", ctrl.post);
router.post("/", postCtrl.process.createPost);
router.patch("/", postCtrl.process.updatePost);
router.get("/:postNo", postCtrl.process.readPost);
router.delete("/:postNo", postCtrl.process.deletePost);
router.get("/", postCtrl.process.readAllPosts); //전체 게시물 가져오기
router.get("/profile/:userNo", postCtrl.process.readMainPosts); //각 게시물의 첫번째 사진만 보내기
module.exports = router;
