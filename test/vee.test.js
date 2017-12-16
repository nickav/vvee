const vee = require('../lib')()
const { expect } = require('chai')

describe('vee', () => {
  describe('primitive types', () => {
    it('number', () => {
      expect(vee('1', 1)).to.eq(1)
      expect(vee(1, 1)).to.eq(1)
      expect(vee(1, 0)).to.eq(1)
      expect(vee('', Number)).to.eq(0)
    })

    it('string', () => {
      expect(vee('1', '1')).to.eq('1')
      expect(vee(1, '1')).to.eq('1')
      expect(vee(0, '1')).to.eq('0')
    })

    it('boolean', () => {
      expect(vee('', true)).to.eq(false)
      expect(vee(1, true)).to.eq(true)
      expect(vee(0, false)).to.eq(false)
    })

    it('function', () => {
      expect(vee(1, x => x + 100)).to.eq(101)
      expect(vee({ a: 0 }, { a: x => 10 })).to.deep.eq({ a: 10 })
      expect(vee(undefined, x => 'hey')).to.eq('hey')
    })
  })

  describe('array', () => {
    it('simple', () => {
      expect(vee(0, [])).to.deep.eq([0])
      expect(vee([], [])).to.deep.eq([])
      expect(vee(undefined, [])).to.deep.eq([])
    })

    it('nested', () => {
      expect(vee(1, [[0]])).to.deep.eq([[1]])
      expect(vee([0], [[0]])).to.deep.eq([[0]])
      expect(vee([], [[0]])).to.deep.eq([])
    })

    it('coerces each value in the array', () => {
      expect(vee([1, 2, 3], ['1'])).to.deep.eq(['1', '2', '3'])
      expect(vee(['1', '2', '3'], [1])).to.deep.eq([1, 2, 3])
    })

    it('wraps around', () => {
      expect(vee([1, 2, 1, 2], [Number, String])).to.deep.eq([1, '2', 1, '2'])
    })
  })

  describe('object', () => {
    it('kitchen sink', () => {
      const definition = {
        string: 'Hello, sir',
        number: 800,
        boolean: false,
        array: [1],
        object: {
          string: '',
          number: 10
        }
      }

      const data = {}
      expect(vee(data, definition)).to.deep.eq(definition)
    })

    it('simple', () => {
      expect(vee(0, { a: 10 })).to.deep.eq({ a: 10 })
      expect(vee({}, { a: 1 })).to.deep.eq({ a: 1 })
      expect(vee(undefined, {})).to.deep.eq({})
      expect(vee(false, {})).to.deep.eq({})
      expect(vee('', {})).to.deep.eq({})
    })
  })
})
