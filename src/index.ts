import _ from 'lodash'


/**
 * @param object object to convert
 */
export function snakeCase (object: any) {
  const callback = (value: any, key: string) => _.snakeCase(key)

  const mapKeysDeep = (obj: any, cb: (value: any, key: string) => string): any => {
    if (_.isArray(obj)) {
      return obj.map(innerObj => mapKeysDeep(innerObj, cb));
    }
    else if (_.isObject(obj)) {
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
    else if (_.isObject(obj)) {
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
