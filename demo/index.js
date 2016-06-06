import * as angular from 'angular';
import uiTreeSearch from '../src';

class DemoController {
  constructor() {

    function node(id, title, nodes = []) {
      return {id: id, title: title, nodes: nodes};
    }

    this.nodes = [
      node(1, 'node1', [
        node(11, 'node1.1', [
          node(111, 'node1.1.1')
        ]),
        node(12, 'node1.2')
      ]),
      node(2, 'node2', [
        node(21, 'node2.1'),
        node(22, 'node2.2'),
      ]),
      node(3, 'node3', [
        node(31, 'node3.1')
      ]),
      node(4, 'node4', [
        node(41, 'node4.1')
      ])
    ];
  }
}

angular
  .module('demo', [
    uiTreeSearch.name
  ])
  .controller('DemoController', DemoController)
  .directive('demo', function ($templateCache) {

    $templateCache.put('nodes_renderer.html', `
      <div ui-tree-handle class="tree-node tree-node-content">
        <a class="btn btn-success btn-xs" data-nodrag ng-click="toggle(this)">
          <span class="glyphicon" ng-class="{'glyphicon-chevron-right': collapsed, 'glyphicon-chevron-down': !collapsed}"></span>
        </a>
        {{node.title}}
        <a class="pull-right btn btn-danger btn-xs" data-nodrag ng-click="remove(this)"><span class="glyphicon glyphicon-remove"></span></a>
        <a class="pull-right btn btn-primary btn-xs" data-nodrag ng-click="newSubItem(this)" style="margin-right: 8px;"><span class="glyphicon glyphicon-plus"></span></a>
      </div>
      <ol ui-tree-nodes="" ng-model="node.nodes">
        <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'" ng-show="node.$matched">
        </li>
      </ol>
    `);

    return {
      template: `
      <div class="row">
         <div class="col-sm-12">
           <h3>Filter nodes</h3>
         </div>
       </div>

       <div class="row">
         <div class="col-sm-6">
           <div ui-tree id="tree-root">
             <ol ui-tree-nodes="" ng-model="ctrl.nodes">
               <li ng-repeat="node in ctrl.nodes | treeSearch:query" ui-tree-node ng-include="'nodes_renderer.html'" ng-show="node.$matched"></li>
             </ol>
           </div>
         </div>

         <div class="col-sm-6">
           <p>Search: <input ng-model="query"></p>
         </div>
       </div>
      `,
      controller: 'DemoController as ctrl'
    };
  })
;
