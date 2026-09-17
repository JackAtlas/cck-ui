export interface ScrollAreaScrollbarAxisProps {
  orientation?: 'horizontal' | 'vertical'
}

export type ScrollAreaScrollbarVisibleProps = ScrollAreaScrollbarAxisProps

export interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: boolean
}

export interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: boolean
}

export interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: boolean
}
