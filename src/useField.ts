import { useState } from 'react'
import { ErrorType, FieldEvent, FieldHanderFunction, FieldType } from './@types'
import { checkErrors } from './helpers/errorChecking'
import { undefinedOnEmpty } from './helpers/typeguards'

const useField = (
  input: unknown,
  ...checkFunctions: Array<(...args: unknown[]) => unknown>
): [FieldType, FieldHanderFunction, FieldHanderFunction] => {
  /* ----------------- 1. State and common const declarations ----------------- */
  const [value, setValue] = useState(input)
  const [errors, setErrors] = useState<ErrorType[]>([])
  const [wasBlurred, setWasBlurred] = useState<boolean>(false)
  const [wasChanged, setWasChanged] = useState<boolean>(false)
  /* -------------------- 2. Handler functions definitions -------------------- */
  const handleChange = (event: FieldEvent) => {
    const { name, value: eventValue } = event.target
    setValue(eventValue)
    setErrors(checkErrors(value, name, checkFunctions))
    setWasChanged(true)
  }

  const handleBlur = (event: FieldEvent) => {
    const { name, value: eventValue } = event.target
    setValue(eventValue)
    setErrors(checkErrors(value, name, checkFunctions))
    setWasBlurred(true)
  }

  const field: FieldType = {
    value,
    errors: undefinedOnEmpty(errors),
    wasBlurred,
    wasChanged,
  }

  return [field, handleChange, handleBlur]
}

export default useField
