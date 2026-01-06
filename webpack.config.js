const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mf",
    projectName: "form-viewer",
    webpackConfigEnv,
    argv
  });

  return merge(defaultConfig, {
    devServer: {
      port: 8083,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    output: {
      publicPath: "http://localhost:8083/"
    },
    externals: {
      react: "react",
      "react-dom": "react-dom"
    }
  });
};
