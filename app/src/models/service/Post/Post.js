"use strict";
const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async readAllPosts() {
    const response = await PostStorage.readAllPosts();
    console.log(response);
    return response;
  }

  async readOnePost() {
    try {
      const response = await PostStorage.getOnePost(this.params.postNo);
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

  async deletePost() {
    const response = await PostStorage.deletePost(this.params.postNo);
    return response;
  }

  async readProfilePosts() {
    const postInfo = await PostStorage.getProfilePosts(this.params.userNo);
    const profilePosts = [];
    postInfo.forEach((postInfo) => {
      const response = {
        postNo: postInfo.no,
        firstImage: postInfo.image_url,
        date: postInfo.updated_date
          ? postInfo.updated_date
          : postInfo.created_date,
      };
      profilePosts.push(response);
    });
    console.log(profilePosts);
    return profilePosts;
  }
}

module.exports = Post;
