export const componentSizes = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'compact-xs',
  'compact-sm',
  'compact-md',
  'compact-lg',
  'compact-xl'
]

export type ComponentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  xl: 60,
  lg: 50,
  md: 42,
  sm: 36,
  xs: 30
} as const
