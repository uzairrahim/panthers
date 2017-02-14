'use strict';

var autoPrefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV || 'production';
var jsQuery = {};
var production = env === 'production';
var devTool = production ? 'cheap-module-source-map' : 'inline-source-map';
var devPort = 5000;
var publicPath = production ? './public/js/' : null;
var entry = ['./src/js/index.js'];

var plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(env)
		}
	}),
];

// Production
if(production){
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		})
	);
// Development
}else{
	plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);

	entry.unshift('webpack/hot/only-dev-server');
	entry.unshift('webpack-dev-server/client?http://localhost:'+devPort);

	jsQuery = {
		presets: ['react-hmre']
	}
}

module.exports = {
	context: __dirname,
	devServer: {
		contentBase: './dev',
		compress: true,
		hot: true,
		noInfo: false,
		port: devPort,
		proxy : {
			'/api/*' : {
				target: 'http://localhost:3000',
				secure: false
			}
		}
	},
	devtool: devTool,
	entry: entry,
	module: {
		preLoaders: [{
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: 'eslint'
		}],
		loaders: [
			{
				test: /\.js$|\.jsx$/,
				exclude: ['node_modules/'],
				include: [
					path.resolve(__dirname, './')
				],
				loader: 'babel',
				query: jsQuery
			},
			{
				test: /\.css/,
				loaders: ["style-loader", "css-loader"]
			},
			{
				test: /\.sass|\.scss$/,
				loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
			},
			{
                test: /\.png|\.jpg|\.gif|\.svg|\.ttf|\.woff2|\.woff|\.eot|\.json/,
				loader: 'file-loader?name=[name].[ext]'
			}
		]
	},
	output: {
		path: path.join(__dirname, './public/js/'),
		publicPath: publicPath,
		filename: '[name].min.js'
	},
	plugins: plugins,
	postcss: function(){
		return [
			autoPrefixer({
				browsers: ['last 2 versions']
			})
		];
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.es6', '.scss', '.css'],
		root: [
			path.resolve('./src/img'),
			path.resolve('./src/js'),
			path.resolve('./src/scss')
		]
	}
}
