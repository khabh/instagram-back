"use strict";
const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async readAllPosts() {
    try {
      const response = await PostStorage.readAllPosts();
      console.log(response);
      return response;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async readOnePost() {
    try {
      const response = await PostStorage.getOnePost(this.params.postNo);
      if (response.length === 0) {
        return { success: false, msg: "존재하지 않는 post입니다." };
      }
      const images = response.reduce((result, postInfo) => {
        result.push(postInfo.image_url);
        return result;
      }, []);
      const postInfo = {};
      postInfo.content = response[0].content;
      postInfo.images = images;
      postInfo.date = response[0].updated_date
        ? response[0].updated_date
        : response[0].created_date;

      return postInfo;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async addPost() {
    try {
      if (this.body.images.length === 0) {
        return { success: false, msg: "이미지를 추가해 주세요" };
      }
      const { affectedRows, insertId } = await PostStorage.addNewPost(
        this.body
      );

      if (insertId && affectedRows) {
        try {
          const addImageResult = await PostStorage.addImages(
            this.body.images,
            insertId
          );

          if (this.body.images.length === 1) {
            return addImageResult.affectedRows
              ? { success: true, msg: "게시물이 추가되었습니다." }
              : { success: false, msg: "이미지 업로드를 실패했습니다" };
          }
          addImageResult.forEach((result) => {
            if (!result.affectedRows) {
              return { success: false, msg: "이미지 업로드를 실패했습니다." };
            }
          });

          return { success: true, msg: "게시물이 추가되었습니다." };
        } catch (err) {
          console.log();
          throw { success: false, msg: err.msg };
        }
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

  async deletePost() {
    try {
      const response = await PostStorage.deletePost(this.params.postNo);

      return response.affectedRows
        ? { success: true, msg: "게시물이 삭제되었습니다." }
        : { success: false, msg: "게시물이 삭제되지 않았습니다" };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async readProfilePosts() {
    try {
      const profilePostInfo = await PostStorage.getProfilePosts(
        this.params.userNo
      );
      const profilePosts = [];
      profilePostInfo.forEach((postInfo) => {
        const response = {
          postNo: postInfo.no,
          firstImage: postInfo.image_url,
          date: postInfo.updated_date
            ? postInfo.updated_date
            : postInfo.created_date,
        };
        profilePosts.push(response);
      });

      return profilePosts;
    } catch (err) {
      return { success: false, msg: err.msg };
    }
  }

  async updatePost() {
    try {
      const response = await PostStorage.updatePost(this.body);

      return response.affectedRows
        ? { success: true, msg: "게시물이 수정되었습니다." }
        : { success: false, msg: "게시물이 수정되지 않았습니다" };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
