import { Visitor } from './visitor';

export class MatchParentVisitor extends Visitor {
  leaveNode(node) {
    node = super.leaveNode(node);

    if (node.$matched) {
      this.stack.forEach(node => node.$matched = true);
    }

    return node;
  }
}
