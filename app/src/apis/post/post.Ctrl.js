"use strict";

const PostStorage = require("../../models/service/Post/PostStorage");
const Post = require("../../models/service/Post/Post");

const process = {
  createPost: async (req, res) => {
    try {
      const post = new Post(req.body);
      const response = await post.addPost();
      console.log(response);
      // console.log("createPost입니다");
      // console.log(PostStorage.getPostInfo("images", "postNo"));
      // const response = {};
      // response.success = true;
      // response.postNo = 1;
      // response.msg = "게시물이 생성되었습니다.";
      return res.json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
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
