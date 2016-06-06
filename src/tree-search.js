import { TraverserBuilder } from './traversal/traverser-builder';

export function treeSearchFactory () {

  let builder = new TraverserBuilder();

  return function treeSearch(nodes, query) {

    let match = query == null
      ? node => true
      : node => (node.title || '').indexOf(query) > -1;

    let traverser = builder
      .setMatcher(match)
      .get();

    return (nodes || []).filter(node => traverser.traverse(node));
  }
}
