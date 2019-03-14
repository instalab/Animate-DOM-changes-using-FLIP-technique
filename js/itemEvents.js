(function () {
  document.addEventListener('pointermove', onMouseMove)
  document.addEventListener('pointerdown', onDragStart)
  document.addEventListener('pointerup', onDragStop)
  
  let draggedNodes = []
  
  function onDragStart(event) {
    const draggableNodes = document.getElementsByClassName('draggable-item')
    for (let node of draggableNodes) {
      if (node === event.target && draggedNodes.findIndex(x => x.node === node) === -1) {
        document.dispatchEvent(new ItemDragEvent('item-dragstart', event, node, event.pointerId))
        draggedNodes.push({ pointerId: event.pointerId, node: node })
        break
      }
    }
  }
  
  function onMouseMove(event) {
    for (let node of draggedNodes) {
      if (node.pointerId === event.pointerId) {
        document.dispatchEvent(new ItemDragEvent('item-dragmove', event, node.node, node.pointerId))
        break
      }
    }
  }
  
  function onDragStop(e) {
    for (let node of draggedNodes) {
      if (node.pointerId === event.pointerId) {
        document.dispatchEvent(new ItemDragEvent('item-dragend', event, node.node, node.pointerId))
        draggedNodes = draggedNodes.filter(x => x.node !== node.node)
      }
    }
  }
}())
