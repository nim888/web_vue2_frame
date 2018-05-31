var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = 8081;

// for (var k in config.entry) {
//     if (Array.isArray(config.entry[k])) {
//         config.entry[k].unshift('webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/dev-server', './src/assets/WebViewJavascriptBridge.js');
//     }
// }

//http://webpack.github.io/docs/webpack-dev-server.html#api
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: 'src/views/',
    host: '0.0.0.0',
    disableHostCheck: true,
    compress: true,

    stats: {
        colors: true
    }
}).listen(port, function(err, result) {
    if (err) console.log(err);
    console.log('Listening at localhost:' + port);
});