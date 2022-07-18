"use strict";

const db = require("../../../config/database");

class PostStorage {
  static async getProfilePosts(userNo) {
    try {
      const qurey =
        "SELECT posts.no, users.nickname, posts.created_date, updated_date, images.image_url FROM images LEFT JOIN posts ON images.post_no = posts.no LEFT JOIN users ON(posts.user_no = users.no) WHERE posts.user_no =? GROUP BY posts.no; ";
      const response = await db.query(qurey, [userNo]);
      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async addNewPost({ userNo, content }) {
    try {
      const query = content
        ? `INSERT INTO posts(user_no, content) VALUES(${userNo}, "${content}");`
        : `INSERT INTO posts(user_no) VALUES(${userNo})`;
      const response = await db.query(query);

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
        query += `INSERT INTO images(image_url,post_no,order_no) VALUES("${imageUrl}",${postNo},${
          index + 1
        });`;
      });
      const result = await db.query(query);

      return result[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async getOnePost(postNo) {
    try {
      const query =
        "SELECT posts.no ,created_date, updated_date, posts.content, images.image_url FROM posts LEFT JOIN images ON images.post_no = posts.no WHERE posts.no = ? GROUP BY images.image_url;";
      const response = await db.query(query, [postNo]);
      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async getAllPostsNo() {
    const query = "SELECT no FROM posts";
    const response = await db.query(query);
    return response[0];
  }

  static async readAllPosts(allPostsNo) {
    try {
      let query = "";
      allPostsNo.forEach(({ no }) => {
        query += `SELECT posts.no, posts.user_no, users.nickname, users.profile_image, posts.created_date, updated_date, posts.content, images.image_url FROM images LEFT JOIN posts ON images.post_no = posts.no LEFT JOIN users ON posts.user_no = users.no WHERE posts.no = ${no} ORDER BY images.order_no;`;
      });
      const response = await db.query(query);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async deletePost(postNo) {
    try {
      const query = "DELETE FROM posts WHERE no =?;";
      const response = await db.query(query, postNo);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async updatePost({ postNo, content }) {
    try {
      const qurey =
        "UPDATE posts SET content = ?, updated_date = NOW() WHERE no = ?;";
      const response = await db.query(qurey, [content, postNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
}

module.exports = PostStorage;
