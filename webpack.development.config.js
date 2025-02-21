const path = require("path");
//const TerserPlugin = require("terser-webpack-plugin"); //js파일 압축
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //output의 clean 속성 옵션으로는 webpack-dev-server의 output 폴더를 지울수 없는데 이 플러그인은 가능하다는 것, 그리고 clean 속성 옵션은 build 디렉토리도 지울 수 없다.
const HtmlWebpackPlugin = require("html-webpack-plugin"); //./dist디렉토리에 index.html파일을 생성해 준다. 자동으로 style.컨텐트해시.css와 bundle컨텐트해시.js
const webpackProductionConfig = require("./webpack.production.config");

module.exports = {
  entry: {
    bundle: "./src/script/index.js",
    //img: "./src/script/add-Image.js", //entry 포인트가 이렇게 여러개가 되면 각 엔트리가 다른 엔트리를 import하면 안된다.
  }, // entry가 세 개(output의 파일명은 각각 main.js, main2.js, main3.js)인 경우, 동적으로(output.filename이 [name]으로 되어 있을 경우 ) 각 속성명으로 만들어진다. style도 플러그인에서 [name]을 사용하면, js의 entry 개수만큼 entry js파일명과 똑같은 이름으로 만들어진다. - 중요점은 entry포인트에서 import된 style만 된다.
  output: {
    filename: "[name].bundle.js", // deveolopment
    path: path.resolve(__dirname, "./dist"), //__dir은 번들링한 결과가 만들어질 절대 경로, "./dist"를 그 경로에 작성하겠다.
    publicPath: "", //브라저가 참고할 번들링 결과 파일의 url주소 지정(CDN을 사용하는 경우 CDN호스트 지정) - webpack에서 이미지를 로드하기 위해서는 "publicPath"라는 파라미터가 필요, css에서 이미지 코드를 보면 url(./test.png)와 같이 url을 볼 수 있는데, publicPath가 이를 처리
    //clean: true,
    //{
    //dry: true, // 파일을 삭제하는 대신 삭제될 파일을 표식만 한다.
    //keep: /\.css/, // css파일은 삭제 안함
    //},
  },
  mode: "development",
  devServer: {
    //package.json에서 script{"dev": "webpack serve(서버) --config webpack.development.config.js --hot(hot module 대체한다. 웹팩 dev sever에 의해서)", ...}
    port: 9000,
    static: {
      //지정된 port에서 serve될 디렉토리 지정
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  //웹팩은 javscript만 처리 가능하다. 다른 파일도 가능하기 위해서는 loader가 필요하다.
  //Loaders 는 번들이 생성되는 동안이나 생성되기 전에 개별 파일 수준에서 작업
  module: {
    rules: [
      //{ test: /\.(png|jpg|jpeg|gif|ttf)$/, type: "asset/resource" },
      {
        test: /\.(png|jpg|jpeg|gif|ttf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, //3kb 크기를 기준으로 변경할 수도 있다.
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"], // webpack은 right에서 left 방향으로 읽어간다.
        // js파일에서 import한 scss파일들을 sass, sass-loader, css-loader(css로딩), style-loader(style파일 작성 로딩) 모두 설치할 것
        //use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //MiniCssExtractPluin을 사용하면 각.js파일에서 import한 파일을 한개의 style파일이 생성한다.하지만, plugins속성 MiniCssExtractPlugin에서 filename을 [name][contenthash]로 이름을 [name]으로 치환하면, entry의 속성의 개수만큼 해당 속성명으로 만들어져서 연결된다.
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"], //babel은 old  브라우저를 위해서, 아직 적용되지 않은 최신 Ecmascript의 기술을 적용시켜줄 수 있다. -> 최신 js를 old js로 변경한다.  물론, @babel/env에서 설정해 줘야 하고 babel-loader가 있어야 한다. npm i -D babel-loader
            plugins: [
              //javascript만을 위한 플러그인
              "@babel/plugin-transform-class-properties", //클래스의 속성을 올드 브라우저에서 변경해서 번역
              [
                "@babel/plugin-proposal-pipeline-operator",
                { proposal: "minimal" },
              ],
            ], //이 플러그인은 js문법에서 class 내부에 있는 속성을 old브라우저에서 변환해서 적용할 수 있게 해주는 플러그인(2024.02.17- 현재 모던 브라우저는 모두 적용하고 있음.)
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  //Plugin 은 번들이 생성 된 후에 작동한다
  plugins: [
    //new TerserPlugin(), //development 모드에서는 압축할 필요 없다.
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", //상단 속성인 module.rules[idx].use['MiniCssExtractPlugin.loader']를 활용해서 css파일을 만들고, 여기서 filename을 작성한다.
      //여러개로 작성된 각 js파일(entry에서 지정되어야 하며 각js파일에서 import한 scss파일만 해당된다. )하는 style만큼 만들고 싶다면, [name].[contenthash].css 로 변경하면 된다. --> entry의 속성의 개수만큼 entry 해당 속성명으로 stylesheet가 작성되서 연결된다.
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "index",
      //filename: "subfolder/custom_filename.html",
      template: "./src/index.hbs",
      meta: {
        description: "Some description",
        minify: false,
      },
    }),
  ],
};

/*
Type of Asset Modules
html, css, js   뿐만 아니라, 적절한 img, video, fontset 등을 포함합니다.
-asset/resource : Asset을 별도의 파일로 내보내는 역할을 한다.
-asset/inline  : Asset의 data URI를 내보내는 역할을 한다.(asset의 정보를 번들에 포함시킨다.)

-asset/source : 이 모듈은 Asset의 소스 코드를 내보내는 역할을 한다. .txt파일의 소가 한글이면 한글 그대로 내보낸다.

-asset : asset 크기에 따서 resource, inline 중에 적절한 옵션을 선택해서 내보내는 역할을 한다. 
용량 크기가 8KB(default) 보다 작으면 inline 모듈로 처리되고(번들에 삽입), 그렇지 않으면 resource 모듈로 처리된다.(별도의 파일로 분리) 
*/
