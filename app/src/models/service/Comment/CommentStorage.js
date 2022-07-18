"use strict";

const db = require("../../../config/database");

class CommentStorage {
  static async addComment(postNo, userNo, content) {
    try {
      const query = `INSERT INTO comments(user_no, post_no, content) VALUES(?,?,?);`;
      const response = await db.query(query, [userNo, postNo, content]);
      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
  static async readComments(postNo) {
    try {
      const query = `SELECT comments.no, comments.user_no, users.profile_image, users.nickname, comments.updated_date, comments.created_date, comments.content FROM comments LEFT JOIN users ON comments.user_no = users.no WHERE comments.post_no = ?`;
      const response = await db.query(query, [postNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async updateComment({ commentNo, content }) {
    try {
      const query = `UPDATE comments SET content = ?, updated_date = NOW() WHERE no = ?`;
      const response = await db.query(query, [content, commentNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
}
module.exports = CommentStorage;
