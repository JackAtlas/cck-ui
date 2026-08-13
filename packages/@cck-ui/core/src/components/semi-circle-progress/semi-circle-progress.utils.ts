import { createVarsResolver, getThemeColor, rem } from '../../core'
import { SemiCircleProgressFactory, SemiCircleProgressProps } from './semi-circle-progress.types'

function getRotation({
  orientation,
  fillDirection,
}: Pick<SemiCircleProgressProps, 'orientation' | 'fillDirection'>) {
  if (orientation === 'down') {
    if (fillDirection === 'right-to-left') {
      return 'rotate(180deg) rotateY(180deg)'
    }
    return 'rotate(180deg)'
  }
  if (fillDirection === 'left-to-right') {
    return 'rotateY(180deg)'
  }

  return undefined
}

export const varsResolver = createVarsResolver<SemiCircleProgressFactory>(
  (
    theme,
    {
      filledSegmentColor,
      emptySegmentColor,
      orientation,
      fillDirection,
      transitionDuration,
      thickness,
    }
  ) => ({
    root: {
      '--scp-empty-segment-color': emptySegmentColor
        ? getThemeColor(emptySegmentColor, theme)
        : undefined,
      '--scp-filled-segment-color': filledSegmentColor
        ? getThemeColor(filledSegmentColor, theme)
        : undefined,
      '--scp-rotation': getRotation({ orientation, fillDirection }),
      '--scp-thickness': rem(thickness),
      '--scp-transition-duration': transitionDuration ? `${transitionDuration}ms` : undefined,
    },
  })
)
