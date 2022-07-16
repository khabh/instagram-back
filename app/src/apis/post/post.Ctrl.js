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

  readPost: async (req, res) => {
    try {
      const post = new Post(req);
      const response = await post.readOnePost();
      return res.json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    const post = new Post(req);
    const response = await post.updatePost();
    console.log(response);
    return res.json(response);
  },

  deletePost: async (req, res) => {
    const post = new Post(req);
    const response = await post.deletePost();
    return res.json(response);
  },

  readAllPosts: async (req, res) => {
    const post = new Post(req);
    const response = await post.readAllPosts();
    return res.json(response);
  },

  readMainPosts: async (req, res) => {
    const post = new Post(req);
    const response = await post.readProfilePosts();
    return res.json(response);
  },
};

module.exports = {
  process,
};
