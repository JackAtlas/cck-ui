interface GetRootClassNameInput {
  rootSelector: string
  selector: string
  className: string | undefined
}

export function getRootClassName({
  rootSelector,
  selector,
  className
}: GetRootClassNameInput) {
  return rootSelector === selector ? className : undefined
}
