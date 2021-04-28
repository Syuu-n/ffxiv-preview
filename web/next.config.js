const withLess = require("next-with-less")
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8')
)

module.exports = withLess({
  future: {
    webpack5: true,
  },

  lessOptions: {
    modifyVars: themeVariables,
  },
});