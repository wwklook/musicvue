const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV !== 'development';
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
  },
  assetsDir: 'music_static',
  //publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
  productionSourceMap:false, 
    //   productionGzip: true,
    //   productionGzipExtensions: ['js', 'css' ,'svg'],
  
}