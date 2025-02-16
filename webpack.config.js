var path = require("path");

module.exports = {
  entry: { bundle: "./src/index.js" }, // entry가 세 개인 경우, output의 파일명은 각각 main.js, main2.js, main3.js로 동적으로 만들어집니다.
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "none",
};
