const serialize = require('babel-literal-to-ast')
const cssToRN = require('css-to-react-native-transform').default

module.exports = function(path) {
  const tagPath = path.get('quasi')

  const expressions = tagPath.get('expressions')
  if (expressions.length) {
    throw new Error(
      `Currently this plugin doesn't support string substitution in css-to-rn template literal.`,
    )
  }

  const source = tagPath.node.quasis.reduce(
    (head, quasi, index) => head + quasi.value.raw,
    '',
  )
  path.replaceWith(serialize(cssToRN(source)))
}
