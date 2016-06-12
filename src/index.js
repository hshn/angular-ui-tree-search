import * as angular from 'angular';
import { matcherFactoryProvider, traverseBuilderProvider } from './angular/providers';
import { searchFactory } from './angular/factory';
import { searchFilter } from './angular/filters';

export default angular
  .module('ui.tree-search', [])
  .provider('ui.tree-search.matcherFactory', matcherFactoryProvider)
  .provider('ui.tree-search.traverseBuilder', traverseBuilderProvider)
  .factory('ui.tree-search.search', searchFactory)
  .filter('treeSearch', searchFilter)
;
