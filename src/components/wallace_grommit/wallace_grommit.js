import wallaceAndGrommit from "../../imgs/wallaceandgromit.jpg";
import altText from "./altText.txt";
import "../../style/addImg.scss";

// export default function addImage() {
//   const img = document.createElement("img");
//   img.alt = altText;
//   img.width = 300;
//   img.src = wallaceAndGrommit;
//   const body = document.getElementsByTagName("body")[0];
//   body.appendChild(img);
// }
class Wallace_grommit {
  render() {
    const img = document.createElement("img");
    img.alt = altText;
    img.width = 300;
    img.src = wallaceAndGrommit;
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(img);
  }
}

export default Wallace_grommit;
