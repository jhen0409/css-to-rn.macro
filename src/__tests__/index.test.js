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
  ],
})
