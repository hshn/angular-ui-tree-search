export class Visitor {
  constructor() {
    this.stack = [];
  }

  enterNode(node) {
    this.stack.push(node);

    return node;
  }

  leaveNode(node) {
    this.stack.pop();

    return node;
  }
}
