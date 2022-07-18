"use strict";
const CommentStorage = require("./CommentStorage");

class Comment {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async addComment() {
    try {
      const response = await CommentStorage.addComment(
        this.query.postNo,
        this.query.userNo,
        this.body.content
      );
      if (response.affectedRows === 1) {
        return {
          success: true,
          commentNo: response.insertId,
          msg: "댓글이 작성되었습니다",
        };
      } else {
        return {
          success: false,
          msg: "댓글이 작성되지 않았습니다",
        };
      }
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async getComments() {
    try {
      const commentsInfo = await CommentStorage.readComments(
        this.params.postNo
      );
      const response = [];
      commentsInfo.forEach((commentInfo) => {
        const result = {};
        result.commentNo = commentInfo.no;
        result.userNo = commentInfo.user_no;
        result.profileImage = commentInfo.profile_image;
        result.nickname = commentInfo.nickname;
        result.content = commentInfo.content;
        result.date = commentInfo.updated_date
          ? commentInfo.updated_date
          : commentInfo.created_date;
        response.push(result);
      });

      return response;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async updateComment() {
    try {
      const response = await CommentStorage.updateComment(this.body);
      if (response.affectedRows === 1) {
        return {
          success: true,
          msg: "댓글이 수정되었습니다",
        };
      } else {
        return {
          success: false,
          msg: "댓글이 수정되지 않았습니다",
        };
      }
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Comment;
