const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    stats: 'errors-only',
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: {
        entry: [
            'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr', // webpack热更新插件，就这么写
            './src/main.js', // 项目入口
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 将文件打包到此目录下
        publicPath: process.env.PUB_PATH || '', // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    devtool: 'inline-source-map', // 报错的时候在控制台输出哪一行报错
    context: __dirname,
    module: {
        rules: [
            {
                // .js .jsx用babel解析
                test: /\.js?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    'babel-loader?cacheDirectory',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                // .less 解析
                test: /\.(less|css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                // More information here https://webpack.js.org/guides/asset-modules/
                type: 'asset',
            },

        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '~': path.resolve(__dirname, 'src'),
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.PUB_PATH': JSON.stringify(process.env.PUB_PATH || ''),
        }),
        new HtmlWebpackPlugin({
            // 根据模板插入css/js等生成最终HTML
            filename: 'index.html', // 生成的html存放路径，相对于 output.path
            template: './src/index.ejs', // html模板路径
            // favicon: "./public/favicon.ico", // 自动把根目录下的favicon.ico图片加入html
            inject: true, // 是否将js放在body的末尾
        }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all', // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
            minSize: 0,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            cacheGroups: {
                async: {
                    chunks: 'async',
                    minSize: 3000,
                    minChunks: 2,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    priority: -1,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'commons',
                    chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    reuseExistingChunk: true,
                    priority: 1,
                    minChunks: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/](@babel|core-js|css-loader|style-loader|webpack-hot-middleware|ansi-html|html-entities|querystring)/,
                },

                vendors: {
                    name: 'vendors',
                    chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    reuseExistingChunk: true,
                    priority: 0,
                    minChunks: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                },

            },
        },
    },
};
