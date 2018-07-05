const serialize = require('babel-literal-to-ast')
const cssToRN = require('css-to-react-native-transform').default

function fallback(path, state, types) {
  const tag = path.get('tag')
  const quasi = path.get('quasi')
  if (!tag.node || !quasi.node) return

  console.warn(
    '[css-to-rn.macro] Unable to determine the value of your CSS string,',
    'fallback to `css-to-react-native-transform` import.',
  )

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
  const source = path.get('quasi').evaluate().value

  if (!source) {
    fallback(path, state, types)
    return
  }

  path.replaceWith(serialize(cssToRN(source, { parseMediaQueries: true })))
}
