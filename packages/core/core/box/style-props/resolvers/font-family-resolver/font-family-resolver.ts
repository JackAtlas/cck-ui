const values = {
  text: 'var(--c-font-family)',
  mono: 'var(--c-font-family-monospace)',
  monospace: 'var(--c-font-family-monospace)',
  heading: 'var(--c-font-family-headings)',
  headings: 'var(--c-font-family-headings)'
}

export function fontFamilyResolver(fontFamily: unknown) {
  if (typeof fontFamily === 'string' && fontFamily in values) {
    return values[fontFamily as keyof typeof values]
  }

  return fontFamily
}
