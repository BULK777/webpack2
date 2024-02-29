const { merge } = require('webpack-merge');
const commonConf = require("./webpack.common");
const outputFile = "[name][chunkhash]";
const assetFile = "[name][contenthash]";

module.exports = () => merge(commonConf({outputFile, assetFile}), {
	mode: "production",
});