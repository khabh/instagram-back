"use strict";

const db = require("../../../config/database");

class PostStorage {
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
      const postInfo = {};
      const query =
        "SELECT created_date, updated_date, posts.content, images.image_url FROM posts LEFT JOIN images ON posts.no = ? ORDER BY images.order_no;";
      const response = await db.query(query, [postNo]);
      const images = response[0].reduce((result, postInfo) => {
        result.push(postInfo.image_url);
        return result;
      }, []);

      postInfo.content = response[0][0].content;
      postInfo.images = images;
      postInfo.date = response[0][0].updated_date
        ? response[0][0].updated_date
        : response[0][0].created_date;

      return postInfo;
    } catch (err) {
      console.log(err);
      throw { success: false, msg: err };
    }
  }
}

module.exports = PostStorage;
