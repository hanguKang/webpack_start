import Heading from "../components/heading/heading";
import Wallace_grommit from "../components/wallace_grommit/wallace_grommit";
//import _ from "lodash";
import React from "react"; //npm i --save react : production용으로 사용하기 위해서 옵션을 --save로 지정한다.

// index.js 파일은 add-Image.js와 hello-world-button.js 두가지 외 등을 합친 것이다.  이를 wallace_grommit과 분리
const heading = new Heading();
//heading.render(_.upperFirst("wallace_Grommit"));
heading.render("wallace_Grommit");
const wallace_grommit = new Wallace_grommit();
wallace_grommit.render();
