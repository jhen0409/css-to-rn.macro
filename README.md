# css-to-rn.macro [![NPM version](http://img.shields.io/npm/v/css-to-rn.macro.svg?style=flat)](https://www.npmjs.com/package/css-to-rn.macro) [![Build Status](https://travis-ci.org/jhen0409/css-to-rn.macro.svg?branch=master)](https://travis-ci.org/jhen0409/css-to-rn.macro) [![Greenkeeper badge](https://badges.greenkeeper.io/jhen0409/css-to-rn.macro.svg)](https://greenkeeper.io/)

> Convert CSS to React Native styles with [babel macros](https://github.com/kentcdodds/babel-plugin-macros), using [`css-to-react-native-transform`](https://github.com/kristerkari/css-to-react-native-transform).

- A lightweight way to write CSS for React Native
- Use CSS to write React Native styles without take startup time for parse in JS runtime
- Support editor plugin that detect `css` template literal like [`vscode-styled-components`](https://github.com/styled-components/vscode-styled-components)

## Installation

```bash
$ npm install --save-dev css-to-rn.macro
```

You'll also need to install and configure [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) if you haven't already.

## Example

Input:

```js
import { StyleSheet } from 'react-native'
import css from 'css-to-rn.macro'

const styles = StyleSheet.create(
  css`
    .container {
      flex: 1;
      justify-content: center;
      align-items: center;
    }
  `,
)
```

Output:

```js
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

## Media Queries support

The [`css-to-react-native-transform`](https://github.com/kristerkari/css-to-react-native-transform) allows parse the CSS Media Queries, and you can use it with [`react-native-css-media-query-processor`](https://github.com/kristerkari/react-native-css-media-query-processor)

This is example for change styles with platform:

```js
import { StyleSheet } from 'react-native'
import css, { parseMedia } from 'css-to-rn.macro'

const styles = StyleSheet.create(
  parseMedia(
    css`
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
    `,
    {
      /* match object of react-native-css-media-query-processor */
    },
  ),
)
```

## Limitations

- Currently doesn't support string substitution for template literal (`${}`), it will be fallback to [`css-to-react-native-transform`](https://github.com/kristerkari/css-to-react-native-transform) import. See [this snapshot](https://github.com/jhen0409/css-to-rn.macro/blob/7a58b38e4eb26b95f23c9a7a4f66ac35ff589df1/src/__tests__/__snapshots__/index.test.js.snap#L41-L82).

## License

[MIT](LICENSE.md)
