const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname + "/dist/libs/helpers.js"),
  },
  output: {
    path: path.resolve(__dirname + "/dist/libs"),
    filename: "[name].bundle.js",
    library: "myApp",
  },
  optimization: {
    minimize: false,
  },
};
