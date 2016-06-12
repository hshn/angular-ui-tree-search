import * as angular from 'angular';
import { treeSearchFactory } from './tree-search';
import { defaultMatcherFactoryProvider } from './angular/providers';

export default angular
  .module('ui.tree-search', [])
  .provider('uits.defaultMatcherFactory', defaultMatcherFactoryProvider)
  .filter('treeSearch', treeSearchFactory)
;
