import { ChangeEvent } from 'react'

/* -------------------------------------------------------------------------- */
/*                              1. Field Handling                             */
/* -------------------------------------------------------------------------- */

export type FieldType<T> = {
  value: T
  name: string
  wasBlurred: boolean
  wasChanged: boolean
  errors?: ErrorType<T>[]
}

// Event type for change function on field
export type FieldEvent<T> = ChangeEvent<
  { value: T; name: string } & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
>

// Handler Function type for change event
export type FieldHanderFunction<T> = (event: FieldEvent<T>) => void

/* -------------------------------------------------------------------------- */
/*                                2. Form Types                               */
/* -------------------------------------------------------------------------- */

export type FormType = {
  fields: {
    [fieldName: string]: FieldType<unknown>
  }
  wasChanged: boolean
  wasBlurred: boolean
  allChanged: boolean
  allBlurred: boolean
  errors?: ErrorType<unknown>[]
}

/* -------------------------------------------------------------------------- */
/*                              3. Error Handling                             */
/* -------------------------------------------------------------------------- */

export type ErrorType<T> = {
  name: string // name of the input (from event)
  value: T // value of the input (from event)
  function: string // name of the check function which resulted in error
  error: typeof Error // error object thrown from the check function
  message: string // error.message (for quicker access instead of double deconstruct)
}
