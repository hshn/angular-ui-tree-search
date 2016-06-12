import { TraverserBuilder } from '../../traversal/traverser-builder';

export function traverseBuilderProvider() {

  let _childNodePath = 'nodes';
  this.setChildNodePath = childNodePath => _childNodePath = childNodePath;

  this.$get = () => new TraverserBuilder(_childNodePath);
}
