// 映入一个包
const path = require("path");
// 引入html插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入clean
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { Extension } = require("typescript");

module.exports = {
  mode: "development",
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包目录
  output: {
    // 指定打包文件目录
    path: path.resolve(__dirname, "dist"),
    // 打包后的文件
    filename: "bundle.js",
  },

  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        use: [
          {
            // 指定加载器
            loader: "babel-loader",
            options: {
              // 设置预定义的环境
              // presets: [
              //   "@babel/preset-env",
              //   {
              //     targets: {
              //       browsers: ["last 2 versions", "ie >= 11"], // 或其他你希望支持的目标环境
              //     },
              //     corejs: "3",
              //     useBuiltIns: "usage",
              //   },
              // ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 正确的位置来设置 targets
                    targets: {
                      // 根据你的目标浏览器或Node.js版本来设定
                      browsers: ["> 0.2%", "not dead", "not op_mini all"],
                      // 或者针对Node.js版本：
                      // node: 'current'
                    },
                    // 其他 @babel/preset-env 的选项...
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node_modules/,
      },
      // 设置less文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "这是自定义的title",
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },
};
