let nodes = Array.from(document.querySelectorAll('.number-list > li'))
let numberListNode = document.getElementsByClassName('number-list')[0]

document.addEventListener('mousemove', onMouseMove)
document.addEventListener('mousedown', onDragStart)
document.addEventListener('mouseup', onDragStop)

let movingNode = null
let startingPosition = null
let startingPositionDifference = null

function onDragStart(e) {
  if (nodes.some(x => x === e.target)) {
    movingNode = e.target
    movingNode.style.zIndex = `999`
    movingNode.style.border = `1px solid green`
    startingPosition = movingNode.getBoundingClientRect()
    startingPositionDifference = {
      x: e.x - startingPosition.x,
      y: e.y - startingPosition.y
    }
  }
}

function onMouseMove(e) {
  if (movingNode) {
    handleNodeOrder(movingNode)
    const spd = startingPositionDifference
    const sp = startingPosition
    movingNode.style.transform = `scale(1.02) translate(${e.x - spd.x - sp.x}px, ${e.y - spd.y - sp.y}px)`
    movingNode.style.transition = `none`
  }
}

function onDragStop(e) {
  movingNode.style.transform = ``
  movingNode.style.transition = ``
  movingNode.style.zIndex = ``
  movingNode.style.border = ``
  movingNode = null
  startingPosition = null
  startingPositionDifference = null
}

function handleNodeOrder(movingNode) {
  const mncr = movingNode.getBoundingClientRect()
  const nodesAfter = nodes.filter(x => {
    if (x !== movingNode) {
      const xcr = x.getBoundingClientRect()
      return (xcr.y + xcr.height / 2) > mncr.y
    }
  })
  
  
  const firstRects = []
  for (let node of nodes) {
    firstRects.push({
      node: node,
      rect: node.getBoundingClientRect()
    })
  }
  
  movingNode.remove()
  numberListNode.insertBefore(movingNode, nodesAfter[0])
  nodes = Array.from(document.querySelectorAll('.number-list > li'))
  
  movingNode.style.transform = ``
  movingNode.style.transition = ``
  startingPosition = movingNode.getBoundingClientRect()
  flipNodes(firstRects)
}

function flipNodes(firstRects) {
  
  for (let node of nodes) {
    if (node !== movingNode || (node.dataset.moving && node.dataset.moving === "false")) {
      const firstRect = firstRects.find(x => x.node === node).rect
      const lastRect = node.getBoundingClientRect()
      
      if (lastRect.y - firstRect.y !== 0) {
        requestAnimationFrame(() => {
          node.style.transform = `translate(${firstRect.x - lastRect.x}px, ${firstRect.y - lastRect.y}px)`
          node.style.transition = 'transform 0s';  
          requestAnimationFrame( () => {
            node.style.transform  = '';
            node.style.transition = '';
          });
        })
      }
      
    }
  }
}
