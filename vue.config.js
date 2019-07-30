// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.scss` 这个文件
          data: `@import "./src/assets/style/main.scss";`
        }
      }
    },
    devServer: {
      proxy: {
        "/api": {
          target: "http://yapi.demo.qunar.com",
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/mock/84518/api" // rewrite path
          }
        }
      }
    }
  };