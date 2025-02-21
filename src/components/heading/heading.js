import "../../style/heading.scss";

class Heading {
  render(page_name) {
    const h1 = document.createElement("h1");
    const body = document.getElementsByTagName("body")[0];
    h1.innerHTML = `webpack is awesome. This is ${page_name} page`;
    body.prepend(h1);
  }
}

export default Heading;
