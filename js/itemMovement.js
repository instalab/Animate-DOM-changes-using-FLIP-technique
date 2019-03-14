(function () {
  document.addEventListener('item-orderchanged', onOrderChanged)
  document.addEventListener('item-dragstart', onDragStart)
  document.addEventListener('item-dragmove', onDragMove)
  document.addEventListener('item-dragend', onDragStop)
  
  const TRANSITION_TIME = 200
  let dragOps = []
  let timeouts = []
  
  function onOrderChanged({ raw, node, pointerId }) {
    const dragOp = dragOps.find(x => x.pointerId === pointerId)
    if (dragOp) {
      const saveTransform = node.style.transform
      const saveTransition = node.style.transition
      node.style.transform = ``
      node.style.transition = 'transform 0s';
      dragOp.initialPosition = node.getBoundingClientRect()
      node.style.transform = saveTransform
      node.style.transition = saveTransition
    }
  }
  
  function onDragStart({ raw, node, pointerId }) {
    const position = node.getBoundingClientRect()
    const dragOffset = {
      x: raw.x - position.x,
      y: raw.y - position.y
    }
    
    node.style.zIndex = '999'
    node.style.border = '1px solid green'
    node.style.transform = 'scale(1.02)'
    
    for (let timeout of timeouts) {
      if (timeout.node === node && timeout.pointerId === pointerId) {
        clearTimeout(timeout.timeout)
      }
    }
    
    dragOps.push({
      pointerId: pointerId,
      initialPosition: position,
      dragOffset: dragOffset
    })
  }
  
  function onDragMove({ raw, node, pointerId }) {
    const dragOp = dragOps.find(x => x.pointerId === pointerId)
    const x = raw.x - dragOp.initialPosition.x - dragOp.dragOffset.x
    const y = raw.y - dragOp.initialPosition.y - dragOp.dragOffset.y
    node.style.transform = `scale(1.02) translate(${x}px, ${y}px)`
    node.style.transition = 'none'
  }
  
  function onDragStop({ node, pointerId }) {
    node.style.transform = ''
    node.style.transition = ''
    timeouts.push({
      node: node,
      pointerId: pointerId,
      timeout: setTimeout(function () {
        node.style.zIndex = ''
        node.style.border = ''
      }, TRANSITION_TIME)
    })
    dragOps = dragOps.filter(x => {
      return x.node !== node && x.pointerId !== pointerId
    })
  }
  
}())