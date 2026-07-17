interface GetStaticClassNamesInput {
  themeName: string[]
  selector: string
  classNamesPrefix: string
  withStaticClass?: boolean
}

export function getStaticClassNames({
  themeName,
  classNamesPrefix,
  selector,
  withStaticClass,
}: GetStaticClassNamesInput) {
  if (withStaticClass === false) {
    return []
  }

  return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`)
}
