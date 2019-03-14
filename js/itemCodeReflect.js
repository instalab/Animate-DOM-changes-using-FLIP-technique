(function () {
  document.addEventListener('item-beforeorderchanged', onBeforeOrderChanged)
  document.addEventListener('item-orderchanged', onOrderChanged)
  
  const codeLinesWrapper = document.getElementsByClassName('popupcode-items-code')[0]
  const codeLines = document.getElementsByClassName('popupcode-item-line')
  let currentLine = null
  let currentIndex = null
  
  function onBeforeOrderChanged({ raw, node, pointerId }) {
    const list = node.closest('.draggable-list')
    const children = list.children
    
    currentLine = null
    currentIndex = null
    
    for (var i = 0; i < children.length; i++) {
      if (children[i] === node) {
        currentLine = codeLines[i]
        currentIndex = i
      }
    }
  }
  
  function onOrderChanged({ raw, node, pointerId }) {
    const list = node.closest('.draggable-list')
    const children = list.children
    
    let newIndex = null
    
    for (var i = 0; i < children.length; i++) {
      if (children[i] === node) {
        newIndex = i
      }
    }
    
    if (newIndex < currentIndex) {
      codeLinesWrapper.insertBefore(currentLine, codeLines[newIndex])
    } else {
      codeLinesWrapper.insertBefore(currentLine, codeLines[newIndex + 1])
    }
  }
  
}())