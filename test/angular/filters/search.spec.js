import module from '../../../src';
import 'angular-mocks/ngMock';

import '../../matchers';

describe('treeSearchFilter', () => {

  let treeSearch, nodes;
  beforeEach(function () {
    angular.mock.module(module.name);
    angular.mock.inject($filter => {
      treeSearch = $filter('treeSearch');
      nodes = [
        node(1, 'node1', [
          node(11, 'node1.1', [
            node(111, 'node1.1.1')
          ]),
          node(12, 'node1.2')
        ]),
        node(2, 'node2', [
          node(21, 'node2.1'),
          node(22, 'node2.2')
        ])
      ];
    })
  });

  function node (id, title, nodes = [], $matched = undefined) {
    return {id, title, nodes, $matched};
  }

  it('should match all nodes with empty query', () => {

    [null, undefined].forEach(query => {
      let filtered = treeSearch(nodes);

      expect(filtered[0]).toBeNode({title: 'node1', $matched: true});
      expect(filtered[0].nodes[0]).toBeNode({title: 'node1.1', $matched: true});
      expect(filtered[0].nodes[0].nodes[0]).toBeNode({title: 'node1.1.1', $matched: true});
      expect(filtered[0].nodes[1]).toBeNode({title: 'node1.2', $matched: true});
      expect(filtered[1]).toBeNode({title: 'node2', $matched: true});
      expect(filtered[1].nodes[0]).toBeNode({title: 'node2.1', $matched: true});
      expect(filtered[1].nodes[1]).toBeNode({title: 'node2.2', $matched: true});
    });
  });

  it('should match parents even if its children are only matched.', () => {
    let filtered = treeSearch(nodes, 'node2.1');

    expect(filtered[0]).toBeNode({title: 'node1', $matched: false});
    expect(filtered[0].nodes[0]).toBeNode({title: 'node1.1', $matched: false});
    expect(filtered[0].nodes[0].nodes[0]).toBeNode({title: 'node1.1.1', $matched: false});
    expect(filtered[0].nodes[1]).toBeNode({title: 'node1.2', $matched: false});
    expect(filtered[1]).toBeNode({title: 'node2', $matched: true});
    expect(filtered[1].nodes[0]).toBeNode({title: 'node2.1', $matched: true});
    expect(filtered[1].nodes[1]).toBeNode({title: 'node2.2', $matched: false});
  });

  it('should match children if node matches', () => {
    let filtered = treeSearch(nodes, 'node1.1');

    expect(filtered[0]).toBeNode({title: 'node1', $matched: true});
    expect(filtered[0].nodes[0]).toBeNode({title: 'node1.1', $matched: true});
    expect(filtered[0].nodes[0].nodes[0]).toBeNode({title: 'node1.1.1', $matched: true});
    expect(filtered[0].nodes[1]).toBeNode({title: 'node1.2', $matched: false});
    expect(filtered[1]).toBeNode({title: 'node2', $matched: false});
    expect(filtered[1].nodes[0]).toBeNode({title: 'node2.1', $matched: false});
    expect(filtered[1].nodes[1]).toBeNode({title: 'node2.2', $matched: false});
  });
});
