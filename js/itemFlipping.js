(function () {
  document.addEventListener('item-beforeorderchanged', onBeforeOrderChanged)
  document.addEventListener('item-orderchanged', onOrderChanged)
  
  let recordedItemPositions = []
  
  function onBeforeOrderChanged({ raw, node, pointerId }) {
    const list = node.closest('.draggable-list')
    const children = list.children
    
    recordedItemPositions = [] // Reset
    
    for (let child of children) {
      if (child !== node) {
        recordedItemPositions.push({
          oldRect: child.getBoundingClientRect(),
          node: child
        })
      }
    }
  }
  
  function onOrderChanged({ raw, node, pointerId }) {
    const list = node.closest('.draggable-list')
    const children = list.children
    
    for (let { oldRect, node } of recordedItemPositions) {
      const newRect = node.getBoundingClientRect()
      
      if (oldRect.y - newRect.y !== 0) {
        requestAnimationFrame(() => {
          node.style.transform = `translate(${oldRect.x - newRect.x}px, ${oldRect.y - newRect.y}px)`
          node.style.transition = 'transform 0s'; 
          requestAnimationFrame( () => {
            node.style.transform  = ''
            node.style.transition = ''
          })
        })
      }
    }
  }
  
}())