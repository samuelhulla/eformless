import { useState } from 'react'
import { ErrorType, FieldEvent, FieldHanderFunction, FieldType } from './@types'
import { checkErrors } from './helpers/errorChecking'
import { undefinedOnEmpty } from './helpers/typeguards'

const useField = <T>(
  input: T,
  ...checkFunctions: Array<(...args: unknown[]) => unknown>
): [FieldType<T>, FieldHanderFunction<T>, FieldHanderFunction<T>] => {
  const [value, setValue] = useState(input)
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<ErrorType<T>[]>([])
  const [wasBlurred, setWasBlurred] = useState<boolean>(false)
  const [wasChanged, setWasChanged] = useState<boolean>(false)
  /* -------------------- 2. Handler functions definitions -------------------- */
  const handleChange = (event: FieldEvent<T>) => {
    const { name, value: eventValue } = event.target
    setValue(eventValue)
    setName(name)
    setErrors(checkErrors(value, name, checkFunctions))
    setWasChanged(true)
  }

  const handleBlur = (event: FieldEvent<T>) => {
    const { name, value: eventValue } = event.target
    setValue(eventValue)
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
