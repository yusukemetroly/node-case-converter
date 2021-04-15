import _ from 'lodash'

export function matchTargetKeys (target: any, input: any, nest: string[] = []): any {
  const nestClone = nest.slice() // clone nest for each element

  if (_.isArray(target) && _.isArray(input)) {
    const newTarget = target[0] // use the first element as the target
    try {
      const output = input.map(element => {
        return matchTargetKeys(newTarget, element, [...nestClone, '']) // add '' to denote array
      })
      return output
    } catch (error) {
      return undefined
    }
  } else if (_.isPlainObject(target) && _.isPlainObject(input)) {
    try {
      const keys = Object.keys(target)
      const picked = _.pick(input, keys) as any
      const matchedInput =  _.mapValues(picked, (newInput, key) => {
        const newTarget: any = (target as any)[key]
        return matchTargetKeys(newTarget, newInput, [...nestClone, key])
      })
      if (Object.keys(matchedInput).length === 0) throw new Error('no key!')

      return JSON.parse(JSON.stringify(matchedInput)) // eliminate keys with no value (undefined)
    } catch (error) {
      return undefined
    }
  } else {
    const nestLength = nestClone.length
    const isRoot = (nestLength === 1)
    const isArray = nestClone[nestLength - 1] === ''

    if (typeof target !== typeof input) {
      if (isArray) throw new Error('different type')
      return undefined
    } else {
      return input
    }
  }
}


/**
 * @param object object to convert
 */
export function snakeCase (object: any) {
  const callback = (value: any, key: string) => _.snakeCase(key)

  const mapKeysDeep = (obj: any, cb: (value: any, key: string) => string): any => {
    if (_.isArray(obj)) {
      return obj.map(innerObj => mapKeysDeep(innerObj, cb));
    }
    else if (_.isPlainObject(obj)) {
      return _.mapValues(
        _.mapKeys(obj, cb),
        val => mapKeysDeep(val, cb),
      )
    } else {
      return obj;
    }
  }
  return mapKeysDeep(object, callback)
}


export function camelCase (object: any) {
  const callback = (value: any, key: string) => _.camelCase(key)

  const mapKeysDeep = (obj: any, cb: (value: any, key: string) => string): any => {
    if (_.isArray(obj)) {
      return obj.map(innerObj => mapKeysDeep(innerObj, cb));
    }
    else if (_.isPlainObject(obj)) {
      return _.mapValues(
        _.mapKeys(obj, cb),
        val => mapKeysDeep(val, cb),
      )
    } else {
      return obj;
    }
  }
  return mapKeysDeep(object, callback)

}
