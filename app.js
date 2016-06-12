!function (angular) {
'use strict';

function node(id, title, nodes) {
  return {id: id, title: title, nodes: nodes || []};
}

angular
  .module('ui-tree-search-demo', [
    'ui.tree',
    'ui.tree-search'
  ])
  .controller('DemoController', function () {
    this.nodes = [
      node(1, 'node1', [
        node(11, 'node1.1', [
          node(111, 'node1.1.1')
        ]),
        node(12, 'node1.2')
      ]),
      node(2, 'node2', [
        node(21, 'node2.1'),
        node(22, 'node2.2')
      ]),
      node(3, 'node3', [
        node(31, 'node3.1')
      ]),
      node(4, 'node4', [
        node(41, 'node4.1')
      ])
    ]
  })
  .directive('demo', function () {
    return {
      templateUrl: 'demo.html',
      controller: 'DemoController as ctrl'
    };
  })

}(window.angular);
