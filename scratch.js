const vvee = require('./lib')
const { types: t } = vvee

const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value)

// test
const def = {
  string: t.OneOf('a', 'b'),
  number: x => 0,
  boolean: t.compose(t.Maybe(t.Boolean), t.Default(true)),
  array: [x => x * x],
  object: {
    string: x => '',
    number: x => 10
  }
}

const data = {
  string: 'a',
  number: -1,
  boolean: null
}

const result = vvee()(data, def)
console.log(result)
