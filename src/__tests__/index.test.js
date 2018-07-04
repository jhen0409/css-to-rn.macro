const pluginTester = require('babel-plugin-tester')
const plugin = require('babel-plugin-macros')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  tests: [
    `
import { StyleSheet } from 'react-native';
import css from '../macro';
const styles = StyleSheet.create(
  css\`
    .container {
      flex: 1;
      justify-content: center;
      align-items: center;
    }
    .text {
      font-size: 18;
      color: black;
    }
  \`
);
    `,
    `
import { StyleSheet } from 'react-native'
import css, { parseMedia } from 'css-to-rn.macro'

const styles = StyleSheet.create(
  parseMedia(
    css\`
      .container {
        flex: 1;
        justify-content: center;
        align-items: center;
      }
      @media not android {
        .container {
          background-color: #ccc;
        }
      }
    \`,
    {
      /* match object of react-native-css-media-query-processor */
    },
  ),
)
parseMedia(css\`@media not android { .container { flex: 1; } }\`)
    `,
  ],
})
