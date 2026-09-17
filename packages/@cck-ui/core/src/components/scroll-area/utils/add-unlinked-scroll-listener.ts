export function addUnlinkedScrollListener(node: HTMLElement, handler = () => {}) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop }
  let rAF = 0

  ;(function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop }
    const isScrollChanged = prevPosition.left !== position.left || prevPosition.top !== position.top
    if (isScrollChanged) {
      handler()
    }
    prevPosition = position
    rAF = window.requestAnimationFrame(loop)
  })()

  return () => window.cancelAnimationFrame(rAF)
}
