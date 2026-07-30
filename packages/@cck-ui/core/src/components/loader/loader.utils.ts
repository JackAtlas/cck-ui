import { createVarsResolver, getSize, getThemeColor } from '../../core'
import { LoaderFactory } from './loader.types'

export const varsResolver = createVarsResolver<LoaderFactory>((theme, { size, color }) => ({
  root: {
    '--loader-size': getSize(size, 'loader-size'),
    '--loader-color': color ? getThemeColor(color, theme) : undefined,
  },
}))
