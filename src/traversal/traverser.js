export class Traverser {
  constructor(children, visitors = []) {
    this.children = children;
    this.visitors = visitors;
  }

  traverse(node) {
    return this.visitors.reduce((node, visitor) => {
      return this.traverseForVisitor(node, visitor);
    }, node);
  }

  traverseForVisitor(node, visitor) {
    node = visitor.enterNode(node);

    this.children(node).forEach(child => {
      this.traverseForVisitor(child, visitor)
    });

    return visitor.leaveNode(node);
  }
}
