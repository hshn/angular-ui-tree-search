import { Visitor } from './visitor';

export class MatchChildrenVisitor extends Visitor {
  constructor() {
    super();
    this.matchedNode = null;
  }

  enterNode(node) {
    node = super.enterNode(node);

    if (this.matchedNode) {
      node.$matched = true;
    } else if (node.$matched) {
      this.matchedNode = node;
    }

    return node;
  }

  leaveNode(node) {
    node = super.leaveNode(node);

    if (this.matchedNode === node) {
      this.matchedNode = null;
    }

    return node;
  }
}
