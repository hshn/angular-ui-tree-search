import { MatchVisitor, MatchParentVisitor, MatchChildrenVisitor } from '../../traversal/visitor';

searchFactory.$inject = ['ui.tree-search.traverseBuilder', 'ui.tree-search.matcherFactory'];
export function searchFactory(traverseBuilder, matcherFactory) {

  let matchParentVisitor = new MatchParentVisitor();
  let matchChildrenVisitor = new MatchChildrenVisitor();

  return (nodes, query) => {
    let matcher = matcherFactory(query);
    let visitors = [
      new MatchVisitor(matcher),
      matchChildrenVisitor,
      matchParentVisitor
    ];

    let traverser = traverseBuilder.setVisitors(visitors).get();

    return (nodes || []).filter(node => traverser.traverse(node));
  }
}
