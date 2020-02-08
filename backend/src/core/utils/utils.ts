
export function throwIfUndefined(value: any, errorToThrow: Error): void {
  if (value === undefined) {
    throw errorToThrow;
  }
}