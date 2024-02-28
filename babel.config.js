module.exports = api => {
	api.cache(true);

	return {
		"presets": [
			["@babel/preset-env", {
				targets: [
					"last 1 version",
					"> 1%",
					"not dead"
				],
				useBuiltIns: "usage",
				corejs: 3
			}]
		]
	}
}