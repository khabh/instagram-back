"use strict";

console.log("hello worldd");

const userNo = document.querySelector("#userNo"),
  content = document.querySelector("#content"),
  submitBtn = document.querySelector("button");

console.log(userNo);

function submit() {
  const req = {
    token: userNo.value,
    content: content.value,
    images: ["이미지1 url", "이미지2 url"],
  };

  fetch("/moae/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch((err) => {
      console.error(new Error("게시물 생성 중 오류 발생"));
    });
}

submitBtn.addEventListener("click", submit);
