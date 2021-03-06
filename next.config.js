const withCss = require("@zeit/next-css");
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')

const webpackConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\.css*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
}

const lessOptions = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    modules: true,
    localIdentName: "[folder]_[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  ...webpackConfig
};

module.exports = withCss(withLess(lessOptions))