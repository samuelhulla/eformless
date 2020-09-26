/**
 * Flattens nested array - an `Array.prototype.flat()` polyfill
 * @param arr Array to flatten
 * @returns Array flattened by one level
 */
export const flatten = <T>(arr: T[][]): T[] => arr.reduce((acc, val) => acc.concat(val), [])
