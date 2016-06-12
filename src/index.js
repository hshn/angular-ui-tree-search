import * as angular from 'angular';
import { treeSearchFactory } from './tree-search';
import { defaultMatcherFactoryProvider } from './matcher-factory';

export default angular
  .module('angular-ui-tree-search', [])
  .provider('treeSearchMatcherFactoryDefault', defaultMatcherFactoryProvider)
  .filter('treeSearch', treeSearchFactory)
;