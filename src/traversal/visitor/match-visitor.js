import { Visitor } from './visitor';

export class MatchVisitor extends Visitor {
  constructor(match) {
    super();

    this.match = match;
  }

  enterNode(node) {
    node = super.enterNode(node);

    node.$matched = this.match(node);

    return node;
  }
}
