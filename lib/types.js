function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

module.exports = {
  compose,

  Number: (x, def) => parseFloat(x, 10),

  String: (x, def) => `${x}`,

  Boolean: x => !!x,

  Integer: (x, def) => ~~x,

  Default: val => x => (typeof x === 'undefined' ? val : x),

  Maybe: fn => x => (typeof x === undefined || x === null ? null : fn(x)),

  OneOf: (...vals) => x => (vals.includes(x) ? x : undefined)
}
