const serialize = require('babel-literal-to-ast')

module.exports = function(path, state) {
  path.replaceWith(
    state.addImport(
      'react-native-css-media-query-processor',
      'process',
      'parseMedia',
    ),
  )
}
