import * as angular from 'angular';
import uiTree from 'angular-ui-tree';
import { treeFilterFactory } from './tree-filter';

export default angular
  .module('angular-ui-tree-filter', [
    uiTree
  ])
  .filter('treeFilter', treeFilterFactory)
;
