
export function throwIfUndefined(value: any, errorToThrow: Error): void {
  if (value === undefined) {
    throw errorToThrow;
  }
}

export function throwIfNotEqual<T extends string | number>(val1: T, val2: T, errorToThrow: Error): void {
  if (val1 !== val2) {
    throw errorToThrow;
  }
}