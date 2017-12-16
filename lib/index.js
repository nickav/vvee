const types = require('./types')

function vvee(schema) {
  // allow user to customize schema
  schema = Object.assign({}, types, schema)

  return function vv(data, definition) {
    //console.log('vvvv', data, definition)
    // get the type of the definition
    const type =
      typeof definition === 'undefined'
        ? 'undefined'
        : definition.constructor.name

    // if data is undefined, fill it with data from definition
    if (typeof data === 'undefined') {
      data = schema.default(data, definition, vv)
    }

    //console.log('vv', type, data, definition)

    // apply the definition function for the given type
    return schema[type](data, definition, vv)
  }
}

vvee.types = types

module.exports = vvee
