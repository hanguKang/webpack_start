import helloWorld from "./helloWorld"; // helloWorld.js파일은 production모드에서 index.js를 1.(img)와 2.(제목, 버튼) 분리해서 사용 - 때문에 index에서는 제목도 2개, 버튼도 2개 생성될거임.
//import addImage from "./add-Image"; //add-Image.js 파일에서 주석처리된 함수를 사용할 때
import Add_Img from "./add-Image"; //add-Image.js 파일의 class파일
import HelloWorldButton from "../components/button/hello-world-button";
import { getResult3 } from "./pipeOperator";
import Heading from "../components/heading/heading";

helloWorld();
//addImage();

let add_img = new Add_Img();
add_img.render();

let heading = new Heading();
heading.render(_.upperFirst("index"));

let helloWorldBtn = new HelloWorldButton();
helloWorldBtn.render();

console.log(getResult3(5));
//https://www.wallaceandgromit.com/media/0j5nbkoi/16_9_w-g_history_twt.jpg

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}
