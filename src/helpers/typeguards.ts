export const undefinedOnEmpty = <T>(arr: T[]): T[] | undefined => (arr.length > 0 ? arr : undefined)

export const notUndefined = <T>(x: T | undefined): x is T => x !== undefined

export const notNull = <T>(x: T | null): x is T => x !== undefined
