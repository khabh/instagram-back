"use strict";

console.log("hello worldd");

const userNo = document.querySelector("#userNo"),
  content = document.querySelector("#content"),
  submitBtn = document.querySelector("button");

console.log(userNo);

// function submit() {
//   const req = {
//     userNo: 1, //토큰으로 접근
//     content: "안녕",
//   };

//   fetch("/moae/post", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(req),
//   })
//     .then((res) => res.json())
//     .then(console.log)
//     .catch((err) => {
//       console.error(err);
//     });
// }

// submitBtn.addEventListener("click", submit);
