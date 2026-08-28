import { createVarsResolver, getSpacing } from '../../core'
import { BreadcrumbsFactory } from './breadcrumbs.types'

export const varsResolver = createVarsResolver<BreadcrumbsFactory>((_, { separatorMargin }) => ({
  root: {
    '--bc-separator-margin': getSpacing(separatorMargin),
  },
}))
