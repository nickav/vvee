const vvee = require('../lib')
const { expect } = require('chai')

describe('custom', () => {
  const t = vvee.types
  const vv = vvee()

  describe('maybe', () => {
    /*it('works', () => {
      const obj = { foo: 10 }
      const def = { foo: t.Number, bar: t.Maybe(t.Number) }

      expect(vv(obj, def)).to.deep.eq({ foo: 10, bar: null })
      expect(vv(undefined, def)).to.deep.eq({ foo: 0, bar: null })
      expect(vv(undefined, t.Maybe('hello'))).to.deep.eq('hello')
    })*/
  })
})
