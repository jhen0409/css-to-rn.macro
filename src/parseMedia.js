const serialize = require('babel-literal-to-ast')

module.exports = function(path, state, types) {
  const parent = path.parentPath
  if (!types.isCallExpression(parent)) {
    return
  }
  path.replaceWith(
    state.addImport(
      'react-native-css-media-query-processor',
      'process',
      'parseMedia',
    ),
  )
  // if not provided `matchObject`, make an one
  if (parent.node.arguments.length === 1) {
    parent.node.arguments.push(serialize({}))
  }
}
