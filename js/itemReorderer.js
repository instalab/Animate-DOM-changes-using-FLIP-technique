(function () {
  document.addEventListener('item-dragmove', onDragMove)
  
  function onDragMove({ raw, node, pointerId }) {
    const position = node.getBoundingClientRect()
    const list = node.closest('.draggable-list')
    const children = list.children
    
    let currentIndex = null
    let insertBefore = null
    let insertBeforeIndex = null
    
    for (var i = 0; i < children.length; i++) {
      if (node === children[i]) {
        currentIndex = i
      }
    }
    
    for (var i = 0; i < children.length; i++) {
      const child = children[i]
      if (child !== node) {
        const childBox = child.getBoundingClientRect()
        if ((childBox.y + childBox.height / 2) > position.y) {
          insertBefore = child
          insertBeforeIndex = i
          break
        }
      }
    }
    
    if (
      insertBeforeIndex === null &&
      currentIndex === children.length - 1
    ) {
      insertBeforeIndex = currentIndex + 1
    }
    
    if (currentIndex + 1 !== insertBeforeIndex) {
      document.dispatchEvent(new ItemBeforeOrderChangeEvent(event, node, pointerId))
      list.insertBefore(node, insertBefore)
      document.dispatchEvent(new ItemOrderChangedEvent(event, node, pointerId))
    }
  }
  
}())