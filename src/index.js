import * as angular from 'angular';
import uiTree from 'angular-ui-tree';
import { treeSearchFactory } from './tree-search';

export default angular
  .module('angular-ui-tree-search', [
    uiTree
  ])
  .filter('treeSearch', treeSearchFactory)
;
