import * as angular from 'angular';
import { matcherFactoryProvider, traverseBuilderProvider } from './angular/providers';
import { searchFactory } from './angular/factory';
import { searchFilter } from './angular/filters';

export default angular
  .module('ui.tree-search', [])
  .provider('uitsMatcherFactory', matcherFactoryProvider)
  .provider('uitsTraverseBuilder', traverseBuilderProvider)
  .factory('uitsSearch', searchFactory)
  .filter('uitsSearch', searchFilter)
;
