"use strict";

const process = {
  create: (req, res) => {
    console.log("create입니다");
    console.log(req.body);
  },
  read: (req, res) => {
    console.log("read입니다");
  },
  update: (req, res) => {
    console.log("업데이트입니다.");
  },
};

module.exports = {
  process,
};
