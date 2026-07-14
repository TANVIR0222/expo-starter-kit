type MapFn<T = unknown, R = unknown> = (val: T) => R

const deepMap = <T = unknown, R = unknown>(
  obj: unknown,
  fn: MapFn<T, R>
): unknown => {
  const deepMapper = (val: unknown): unknown =>
    isObject(val) ? deepMap(val, fn) : fn(val as T)

  if (Array.isArray(obj)) {
    return obj.map(deepMapper)
  }
  if (isObject(obj)) {
    return mapObject(obj as Record<string, unknown>, deepMapper)
  }
  return obj
}

const mapObject = (
  obj: Record<string, unknown>,
  fn: (val: unknown) => unknown
): Record<string, unknown> =>
  Object.keys(obj).reduce<Record<string, unknown>>((res, key) => {
    res[key] = fn(obj[key])
    return res
  }, {})

const isObject = (myVar: unknown): boolean =>
  Boolean(myVar) && typeof myVar === "object"

export default deepMap
