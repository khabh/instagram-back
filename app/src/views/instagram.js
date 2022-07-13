"use strict";

console.log("hello worldd");

const userNo = document.querySelector("#userNo"),
  content = document.querySelector("#content"),
  submitBtn = document.querySelector("button");

console.log(userNo);

function submit() {
  const req = {
    userNo: userNo.value,
    content: content.value,
  };

  fetch("/moae/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}

submitBtn.addEventListener("click", submit);
