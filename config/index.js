// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
const url = 'http://52.83.97.172:8003'
const url1 = 'http://127.0.0.1:8003'


module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    // productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build   -    -report`
    // Set to `true` or `false` t  o always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9527,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/auth': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/auth' : '/auth'
        }
      },
      '/upms': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/upms' : '/upms'
        }
      },
      '/basis': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/basis' : '/basis'
        }
      },
      '/stu': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/stu' : '/stu'
        }
      },
      '/vehicle': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/vehicle' : '/vehicle'
        }
      },
      '/visit': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/visit' : '/visit'
        }
      },
      '/activiti': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/activiti' : '/activiti'
        }
      },
      '/bespeak': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/bespeak' : '/bespeak'
        }
      },
      '/quartz': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/quartz' : '/quartz'
        }
      },
      '/oss': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/oss' : '/oss'
        }
      },
      '/visualization': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/visualization' : '/visualization'
        }
      },
      '/finance': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/finance' : '/finance'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
