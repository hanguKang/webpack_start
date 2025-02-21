// import "../../style/style./";
import "../../style/style.scss";

class HelloWorldButton {
  buttonCssClass = "hello-world-button";
  render() {
    const button = document.createElement("button");
    const body = document.getElementsByTagName("body")[0];
    button.innerHTML = "Hello world";
    button.addEventListener("click", function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-txt");
      body.appendChild(p);
    });
    button.classList.add(this.buttonCssClass);
    body.appendChild(button);
  }
}

export default HelloWorldButton;
