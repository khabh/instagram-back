"use strict";

const db = require("../../../config/database");

class PostStorage {
  //   static async getPostInfo() {
  //     try {
  //       const query = "SELECT * FROM posts";
  //       const response = await db.query(query);
  //       return response[0];
  //     } catch (err) {
  //       throw {
  //         msg: "오류오류오류오류오류오류",
  //       };
  //     }
  //   }
  static async addNewPost({ userNo, content }) {
    try {
      const query = "INSERT INTO posts(user_no, content) VALUES(?, ?);";
      const response = await db.query(query, [userNo, content]);
      return response[0];
    } catch (err) {
      console.log(err);
      throw { success: false, msg: err };
    }
  }
}

module.exports = PostStorage;
