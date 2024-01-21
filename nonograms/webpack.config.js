const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][contenthash].js',
		assetModuleFilename: '[name][ext]',
		clean: true, // Cleaning up the /dist folder
	},
	performance: {
		hints: false,
		maxAssetSize: 512000,
		maxEntrypointSize: 512000,
	},
	devServer: {
		// npx webpack serve запустить сервер // "Ctrl + c", остановить webpack-dev-сервер
		port: 9000,
		compress: true,
		hot: true,
		static: {
			directory: path.join(__dirname, 'dist'),
		},
	},
	module: {
		rules: [
			{ test: /\.svg$/, use: 'svg-inline-loader' },
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						// options: { modules: true },
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|eot|ttf|woff?2)$/i,
				type: 'asset',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Nonogram',
			filename: 'index.html',
			template: path.join(__dirname, 'src', 'template.html'),
		}),
	],
};