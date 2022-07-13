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
      if (insertId && affectedRows) {
        const addImageResult = PostStorage.addImages(
          this.body.images,
          insertId
        );
        // try {
        //   const addImageResult = await PostStorage.addImages(
        //     this.body.images,
        //     insertId
        //   );
        //   if (addImageResult.affectedRows) {
        //
        //   } else {
        //     return { success: false, msg: "이미지 업로드를 실패했습니다." };
        //   }
        // } catch (err) {
        //   throw { success: false, msg: err.msg };
        // }
      }
      return {
        success: true,
        postNo: insertId,
        msg: "게시글이 성공적으로 작성되었습니다.",
      };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
