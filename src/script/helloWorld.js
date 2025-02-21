import HellowWorldButton from "../components/button/hello-world-button"; //index.js에서 분리돼서 따로 페이지에 버튼 넣고 싶을 때 사용 index.js하고만 연결돼서 사용한다면 코드는 주석처리
import Heading from "../components/heading/heading"; // index.js에서 heading분리해서 사용하고 싶을 때 사용. index.js하고만 연결돼서 사용한다면 코드는 주석처리
//import _ from "lodash"; // index.js에서 heading분리해서 사용하고 싶을 때 사용. index.js하고만 연결돼서 사용한다면 코드는 주석처리
import React from "react";

const heading = new Heading();
//heading.render(_.upperFirst("hello world"));
heading.render("hello world");

const helloWorldButton = new HellowWorldButton();
helloWorldButton.render();

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}

let helloWorld = () => {
  console.log("hell World~!");
};

export default helloWorld;
