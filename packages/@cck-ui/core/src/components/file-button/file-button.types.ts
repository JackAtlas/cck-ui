import { ElementProps } from '../../core'

export interface FileButtonProps {
  /**
   * @description If set, user can pick more than one file
   */
  multiple?: boolean

  /**
   * @description File input accept attribute, for example, `"image/png,image/jpeg"`
   */
  accept?: string

  /**
   * @description Input name attribute
   */
  name?: string

  /**
   * @description Input form attribute
   */
  form?: string

  /**
   * @description Disables file picker
   */
  disabled?: boolean

  /**
   * @description Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute.
   */
  capture?: boolean | 'user' | 'environment'

  /**
   * @description Passes down props to the input element used to capture files
   */
  inputProps?: ElementProps<'input'>
}
