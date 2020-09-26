import { ChangeEvent } from 'react'

/* -------------------------------------------------------------------------- */
/*                              1. Field Handling                             */
/* -------------------------------------------------------------------------- */

export type FieldType = {
  value: unknown
  name: string
  wasBlurred: boolean
  wasChanged: boolean
  errors?: ErrorType[]
}

// Event type for change function on field
export type FieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

// Handler Function type for change event
export type FieldHanderFunction = (event: FieldEvent) => void

/* -------------------------------------------------------------------------- */
/*                                2. Form Types                               */
/* -------------------------------------------------------------------------- */

export type FormType = {
  fields: {
    [fieldName: string]: FieldType
  }
  wasChanged: boolean
  wasBlurred: boolean
  allChanged: boolean
  allBlurred: boolean
  errors?: ErrorType[]
}

/* -------------------------------------------------------------------------- */
/*                              3. Error Handling                             */
/* -------------------------------------------------------------------------- */

export type ErrorType = {
  name: string // name of the input (from event)
  value: unknown // value of the input (from event)
  function: string // name of the check function which resulted in error
  error: typeof Error // error object thrown from the check function
  message: string // error.message (for quicker access instead of double deconstruct)
}
