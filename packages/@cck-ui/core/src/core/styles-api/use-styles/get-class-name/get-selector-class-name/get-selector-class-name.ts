interface GetSelectorClassNameInput {
  selector: string
  classes: Record<string, string>
  unstyled: boolean | undefined
}

export function getSelectorClassName({ selector, classes, unstyled }: GetSelectorClassNameInput) {
  return unstyled ? undefined : classes[selector]
}
