import * as angular from 'angular';
import { treeSearchFactory } from './tree-search';

export default angular
  .module('angular-ui-tree-search', [])
  .filter('treeSearch', treeSearchFactory)
;
