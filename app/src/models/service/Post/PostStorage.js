"use strict";

const db = require("../../../config/database");

class PostStorage {
  //   static #data = {
  //     images: ["이미지1", "이미지2"],
  //     postNo: [1, 2],
  //     userNo: [2, 4],
  //   };

  static async getPostInfo() {
    try {
      const query = "SELECT * FROM posts";
      const response = await db.query(query);
      return response[0];
    } catch (err) {
      throw {
        msg: "오류오류오류오류오류오류",
      };
    }
  }
}

module.exports = PostStorage;
