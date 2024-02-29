const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const root = path.resolve(__dirname, "./src");
let webpack = require("webpack");

module.exports = ({outputFile, assetFile}) => ({
	entry: {
		common: "./src/assets/js/common.js",
		home: "./src/assets/js/page-home.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: (pathData) => {
			if(pathData.chunk.name === "common") {
				return `./assets/js/${outputFile}.js`;
			} else if(pathData.chunk.name === "vendors") {
				return `./assets/js/${outputFile}.js`;
			} else {
				return `./assets/js/page-${outputFile}.js`;
			}
		},
		assetModuleFilename: (pathData) => {
			const filepath = path.dirname(pathData.filename).split("/").slice(1).join("/");
			return `${filepath}/${assetFile}[ext]`;
		},
		clean: {
			keep(asset) {
				return asset.includes("wp");
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: [
					"babel-loader",
					"eslint-loader",
				]
			},
			{
				test: /\.(css|sass|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: { importLoaders: 2 },
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"autoprefixer",
										{
											// Options
										},
									],
								],
							},
						},
					},
					"sass-loader",
				]
			},
			{
				test: /\.pug/,
				use: [
					{
						loader: "html-loader"
					},
					{
						loader: "pug-html-loader",
						options: {
							pretty: true,
							basedir: path
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp|avif|ico|woff2?|tff|eot)$/,
				type: "asset/resource",
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
						},
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `./assets/css/${outputFile}.css`,
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.pug",
			filename: "index.html",
			chunks: [
				"common",
				"home"
			],
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		})
	],
	target: ["web", "es5"],
	resolve: {
		alias: {
			"@scss": path.resolve(__dirname, "src/assets/scss"),
			"@images": path.resolve(__dirname, "src/assets/images")
		},
		extensions: [".js", ".scss"],
		roots: [__dirname, root],
		modules: [path.resolve(__dirname, "src/assets"), "node_modules"]
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 0,
			cacheGroups: {
				vendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: false
			},
		},
	}
});