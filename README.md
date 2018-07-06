# css-to-rn.macro [![NPM version](http://img.shields.io/npm/v/css-to-rn.macro.svg?style=flat)](https://www.npmjs.com/package/css-to-rn.macro) [![Build Status](https://travis-ci.org/jhen0409/css-to-rn.macro.svg?branch=master)](https://travis-ci.org/jhen0409/css-to-rn.macro) [![Greenkeeper badge](https://badges.greenkeeper.io/jhen0409/css-to-rn.macro.svg)](https://greenkeeper.io/)

> Convert CSS to React Native style sheet at build time with [babel macros](https://github.com/kentcdodds/babel-plugin-macros), using [`css-to-react-native-transform`](https://github.com/kristerkari/css-to-react-native-transform).

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

The [`css-to-react-native-transform`](https://github.com/kristerkari/css-to-react-native-transform) allow parsing the CSS Media Queries, and you can use it with [`react-native-css-media-query-processor`](https://github.com/kristerkari/react-native-css-media-query-processor)

This is example for change styles with platform:

```js
import { Dimensions, StyleSheet } from 'react-native'
import css, { parseMedia } from 'css-to-rn.macro'

const win = Dimensions.get("window")
const matchObj = {
  width: win.width,
  height: win.height,
  orientation: win.width > win.height ? "landscape" : "portrait",
  "aspect-ratio": win.width / win.height,
  type: "screen"
}
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
    matchObj
  ),
)
```

## Limitations

#### Unable to parse unknown values in CSS template literal, for example:

```js
const height = Math.random() * 100
css`
  .container {
    height: ${height};
  }
`
```

Due to the `height` is random number, so it's unknown value at build time.

It will just fallback to [`css-to-react-native-transform`](https://github.com/kristerkari/css-to-react-native-transform) with a warning, but you can still use this macro.

## License

[MIT](LICENSE.md)
