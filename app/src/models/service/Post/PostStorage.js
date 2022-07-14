"use strict";

const db = require("../../../config/database");

class PostStorage {
  static async getProfilePosts(userNo) {
    const qurey =
      "SELECT posts.no, users.nickname, posts.created_date, updated_date, posts.content, images.image_url FROM images LEFT JOIN posts ON images.post_no = posts.no LEFT JOIN users ON (posts.user_no = users.no) WHERE posts.user_no =? GROUP BY posts.no;";
    const response = await db.query(qurey, [userNo]);
    return response[0];
  }

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

  static async addImages(images, postNo) {
    try {
      images.forEach(async (imageUrl, index) => {
        const query =
          "INSERT INTO images(image_url, post_no,order_no) VALUES(?,?,?);";
        await db.query(query, [imageUrl, postNo, index + 1]);
      });
    } catch (err) {
      console.log(err);
      throw { success: false, msg: err };
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
}

module.exports = PostStorage;
