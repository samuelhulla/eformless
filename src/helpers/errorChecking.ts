import { ErrorType } from '../@types'
import { notNull } from './typeguards'

export const invokeCheckFunction = (
  value: unknown,
  name: string,
  checkFunction: (...args: unknown[]) => unknown,
): ErrorType | null => {
  try {
    // we attempt invoking check function, if it passes (is OK), returns null
    checkFunction(value)
    return null
  } catch (error) {
    return {
      name,
      value,
      function: checkFunction.name,
      error: error,
      message: error.message,
    }
  }
}

export const checkErrors = (
  value: unknown,
  name: string,
  checkFunctions: Array<(...args: unknown[]) => unknown>,
): ErrorType[] => {
  const errors = checkFunctions.map((callback) => invokeCheckFunction(value, name, callback))
  return errors.filter(notNull)
}
