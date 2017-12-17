const vvee = require('../lib')
const t = vvee.types
const vee = vvee()
const { expect } = require('chai')

describe('vvee', () => {
  describe('primitive types', () => {
    it('number', () => {
      expect(vee('1', t.Number)).to.eq(1)
      expect(vee(1, t.Number)).to.eq(1)
      expect(vee('', t.Number)).to.eq(0)
      expect(vee(Infinity, t.Number)).to.eq(Infinity)
    })

    it('string', () => {
      expect(vee('1', t.String)).to.eq('1')
      expect(vee(0, t.String)).to.eq('0')
      expect(vee(undefined, t.String)).to.eq('')
    })

    it('boolean', () => {
      expect(vee('', t.Boolean)).to.eq(false)
      expect(vee(1, t.Boolean)).to.eq(true)
      expect(vee(0, t.Boolean)).to.eq(false)
    })

    it('function', () => {
      expect(vee(1, x => x + 100)).to.eq(101)
      expect(vee({ a: 0 }, { a: x => 10 })).to.deep.eq({ a: 10 })
      expect(vee(undefined, x => 'hey')).to.eq('hey')
    })
  })

  describe('array', () => {
    it('coerces to truthy array', () => {
      expect(vee(0, [])).to.deep.eq([])
      expect(vee(1, [])).to.deep.eq([1])
      expect(vee([], [])).to.deep.eq([])
      expect(vee(undefined, [])).to.deep.eq([])
    })

    it('nested', () => {
      expect(vee(1, [[t.Number]])).to.deep.eq([[1]])
      expect(vee([0], [[t.Number]])).to.deep.eq([[]])
      expect(vee([[0]], [[t.Number]])).to.deep.eq([[0]])
    })

    it('coerces each value in the array', () => {
      expect(vee([1, 2, 3], [t.String])).to.deep.eq(['1', '2', '3'])
      expect(vee(['1', '2', '3'], [t.Number])).to.deep.eq([1, 2, 3])
    })

    it('wraps around', () => {
      const given = [2, 2, 1, 1]
      const expected = [2, '2', 1, '1']
      expect(vee(given, [t.Number, t.String])).to.deep.eq(expected)
    })
  })

  describe('object', () => {
    it('kitchen sink', () => {
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

      const expected = {
        string: 'a',
        number: 0,
        boolean: null,
        array: [],
        object: { string: 'stringy', number: 10 }
      }

      const result = vee(data, def)
      expect(result).to.deep.eq(expected)
    })

    it('when type mismatch', () => {
      expect(vee(0, { a: t.Number })).to.deep.eq({ a: 0 })
      expect(vee(undefined, {})).to.deep.eq({})
      expect(vee(false, {})).to.deep.eq({})
      expect(vee('', {})).to.deep.eq({})
    })

    it('when missing', () => {
      const extra = { foo: 'bar' }
      expect(vee(extra, {})).to.deep.eq(extra)
      expect(vee({}, { foo: t.String })).to.deep.eq({ foo: '' })
    })
  })
})
