const { createMacro } = require('babel-plugin-macros')
const transform = require('./transform')
const parseMedia = require('./parseMedia')

function cssToRNMacro({
  references: { default: defaultRefs, parseMedia: mediaRefs = [] },
  state,
  babel: { types: t },
}) {
  // Case: CSS to RN
  defaultRefs.forEach(referencePath => transform(referencePath.parentPath))

  // Case: parseMedia -> react-native-css-media-query-processor
  mediaRefs.forEach(referencePath => parseMedia(referencePath, state))
}

module.exports = createMacro(cssToRNMacro)
