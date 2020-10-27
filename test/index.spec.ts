import { describe } from 'mocha'
import * as chai from 'chai'
import {snakeCase, camelCase, matchTargetKeys} from '../src/index'

const assert = chai.assert
const expect = chai.expect

describe('object-manipulator', () => {
  it('should reduce the keys to match the taret', () => {
    const targetObject = {
      a: 1,
      c: {
        c1: 1,
        c3: {
          c32: 1
        },
        c4: [1],
        c5: ['a'],
        c6: [
          {
            c61: 1,
          }
        ]
      },
      d: 'a'
    }

    const inputObject = {
      a: 1,
      b: 1, // remove
      c: {
        c1: 1,
        c2: 2, // remove
        c3: { // remove because childless
          c31: 1 // remove
        },
        c4: [ 1,2,3],
        c5: [ 1,2,3], // remove because different type
        c6: [
          {
            c61: 1,
            c62: 2, // remove
          },
          {
            c61: 1,
            c62: 2, // remove
          }
        ]
      },
      d: 1 // remove because different type
    }

    const matchedObject: any = matchTargetKeys(targetObject, inputObject)
    expect(matchedObject['a']).to.equal(1)
    expect(matchedObject['b']).to.equal(undefined)
    expect(matchedObject['c']['c1']).to.equal(1)
    expect(matchedObject['c']['c2']).to.equal(undefined)
    expect(matchedObject['c']['c4']).to.be.instanceOf(Array)
    expect(matchedObject['c']['c5']).to.equal(undefined)
    expect(matchedObject['c']['c6'][0]['c61']).to.equal(1)
    expect(matchedObject['c']['c6'][0]['c62']).to.equal(undefined)
    expect(matchedObject['c']).to.not.have.property('c5')
    expect(matchedObject['c']).to.not.have.property('c3')
    expect(matchedObject).to.not.have.property('d')
  })
})

describe('case-converter', () => {
  it('should convert case to snake case', () => {

    const camelObject = {
      myKey1: 1,
      myKey2: {
        myKey3: 4
      },
      myKey4: [1,3,4,5],
      myKey5: [
        {myKey6: 1},
        {myKey6: 2},
        {myKey6: 3},
      ]
    }

    const snakeObject = snakeCase(camelObject)
    expect(snakeObject['my_key_1']).to.equal(1)
    expect(snakeObject['my_key_2']['my_key_3']).to.equal(4)
    expect(snakeObject['my_key_4'][0]).to.equal(1)
    expect(snakeObject['my_key_5'][0]['my_key_6']).to.equal(1)
  })

  it('should convert case to camel case', () => {

    const snakeObject = {
      my_key_1: 1,
      my_key_2: {
        my_key_3: 4
      },
      my_key_4: [1,3,4,5],
      my_key_5: [
        {my_key_6: 1},
        {my_key_6: 2},
        {my_key_6: 3},
      ]
    }

    const camelObject = camelCase(snakeObject)
    expect(camelObject['myKey1']).to.equal(1)
    expect(camelObject['myKey2']['myKey3']).to.equal(4)
    expect(camelObject['myKey4'][0]).to.equal(1)
    expect(camelObject['myKey5'][0]['myKey6']).to.equal(1)
  })

})
