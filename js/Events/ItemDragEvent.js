class ItemDragEvent extends Event {
  constructor(name, raw, node, pointerId) {
    super(name, { "cancelable": false })
    this.raw = raw
    this.node = node
    this.pointerId = pointerId
  }
  getRawEvent() {
    return this.raw
  }
  getNode() {
    return this.node
  }
  getPointerId() {
    return this.pointerId
  }
}