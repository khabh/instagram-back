"use strict";
const PostStorage = require("./PostStorage");

class Post {
  constructor(body) {
    this.body = body;
  }

  addPost() {
    const { images, userNo } = PostStorage.getPostInfo("images", "userNo");
    console.log(images, userNo);
  }
}

module.exports = Post;
