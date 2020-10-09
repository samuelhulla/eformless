/**
 * Due to `React.ChangeEvent<T>` hard-coercing all `<input>` values to typeof string we are forced
 * to coerce the values back manually in this hackish way
 * @type The attributes here reflect what is defined in
 * `typescript/lib.dom.d.ts` `HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement`
 * @param value {string} The value passed from `<input>`
 * @param checked {boolean} The checked property of `<input>`
 * @param type {string} passed type attribute (default type="text")
 */
export const convertBackToType = (value: string, checked: boolean, type: string): unknown => {
  switch (type) {
    // numerics
    case 'number':
    case 'range':
      return Number(value)
    // booleans
    case 'checkbox':
    case 'radio':
      return checked
    // dates
    case 'date':
    case 'datetime-local':
      return new Date(value)
    // Corner case - Unsupported type
    case 'file':
    case 'image':
    case 'button':
    case 'reset':
    case 'hidden':
    case 'submit':
      throw Error(`The type of ${type} is unsupported as it an uncontrolled type in React.
      Please refer to: https://reactjs.org/docs/uncontrolled-components.html for more info.
      
      This likely is a mistake and you did not intend to pass onChange / onBlur handler here in
      the first place`)
    // Corner case - Deprecated type
    case 'datetime':
      throw Error("Detected deprecated input type 'datetime'. Use 'datetime-local' instead")
    // represents all the remaining <input type=""> attributes, all of them are string
    default:
      return value
  }
}
