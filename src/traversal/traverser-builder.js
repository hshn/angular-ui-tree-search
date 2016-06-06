import { Traverser } from './traverser';
import { MatchVisitor, MatchParentVisitor, MatchChildrenVisitor } from './visitor';

export class TraverserBuilder {
  constructor() {
    this.setChildNodePath('nodes');
    this.setMatcher(node => {
      throw new Error('No matcher was specified')
    });
  }

  setChildNodePath(childNodePath) {
    this.childNodePath = childNodePath;

    return this;
  }

  setMatcher(matcher) {
    this.matcher = matcher;

    return this;
  }

  get() {
    let visitors = [
      new MatchVisitor(this.matcher),
      new MatchChildrenVisitor(),
      new MatchParentVisitor()
    ];

    return new Traverser(node => node[this.childNodePath] || [], visitors);
  }
}
