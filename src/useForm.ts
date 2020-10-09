import { FieldType, FormType } from './@types'
import { notUndefined } from './helpers/typeguards'
import { flatten } from './helpers/arrays'

const useForm = (...fields: FieldType<unknown>[]): FormType => {
  const groupedFields = fields.reduce(
    (fieldsObject, field) => Object.assign(fieldsObject, { [field.name]: { ...field } }),
    {},
  )
  return {
    fields: groupedFields,
    wasChanged: fields.some(({ wasChanged }) => wasChanged),
    wasBlurred: fields.some(({ wasBlurred }) => wasBlurred),
    allChanged: fields.every(({ wasChanged }) => wasChanged),
    allBlurred: fields.every(({ wasBlurred }) => wasBlurred),
    errors: flatten(fields.map(({ errors }) => errors).filter(notUndefined)),
  }
}

export default useForm
