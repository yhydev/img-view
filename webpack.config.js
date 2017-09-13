var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: {
    	index:"./src/js/index.js"/*,
        jquery:"./node_modules/jquery/dist/jquery.js"*/
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist")
    },
    externals: {
      jQuery:"$"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "src/index.html",
            filename:"index.html", 
            chunksSortMode: 'manual',
            inject:"head",
            chunks:["index"],
        })
    ],module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/,loader:"style-loader!css-loader!sass-loader"},
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'},
            { test: /\.html$/,loader:"html-loader"},
        ]
    }

}



