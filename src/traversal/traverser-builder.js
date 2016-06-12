import { Traverser } from "./traverser";

export class TraverserBuilder {
  constructor(childNodePath) {
    this.childNodePath = childNodePath;
    this.visitors = [];
  }

  addVisitors(visitor) {
    this.visitors.push(visitor);

    return this;
  }

  setVisitors(visitors) {
    this.visitors = visitors;

    return this;
  }

  get() {
    return new Traverser(node => node[this.childNodePath] || [], this.visitors);
  }
}
