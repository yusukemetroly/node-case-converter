import { describe } from 'mocha'
import * as chai from 'chai'
import {snakeCase, camelCase} from '../src/index'

const assert = chai.assert
const expect = chai.expect

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
