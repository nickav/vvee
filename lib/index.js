const { object } = require('hibar')

const coerceTypes = {
  Number: x => ~~x,
  String: x => `${x}`,
  Boolean: x => !!x,
  Array: x => (Array.isArray(x) ? x : [x]),
  undefined: x => x
}

function vee(data, definition) {
  // strict or lose mode will either cut this or keep it
  if (typeof definition === 'undefined') {
    return data
  }

  if (typeof data === 'undefined') {
    // can't object assign here to ensure any functions get applied
    data = vee(definition)
  }

  if (Array.isArray(definition)) {
    data = coerceTypes.Array(data)
    return data.map((e, i) => vee(data[i], definition[i % definition.length]))
  }

  if (typeof definition === 'object') {
    return object.mapValues(definition, (v, k) => vee(data[k], definition[k]))
  }

  const type = definition.constructor.name
  //console.log('type', type, data, definition)

  // apply function
  if (typeof definition === 'function') {
    return definition(data, vee, coerceTypes)
  }

  return coerceTypes[type](data)
}

module.exports = vee
