'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '301-5G医疗实验室' // page title

// 如果你的端口设置为 80，
// 使用管理员权限执行命令行。
// 例如 Mac：sudo npm run
// 可以通过以下方法更改端口：
// 端口 = 9528 npm run dev 或 npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// 所有配置项的解释都可以在 https://cli.vuejs.org/config/ 中找到
module.exports = {
  /**
    * 如果您计划将站点部署在子路径下，则需要设置 publicPath，
    * 例如 GitHub 页面。 如果您打算将站点部署到 https://foo.github.io/bar/，
    * 那么 publicPath 应该设置为“/bar/”。
    * 在大多数情况下，请使用 '/' !!!
    * 详情：https://cli.vuejs.org/config/#publicpath
    */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // 在 webpack 的 name 字段中提供应用程序的标题，以便
    // 可以在 index.html 中访问它以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 可以提高首屏速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略 runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面很多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
