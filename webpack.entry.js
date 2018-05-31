const entrys = {
    //入口页面
    index: { title: '首页', modules: ['./src/models/home/home.js'] },
};

module.exports.getEntryNames = _ => {
    return Object.keys(entrys);
};
module.exports.getEntrys = _ => {
    let result = {};
    Object.keys(entrys).forEach(key => result[key] = entrys[key].modules);
    return result;
};
module.exports.getHtmlWebpackPlugins = _ => {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    let result = [];

    Object.keys(entrys).forEach(key => result.push(new HtmlWebpackPlugin({
        title: entrys[key].title,
        chunks: ['common', key],
        filename: `./src/views/${ entrys[key].view || key + '.html' }`,
        template: './src/views/template.html',
        inject: 'body',
    })));

    return result;
};