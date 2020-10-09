import { useState } from 'react'
import { ErrorType, FieldHanderFunction, FieldType } from './@types'
import { checkErrors } from './helpers/errorChecking'
import { undefinedOnEmpty } from './helpers/typeguards'
import { convertBackToType } from './helpers/convertBackToType'

const useField = <T>(
  input: T,
  ...checkFunctions: Array<(...args: unknown[]) => unknown>
): [FieldType<T>, FieldHanderFunction, FieldHanderFunction] => {
  const [value, setValue] = useState(input)
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<ErrorType<T>[]>([])
  const [wasBlurred, setWasBlurred] = useState<boolean>(false)
  const [wasChanged, setWasChanged] = useState<boolean>(false)
  /* -------------------- 2. Handler functions definitions -------------------- */
  const handleChange: FieldHanderFunction = (event) => {
    const { name, value: eventValue, checked, type } = event.target
    const coeredBack = convertBackToType(eventValue, checked, type)
    setValue(coeredBack as T)
    setName(name)
    setErrors(checkErrors(value, name, checkFunctions))
    setWasChanged(true)
  }

  const handleBlur: FieldHanderFunction = (event) => {
    const { name, value: eventValue, checked, type } = event.target
    const coercedBack = convertBackToType(eventValue, checked, type)
    setValue(coercedBack as T)
    setName(name)
    setErrors(checkErrors(value, name, checkFunctions))
    setWasBlurred(true)
  }

  const field: FieldType<T> = {
    value,
    name,
    errors: undefinedOnEmpty(errors),
    wasBlurred,
    wasChanged,
  }

  return [field, handleChange, handleBlur]
}

export default useField
