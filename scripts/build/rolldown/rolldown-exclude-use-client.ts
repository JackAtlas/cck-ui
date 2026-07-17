export const ROLLDOWN_EXCLUDE_USE_CLIENT = [
  'index',
  'core/utils/deep-merge/deep-merge',
  'core/utils/units-converters/rem',
  'core/utils/units-converters/px',
  'core/factory/create-polymorphic-component',
  'core/config-provider/cck-html-props',
  'core/config-provider/create-theme/create-theme',
  'core/config-provider/color-functions/darken/darken',
  'core/config-provider/color-functions/lighten/lighten',
  'core/config-provider/color-functions/luminance/luminance',
  'core/config-provider/color-functions/rgba/rgba',
  'core/config-provider/default-colors',
  'core/config-provider/default-theme',
  'core/config-provider/merge-cck-theme/merge-cck-theme',
  'core/config-provider/CckCssVariables/virtual-color/virtual-color',
  'theme-to-vars',
].reduce<string[]>((acc, name) => {
  acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`)
  return acc
}, [])
