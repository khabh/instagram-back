"use strict";

const db = require("../../../config/database");

class PostStorage {
  static async getProfilePosts(userNo) {
    const qurey =
      "SELECT posts.no, users.nickname, posts.created_date, updated_date, images.image_url FROM images LEFT JOIN posts ON images.post_no = posts.no LEFT JOIN users ON (posts.user_no = users.no) WHERE posts.user_no =? GROUP BY posts.no;";
    const response = await db.query(qurey, [userNo]);
    return response[0];
  }

  static async addNewPost({ userNo, content }) {
    try {
      const query = "INSERT INTO posts(user_no, content) VALUES(?, ?);";
      const response = await db.query(query, [userNo, content]);
      return response[0];
    } catch (err) {
      console.log();
      throw { success: false, msg: err };
    }
  }

  static async addImages(images, postNo) {
    try {
      let query = "";

      images.forEach((imageUrl, index) => {
        query += `INSERT INTO images(image_url,post_no,order_no) VALUES('${imageUrl}',${postNo},${
          index + 1
        });`;
      });
      console.log(query);

      const result = await db.query(query);
      return result[0];
    } catch (err) {
      throw {
        success: false,
        msg: err,
      };
    }
  }

  static async getOnePost(postNo) {
    try {
      const query =
        "SELECT created_date, updated_date, posts.content, images.image_url FROM posts LEFT JOIN images ON images.post_no = ? GROUP BY images.image_url;";
      const response = await db.query(query, [postNo]);

      return response[0];
    } catch (err) {
      console.log(err);
      throw { success: false, msg: err };
    }
  }

  static async readAllPosts() {
    const query =
      "SELECT posts.no, images.order_no,users.nickname, posts.created_date, updated_date, posts.content, images.image_url FROM images LEFT JOIN posts ON images.post_no = posts.no LEFT JOIN users ON posts.user_no = users.no ";
    const response = await db.query(query);

    return response[0];
  }

  static async deletePost(postNo) {
    const query = "DELETE FROM posts WHERE no =?;";
    const response = await db.query(query, postNo);

    return response;
  }

  static async updatePost({ postNo, content }) {
    const qurey =
      "UPDATE posts SET content = ?, updated_date = NOW() WHERE no = ?;";
    const response = await db.query(qurey, [content, postNo]);

    return response[0]; // affectedPows, insertId, changedRows
  }
}

module.exports = PostStorage;
