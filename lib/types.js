const mapValues = (obj, valFn = (val, key, obj) => val) =>
  Object.keys(obj).reduce(
    (memo, key) => ((memo[key] = valFn(obj[key], key, obj)), memo),
    {}
  )

module.exports = {
  Number: x => ~~x,

  String: x => `${x}`,

  Boolean: x => !!x,

  Function: (x, def) => def(x),

  Array: (x, def, vv) => {
    const coereceArray = x => (Array.isArray(x) ? x : [x])
    x = coereceArray(x)
    return x.map((e, i) => vv(x[i], def[i % def.length]))
  },

  Object: (x, def, vv) =>
    mapValues(Object.assign({}, def, x), (v, k) => vv(x && x[k], def[k])),

  undefined: (x, def) => x,

  default: (x, def, vv) => (typeof def !== 'function' ? vv(def, def) : x)

  //None: () => null,

  //Maybe: typeof x === 'undefined' ? () => null : type(x, def, vv)
}
