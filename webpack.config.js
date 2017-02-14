module.exports = {
	entry: './src/colorpicker.component.js',
	output: {
		filename: "colorpicker.js",
		path: "./lib",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: ['node_modules'],
				loader: 'babel-loader',
			}
		]
	}
}
