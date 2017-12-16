vvvv
========================================
Dead simple object schema parsing.

`{}, {}` -> `{}`

## Install

```bash
yarn add vee
```

```javascript
const vvvv = require('vvvv')
const v = vvvv() // use default schema

const definition = {
  x: Number,
  y: 'default value',
  numbers: [ Number ],
  arrays: [ [] ]
}

const data = {
  x: '1',
  y: 0,
  numbers: [ false ]
}

console.log(v(data, schema)) /* prints:
{
  x: 1,
  y: '0',
  numbers: [ 0 ],
  arrays: [ [] ]
}
*/
```

### Development

To publish a new version of the package, install [np][np] then run:

```bash
np
```

[prettier]: https://github.com/prettier/prettier
[np]: https://github.com/sindresorhus/np
[yarn-install]: https://yarnpkg.com/lang/en/docs/install/
