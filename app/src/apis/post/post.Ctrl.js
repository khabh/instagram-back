"use strict";

const Post = require("../../models/service/Post/Post");

const process = {
  createPost: async (req, res) => {
    try {
      const post = new Post(req);
      const response = await post.addPost();

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
