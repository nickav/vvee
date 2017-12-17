const types = require('./types')

const mapValues = (obj, valFn = (val, key, obj) => val) =>
  Object.keys(obj).reduce(
    (memo, key) => ((memo[key] = valFn(obj[key], key, obj)), memo),
    {}
  )

const baseSchema = {
  Function(x, def) {
    return def(x)
  },

  Array(x, def, vv) {
    x = Array.isArray(x) ? x : [x].filter(e => e)
    return x.map((e, i) => vv(x[i], def[i % def.length]))
  },

  Object(x, def, vv) {
    return mapValues(Object.assign({}, def, x), (v, k) => vv(x && x[k], def[k]))
  },

  undefined(x, def) {
    return x
  }
}

function vvee(schema) {
  // allow user to customize schema
  schema = Object.assign({}, baseSchema, schema)

  return function vv(data, definition) {
    // get the type of the definition
    const type =
      typeof definition === 'undefined'
        ? 'undefined'
        : definition.constructor.name

    //console.log('vv', type, data, definition)

    // apply the definition function for the given type
    return schema[type](data, definition, vv, { type })
  }
}

vvee.types = types

module.exports = vvee
