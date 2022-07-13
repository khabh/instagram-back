"use strict";
const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async addPost() {
    try {
      const { affectedRows, insertId } = await PostStorage.addNewPost(
        this.body
      );
      if (affectedRows === 1) {
        return {
          success: true,
          postNo: insertId,
          msg: "게시글이 성공적으로 작성되었습니다.",
        };
      } else return { success: false, msg: "게시글이 작성되지 않았습니다." };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
