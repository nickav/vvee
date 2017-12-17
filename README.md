vvee
========================================
Dead-simple object schema parsing.

`vvee()({}, {})` -> `{}`

## Install

[Install yarn][yarn-install]. Then:
```bash
yarn add vvee
```

## Example

```javascript
const vvee = require('vvee')
const { types: t } = vvee

const def = {
  string: t.OneOf('a', 'b'),
  number: x => 0,
  boolean: t.compose(t.Maybe(t.Boolean), t.Default(true)),
  array: [x => x * x],
  object: {
    string: t.compose(t.String, t.Default('stringy')),
    number: t.compose(t.Number, x => x + 10, t.Default(0))
  }
}

const data = {
  string: 'a',
  number: -1,
  boolean: null
}

const result = vvee()(data, def)
console.log(result)
```

## API

`vvee(schema: Object?)` - Creates a new parser with the given schema, or just
use the defaults. You can override all behavior by providing your own
[custom schema](/lib/index.js#L9). This returns:

`vee(data: Object, definition: Object)` - Given data and a type definition,
parses data returning a new object.


### Development

To publish a new version of the package, install [np][np] then run:

```bash
np
```

[prettier]: https://github.com/prettier/prettier
[np]: https://github.com/sindresorhus/np
[yarn-install]: https://yarnpkg.com/lang/en/docs/install/
