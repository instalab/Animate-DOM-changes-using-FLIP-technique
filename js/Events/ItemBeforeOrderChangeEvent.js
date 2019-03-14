class ItemBeforeOrderChangeEvent extends Event {
  constructor(raw, node, pointerId) {
    super('item-beforeorderchanged', { "cancelable": false })
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