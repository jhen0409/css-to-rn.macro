const { createMacro } = require('babel-plugin-macros')
const transform = require('./transform')

function cssToRNMacro({
  references: { default: defaultRefs },
  state: {
    file: {
      opts: { filename },
    },
  },
  babel: { types: t },
}) {
  defaultRefs.forEach(referencePath => transform(referencePath.parentPath))
}

module.exports = createMacro(cssToRNMacro)
