const path = require("path");
const { merge } = require('webpack-merge');
const commonConf = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = () => merge(commonConf({outputFile, assetFile}), {
	mode: "development",
	devtool: "source-map",
	devServer: {
		open: true,
		watchFiles: ["./src/**/*"],
		static: {
			directory: path.join(__dirname, 'dist'),
		}
	},
	watchOptions: {
		ignored: /node_modules/,
	}
});