"use strict";

const process = {
  createPost: (req, res) => {
    console.log("createPost입니다");
    console.log(req.body);
  },
  readPost: (req, res) => {
    console.log("readPost입니다");
  },
  updatePost: (req, res) => {
    console.log("updatePost입니다");
  },
  deletePost: (req, res) => {
    console.log("deletePost입니다");
  },
  readAllPosts: (req, res) => {
    console.log("readAllPost입니다.");
  },
  readMainPosts: (req, res) => {
    console.log("readMainPosts입니다.");
  },
};

module.exports = {
  process,
};
