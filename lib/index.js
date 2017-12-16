const types = require('./types')

function vvvv(schema) {
  schema = Object.assign({}, types, schema)

  return function vv(data, definition) {
    if (typeof data === 'undefined') {
      data = vv(definition, definition)
    }

    const type =
      typeof definition === 'undefined'
        ? 'undefined'
        : definition.constructor.name

    // work
    return schema[type](data, definition, vv)
  }
}

module.exports = vvvv
