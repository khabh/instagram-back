"use strict";

class PostStorage {
  static #data = {
    images: ["이미지1", "이미지2"],
    postNo: [1, 2],
    userNo: [2, 4],
  };

  static getPostInfo(...fields) {
    const postInfo = this.#data;
    const newPostInfo = fields.reduce((newPostInfo, field) => {
      if (postInfo.hasOwnProperty(field)) {
        newPostInfo[field] = postInfo[field];
      }
      return newPostInfo;
    }, {});
    return newPostInfo;
  }
}

module.exports = PostStorage;
