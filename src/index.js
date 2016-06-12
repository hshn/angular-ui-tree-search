import * as angular from 'angular';
import { treeSearchFactory } from './tree-search';
import { matcherFactoryProvider } from './angular/providers';

export default angular
  .module('ui.tree-search', [])
  .provider('ui.tree-search.matcherFactory', matcherFactoryProvider)
  .filter('treeSearch', treeSearchFactory)
;
