export interface CopyButtonProps {
  /**
   * @description Copied status timeout in ms
   * @default 1000
   */
  timeout?: number

  /**
   * @description Value that is copied to the clipboard when the button is clicked
   */
  value: string
}
