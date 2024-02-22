const path = require("path");
const root = path.resolve(__dirname, './src');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		common: "./src/assets/js/common.js",
		home: "./src/assets/js/page-home.js"
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: (pathData) => {
			if(pathData.chunk.name === 'common') {
				return './assets/js/[name].js';
			} else {
				return './assets/js/page-[name].js';
			}
		},
		assetModuleFilename: (pathData) => {
			const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
			return `${filepath}/[name][ext]`;
		}
	},
	devServer: {
		static: path.resolve(__dirname, 'src'),
	},
	// watch: true,
	// watchOptions: {
	// 	aggregateTimeout: 600,
	// 	ignored: /node_modules/,
	// },
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					// "style-loader", // htmlに出力
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
					"sass-loader", // scss -> css
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
				// use: [
				// 	{
				// 		loader: "image-webpack-loader",
				// 		options: {
				// 			mozjpeg: {
				// 				progressive: true,
				// 				quality: 65,
				// 			},
				// 		},
				// 	}
				// ]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "./assets/css/[name].css",
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.pug",
			filename: "index.php",
			chunks: [
				"common",
				"home"
			],
			minify: {
				removeComments: true, // HTMLコメントを削除
				collapseWhitespace: true, // 空白を圧縮
			},
		}),
	],

	// resolve: {
	// 	roots: [__dirname, root],
	// },
	target: ["web", "es5"],


};