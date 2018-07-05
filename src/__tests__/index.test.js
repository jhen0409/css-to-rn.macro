const pluginTester = require('babel-plugin-tester')
const plugin = require('babel-plugin-macros')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  tests: {
    'Convert styles successfully': `
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
    'Convert styles with known value of string substitution successfully': `
import { StyleSheet } from 'react-native';
import css from '../macro';

let height = 100;
const h = height;

const styles = StyleSheet.create(
  css\`
    .container {
      flex: 1;
      height: \${h};
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
    'Fallback to `css-to-react-native-transform` import with unknown value of string substitution': `
import { StyleSheet } from 'react-native';
import css from '../macro';

let height = Math.random() * 100;
const h = height;

const styles = StyleSheet.create(
  css\`
    .container {
      flex: 1;
      height: \${h};
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
    'parseMedia successfully': `
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
parseMedia
    `,
  },
})
