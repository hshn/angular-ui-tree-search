(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraverserBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _traverser = require('./traverser');

var _visitor = require('./visitor');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TraverserBuilder = exports.TraverserBuilder = function () {
  function TraverserBuilder() {
    _classCallCheck(this, TraverserBuilder);

    this.setChildNodePath('nodes');
    this.setMatcher(function (node) {
      throw new Error('No matcher was specified');
    });
  }

  _createClass(TraverserBuilder, [{
    key: 'setChildNodePath',
    value: function setChildNodePath(childNodePath) {
      this.childNodePath = childNodePath;

      return this;
    }
  }, {
    key: 'setMatcher',
    value: function setMatcher(matcher) {
      this.matcher = matcher;

      return this;
    }
  }, {
    key: 'get',
    value: function get() {
      var _this = this;

      var visitors = [new _visitor.MatchVisitor(this.matcher), new _visitor.MatchChildrenVisitor(), new _visitor.MatchParentVisitor()];

      return new _traverser.Traverser(function (node) {
        return node[_this.childNodePath] || [];
      }, visitors);
    }
  }]);

  return TraverserBuilder;
}();

},{"./traverser":2,"./visitor":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Traverser = exports.Traverser = function () {
  function Traverser(children) {
    var visitors = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Traverser);

    this.children = children;
    this.visitors = visitors;
  }

  _createClass(Traverser, [{
    key: "traverse",
    value: function traverse(node) {
      var _this = this;

      return this.visitors.reduce(function (node, visitor) {
        return _this.traverseForVisitor(node, visitor);
      }, node);
    }
  }, {
    key: "traverseForVisitor",
    value: function traverseForVisitor(node, visitor) {
      var _this2 = this;

      node = visitor.enterNode(node);

      this.children(node).forEach(function (child) {
        _this2.traverseForVisitor(child, visitor);
      });

      return visitor.leaveNode(node);
    }
  }]);

  return Traverser;
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _visitor = require('./visitor');

Object.keys(_visitor).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _visitor[key];
    }
  });
});

var _matchVisitor = require('./match-visitor');

Object.keys(_matchVisitor).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matchVisitor[key];
    }
  });
});

var _matchParentVisitor = require('./match-parent-visitor');

Object.keys(_matchParentVisitor).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matchParentVisitor[key];
    }
  });
});

var _matchChildrenVisitor = require('./match-children-visitor');

Object.keys(_matchChildrenVisitor).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matchChildrenVisitor[key];
    }
  });
});

},{"./match-children-visitor":4,"./match-parent-visitor":5,"./match-visitor":6,"./visitor":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchChildrenVisitor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _visitor = require('./visitor');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchChildrenVisitor = exports.MatchChildrenVisitor = function (_Visitor) {
  _inherits(MatchChildrenVisitor, _Visitor);

  function MatchChildrenVisitor() {
    _classCallCheck(this, MatchChildrenVisitor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MatchChildrenVisitor).call(this));

    _this.matchedNode = null;
    return _this;
  }

  _createClass(MatchChildrenVisitor, [{
    key: 'enterNode',
    value: function enterNode(node) {
      node = _get(Object.getPrototypeOf(MatchChildrenVisitor.prototype), 'enterNode', this).call(this, node);

      if (this.matchedNode) {
        node.$matched = true;
      } else if (node.$matched) {
        this.matchedNode = node;
      }

      return node;
    }
  }, {
    key: 'leaveNode',
    value: function leaveNode(node) {
      node = _get(Object.getPrototypeOf(MatchChildrenVisitor.prototype), 'leaveNode', this).call(this, node);

      if (this.matchedNode === node) {
        this.matchedNode = null;
      }

      return node;
    }
  }]);

  return MatchChildrenVisitor;
}(_visitor.Visitor);

},{"./visitor":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchParentVisitor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _visitor = require('./visitor');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchParentVisitor = exports.MatchParentVisitor = function (_Visitor) {
  _inherits(MatchParentVisitor, _Visitor);

  function MatchParentVisitor() {
    _classCallCheck(this, MatchParentVisitor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchParentVisitor).apply(this, arguments));
  }

  _createClass(MatchParentVisitor, [{
    key: 'leaveNode',
    value: function leaveNode(node) {
      node = _get(Object.getPrototypeOf(MatchParentVisitor.prototype), 'leaveNode', this).call(this, node);

      if (node.$matched) {
        this.stack.forEach(function (node) {
          return node.$matched = true;
        });
      }

      return node;
    }
  }]);

  return MatchParentVisitor;
}(_visitor.Visitor);

},{"./visitor":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchVisitor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _visitor = require('./visitor');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchVisitor = exports.MatchVisitor = function (_Visitor) {
  _inherits(MatchVisitor, _Visitor);

  function MatchVisitor(match) {
    _classCallCheck(this, MatchVisitor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MatchVisitor).call(this));

    _this.match = match;
    return _this;
  }

  _createClass(MatchVisitor, [{
    key: 'enterNode',
    value: function enterNode(node) {
      node = _get(Object.getPrototypeOf(MatchVisitor.prototype), 'enterNode', this).call(this, node);

      node.$matched = this.match(node);

      return node;
    }
  }, {
    key: 'leaveNode',
    value: function leaveNode(node) {
      return _get(Object.getPrototypeOf(MatchVisitor.prototype), 'leaveNode', this).call(this, node);
    }
  }]);

  return MatchVisitor;
}(_visitor.Visitor);

},{"./visitor":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Visitor = exports.Visitor = function () {
  function Visitor() {
    _classCallCheck(this, Visitor);

    this.stack = [];
  }

  _createClass(Visitor, [{
    key: "enterNode",
    value: function enterNode(node) {
      this.stack.push(node);

      return node;
    }
  }, {
    key: "leaveNode",
    value: function leaveNode(node) {
      this.stack.pop();

      return node;
    }
  }]);

  return Visitor;
}();

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.treeSearchFactory = treeSearchFactory;

var _traverserBuilder = require('./traversal/traverser-builder');

function treeSearchFactory() {

  var builder = new _traverserBuilder.TraverserBuilder();

  return function treeSearch(nodes, query) {

    var match = query == null ? function (node) {
      return true;
    } : function (node) {
      return (node.title || '').indexOf(query) > -1;
    };

    var traverser = builder.setMatcher(match).get();

    return (nodes || []).filter(function (node) {
      return traverser.traverse(node);
    });
  };
}

},{"./traversal/traverser-builder":1}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

var angular = _interopRequireWildcard(_angular);

var _treeSearch = require('./tree-search');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = angular.module('angular-ui-tree-search', []).filter('treeSearch', _treeSearch.treeSearchFactory);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./tree-search":8}]},{},[9]);
