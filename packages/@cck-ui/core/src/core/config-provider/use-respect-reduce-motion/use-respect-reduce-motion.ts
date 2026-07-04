import { MaybeRef, toRef } from 'vue'
import { useIsomorphicEffect } from '@cck-ui/hooks'

interface UseRespectReduceMotionOptions {
  respectReduceMotion: MaybeRef<boolean>
  getRootElement: () => HTMLElement | undefined
}

export function useRespectReduceMotion({
  respectReduceMotion,
  getRootElement,
}: UseRespectReduceMotionOptions) {
  const respectRef = toRef(respectReduceMotion)

  useIsomorphicEffect(() => {
    if (respectRef.value) {
      getRootElement()?.setAttribute('data-respect-reduced-motion', 'true')
    }
  }, [respectRef])
}
