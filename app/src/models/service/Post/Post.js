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
      const allPostsNo = await PostStorage.getAllPostsNo();
      const allPostsResult = await PostStorage.readAllPosts(allPostsNo);
      const allPostsInfo = [];
      allPostsResult.forEach((postInfo) => {
        const result = {};
        const images = [];
        postInfo.forEach(({ image_url }) => {
          images.push(image_url);
        });
        result.postNo = postInfo[0].no;
        result.userNo = postInfo[0].user_no;
        result.nickname = postInfo[0].nickname;
        result.porfileImage = postInfo[0].profile_image;
        result.content = postInfo[0].content;
        result.images = images;
        result.date = postInfo[0].updated_date
          ? postInfo[0].updated_date
          : postInfo[0].created_date;
        allPostsInfo.push(result);
      });
      return allPostsInfo;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async readOnePost() {
    try {
      const particularPostInfo = await PostStorage.getOnePost(
        this.params.postNo
      );
      if (particularPostInfo.length === 0) {
        return { success: false, msg: "존재하지 않는 post입니다." };
      }
      const images = particularPostInfo.reduce((result, postInfo) => {
        result.push(postInfo.image_url);
        return result;
      }, []);
      const postInfo = {};
      postInfo.content = particularPostInfo[0].content;
      postInfo.images = images;
      postInfo.date = particularPostInfo[0].updated_date
        ? particularPostInfo[0].updated_date
        : particularPostInfo[0].created_date;

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
      const deleteResult = await PostStorage.deletePost(this.params.postNo);

      return deleteResult.affectedRows
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
      const updateResult = await PostStorage.updatePost(this.body);

      return updateResult.affectedRows
        ? { success: true, msg: "게시물이 수정되었습니다." }
        : { success: false, msg: "게시물이 수정되지 않았습니다" };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
