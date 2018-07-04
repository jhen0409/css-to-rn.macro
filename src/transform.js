const serialize = require('babel-literal-to-ast')
const cssToRN = require('css-to-react-native-transform').default

function fallback(path, state, types) {
  const tag = path.get('tag')
  const quasi = path.get('quasi')
  path.replaceWith(
    types.callExpression(
      state.addImport(
        'css-to-react-native-transform',
        'default',
        tag.node.name,
      ),
      [quasi.node, serialize({ parseMediaQueries: true })],
    ),
  )
}

module.exports = function(path, state, types) {
  const tagPath = path.get('quasi')

  const expressions = tagPath.get('expressions')
  if (expressions.length) {
    console.warn(
      "[css-to-rn.macro] Currently this plugin doesn't support string substitution in css-to-rn template literal, fallback to `css-to-react-native-transform` import.",
    )
    fallback(path, state, types)
    return
  }

  const source = tagPath.node.quasis.reduce(
    (head, quasi, index) => head + quasi.value.raw,
    '',
  )
  path.replaceWith(serialize(cssToRN(source, { parseMediaQueries: true })))
}
