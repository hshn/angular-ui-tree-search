# [wip] ui.tree-search

The angular module `angular-ui-tree-search` provides the filter which can be used with [`angular-ui-tree`](https://github.com/angular-ui-tree/angular-ui-tree) for searching nodes.

## Features

 - Path matching
 - Do not hide child nodes
 
please see [demo page](http://hshn.github.io/angular-ui-tree-search/).

## Usage

### 1. Install

#### with npm

```bash
 $ npm install angular-ui-tree-search --save
```

#### with bower

TODO
 
### 2. Load module

#### ES6 way

```js
import * as angular from 'angular';
import uiTreeSearch from 'angular-ui-tree-search';

let module = angular.module('myApp', ['ui.tree', uiTreeSearch.name]);
```

#### Traditional way

```js
var module = angular.module('myApp', ['ui.tree', 'ui.tree-search']);
```

### 3. Add the filter `uitsSearch` to root nodes.

```diff
<div ui-tree>
  <ol ui-tree-nodes ng-model="list">
-    <li ng-repeat="item in list"
+    <li ng-repeat="item in list | uitsSearch: query"
         ui-tree-node ng-include="'items_renderer.html'"></li>
         ui-tree-node ng-include="'items_renderer.html'"></li>
  </ol>
</div>
```

### 4. Add UI reactions using property `$match` which will be added by the filter `uitsSearch`.

```diff
<div ui-tree>
  <ol ui-tree-nodes ng-model="list">
    <li ng-repeat="item in list | uitsSearch: query"
+       ng-show="item.$match"
        ui-tree-node ng-include="'items_renderer.html'"></li>
  </ol>
</div>
```

## Providers

### `uitsTraverseBuilderProvider`

#### `setChildNodePath(childNodePath: string = 'items')`

Specify the property where the child nodes exists.

```js
.configure(function (uitsTraverseBuilder) {
  uitsTraverseBuilder.setChildNodePath('items');
})
```

### `uitsMatcherFactoryProvider`

#### `setProperties(properties: string[] = ['title'])`

Specify the properties which will be used for checking whether if the node is matched.

```js
.configure(function (uitsMatcherFactoryProvider) {
  uitsMatcherFactoryProvider.setProperties(['message', 'body']);
})
```
