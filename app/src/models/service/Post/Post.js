"use strict";
const PostStorage = require("./PostStorage");

class Post {
  constructor(body) {
    this.body = body;
  }

  async addPost() {
    try {
      const response = await PostStorage.getPostInfo("images", "userNo");
      console.log(response);
      return response;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
