;(function(modules) {

    const ensureJs = function(filepath) {
        const excludeFileType = ['.css']
        if (!filepath.endsWith('.js') && !excludeFileType.some(ft => filepath.endsWith(ft))) {
            filepath += '.js'
        }
        return filepath
    }

    const cachedModules = {}

    const requireById = function(id) {
        // console.log('requireById', id)
        if (cachedModules[id]) {
            return cachedModules[id].exports
        }

        const module = { exports: {} }
        cachedModules[id] = module

        const [func, mapper] = modules[id]

        const requireByName = function(name) {
            name = ensureJs(name)
            // console.log('requireByName', name, mapper)
            return requireById(mapper[name])
        }

        func(requireByName, module, module.exports)

        return module.exports
    }

    requireById(0)
})
({0: [
    function(require, module, exports) {
        "use strict";

var _xreact = _interopRequireDefault(require("/Users/user/frontend/xreact/src/xreact"));

var _xreactDom = _interopRequireDefault(require("/Users/user/frontend/xreact/src/xreact-dom"));

var _App = _interopRequireDefault(require("./components/App"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_xreactDom["default"].render( /*#__PURE__*/_xreact["default"].createElement(_App["default"], null), document.getElementById('root'));
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"/Users/user/frontend/xreact/src/xreact-dom.js":3,"./components/App.js":4,"./index.css":11}
],
1: [
    function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useCallback = exports.useMemo = exports.useLayoutEffect = exports.useEffect = exports.useState = exports.Component = void 0;

var _util = require("./util");

var _xreactDom = require("./xreact-dom");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createElement = function createElement(tag, attrs) {
  attrs = attrs || {};
  var key = attrs.key;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children,
    childNodes: [],
    key: key
  };
};

var Component = /*#__PURE__*/function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.props = props;
    this.state = {};
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(stateChange) {
      (0, _xreactDom.stateChangeAdd)(this, stateChange);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Component;
}();

exports.Component = Component;

var useState = function useState(initialValue) {
  var component = (0, _xreactDom.currentComponent)();
  var _component$_hooks = component._hooks,
      states = _component$_hooks.states,
      stateIndex = _component$_hooks.stateIndex;
  var state = states[stateIndex];

  if (state === undefined) {
    states[stateIndex] = initialValue;
    state = initialValue;
  }

  var setState = function setState(newValue) {
    var oldValue = states[stateIndex];

    if (oldValue !== newValue) {
      component._dirty = true;
      states[stateIndex] = newValue;
      (0, _xreactDom.stateChangeComponentAdd)(component);
    }
  };

  component._hooks.stateIndex += 1;
  return [state, setState];
};

exports.useState = useState;

var depsChanged = function depsChanged(oldDeps, newDeps) {
  return !oldDeps || !newDeps || oldDeps.length !== newDeps.length || newDeps.some(function (d, i) {
    return d !== oldDeps[i];
  });
};

var useEffect = function useEffect(callback, deps) {
  var component = (0, _xreactDom.currentComponent)();
  var _component$_hooks2 = component._hooks,
      effects = _component$_hooks2.effects,
      effectIndex = _component$_hooks2.effectIndex,
      pendingEffects = _component$_hooks2.pendingEffects;
  var effect = effects[effectIndex] || {};
  var oldDeps = effect.deps;

  if (depsChanged(oldDeps, deps)) {
    effect.deps = deps;
    effect.callback = callback;
    pendingEffects.push(effect);
    effects[effectIndex] = effect;
  }

  component._hooks.effectIndex += 1;
};

exports.useEffect = useEffect;

var useLayoutEffect = function useLayoutEffect(callback, deps) {
  var component = (0, _xreactDom.currentComponent)();
  var _component$_hooks3 = component._hooks,
      layoutEffects = _component$_hooks3.layoutEffects,
      layoutEffectIndex = _component$_hooks3.layoutEffectIndex,
      pendingLayoutEffects = _component$_hooks3.pendingLayoutEffects;
  var effect = layoutEffects[layoutEffectIndex] || {};
  var oldDeps = effect.deps;

  if (depsChanged(oldDeps, deps)) {
    effect.deps = deps;
    effect.callback = callback;
    pendingLayoutEffects.push(effect);
    layoutEffects[layoutEffectIndex] = effect;
  }

  component._hooks.layoutEffectIndex += 1;
};

exports.useLayoutEffect = useLayoutEffect;

var useMemo = function useMemo(callback, deps) {
  var component = (0, _xreactDom.currentComponent)();
  var _component$_hooks4 = component._hooks,
      states = _component$_hooks4.states,
      stateIndex = _component$_hooks4.stateIndex;

  var _ref = states[stateIndex] || [],
      _ref2 = _slicedToArray(_ref, 2),
      oldDeps = _ref2[0],
      value = _ref2[1];

  var retVal = value;

  if (depsChanged(oldDeps, deps)) {
    retVal = callback();
    states[stateIndex] = [deps, retVal];
  }

  component._hooks.stateIndex += 1;
  return retVal;
};

exports.useMemo = useMemo;

var useCallback = function useCallback(callback, deps) {
  return useMemo(function () {
    return callback;
  }, deps);
};

exports.useCallback = useCallback;
var React = {
  createElement: createElement,
  Component: Component
};
var _default = React;
exports["default"] = _default;
    },
    {"./util.js":2,"./xreact-dom.js":3}
],
2: [
    function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayFromSet = exports.toHypenFromCamelCase = exports.isUpperCase = exports.isNil = exports.isFunction = exports.isObject = exports.isArray = exports.isBoolean = exports.isNumber = exports.isString = exports.log = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var log = console.log.bind(console);
exports.log = log;

var isString = function isString(s) {
  return typeof s === 'string';
};

exports.isString = isString;

var isNumber = function isNumber(s) {
  return typeof s === 'number';
};

exports.isNumber = isNumber;

var isBoolean = function isBoolean(s) {
  return typeof s === 'boolean';
};

exports.isBoolean = isBoolean;

var isArray = function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]';
};

exports.isArray = isArray;

var isObject = function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
};

exports.isObject = isObject;

var isFunction = function isFunction(f) {
  return Object.prototype.toString.call(f) === '[object Function]';
};

exports.isFunction = isFunction;

var isNil = function isNil(x) {
  return x === undefined || x === null;
};

exports.isNil = isNil;

var isUpperCase = function isUpperCase(c) {
  return c >= 'A' && c <= 'Z';
};

exports.isUpperCase = isUpperCase;

var toHypenFromCamelCase = function toHypenFromCamelCase(camelCaseString) {
  var s = '';

  for (var i = 0; i < camelCaseString.length; i++) {
    var c = camelCaseString[i];

    if (isUpperCase(c)) {
      s += '-' + c.toLowerCase();
    } else {
      s += c;
    }
  }

  return s;
};

exports.toHypenFromCamelCase = toHypenFromCamelCase;

var arrayFromSet = function arrayFromSet(s) {
  var a = [];

  var _iterator = _createForOfIteratorHelper(s),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var x = _step.value;
      a.push(x);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return a;
};

exports.arrayFromSet = arrayFromSet;
    },
    {}
],
3: [
    function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.stateChangeAdd = exports.stateChangeComponentAdd = exports.renderComponent = exports.resetComponentHooksPendingEffects = exports.resetComponentHooksIndex = exports.setCurrentComponent = exports.currentComponent = void 0;

var _xreact = _interopRequireDefault(require("./xreact"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e3) { throw _e3; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e4) { didErr = true; err = _e4; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __currentComponent = null;

var currentComponent = function currentComponent() {
  return __currentComponent;
};

exports.currentComponent = currentComponent;

var setCurrentComponent = function setCurrentComponent(component) {
  __currentComponent = component;
};

exports.setCurrentComponent = setCurrentComponent;

var resetComponentHooksIndex = function resetComponentHooksIndex(component) {
  if (component._hooks) {
    component._hooks.stateIndex = 0;
    component._hooks.effectIndex = 0;
    component._hooks.layoutEffectIndex = 0;
  }
};

exports.resetComponentHooksIndex = resetComponentHooksIndex;

var resetComponentHooksPendingEffects = function resetComponentHooksPendingEffects(component) {
  if (component._hooks) {
    component._hooks.pendingEffects = [];
    component._hooks.pendingLayoutEffects = [];
  }
};

exports.resetComponentHooksPendingEffects = resetComponentHooksPendingEffects;

var getNextOldDomNode = function getNextOldDomNode(childNodes, currentIndex) {
  for (var i = currentIndex + 1; i < childNodes.length; i++) {
    var node = childNodes[i];

    if (node) {
      return node;
    }
  }

  return null;
};

var render = function render(vnode, container) {
  var element = renderVNode(container, vnode);

  if (container && element && element.parentNode !== container) {
    appendChild(container, element);
  }

  return element;
};

var appendChild = function appendChild(container, element) {
  if (element) {
    container.appendChild(element);
  }

  return element;
};

var insertBefore = function insertBefore(container, newNode, oldNode) {
  if (container && newNode) {
    if (oldNode) {
      container.insertBefore(newNode, oldNode);
    } else {
      container.appendChild(newNode);
    }
  }

  return newNode;
};

var replaceChild = function replaceChild(element, newNode, oldNode) {
  var component = oldNode && oldNode._component;

  if (component && component.componentWillUnmount) {
    component.componentWillUnmount();
  }

  cleanupEffects(component);
  element.replaceChild(newNode, oldNode);
};

var removeNode = function removeNode(dom) {
  if (!dom) {
    return;
  }

  var component = dom && dom._component;

  if (component && component.componentWillUnmount) {
    component.componentWillUnmount();
  }

  cleanupEffects(component);

  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
};

var isTrivalNode = function isTrivalNode(vnode) {
  return (0, _util.isNumber)(vnode) || (0, _util.isString)(vnode);
};

var isNilNode = function isNilNode(vnode) {
  return vnode === undefined || vnode === null || (0, _util.isBoolean)(vnode);
};

var renderVNode = function renderVNode(container, vnode) {
  if (isNilNode(vnode)) {
    return null;
  }

  if ((0, _util.isNumber)(vnode)) {
    vnode = String(vnode);
  }

  var element;

  if ((0, _util.isString)(vnode)) {
    element = document.createTextNode(vnode);
    return element;
  }

  if ((0, _util.isFunction)(vnode.tag)) {
    var component = createComponent(vnode);
    component.container = container;
    renderComponentWithProps(component, vnode.attrs);
    element = component.base;
    return element;
  }

  element = document.createElement(vnode.tag);

  for (var _i = 0, _Object$entries = Object.entries(vnode.attrs); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        k = _Object$entries$_i[0],
        v = _Object$entries$_i[1];

    if (!k.startsWith('__')) {
      setAttribute(element, k, v);
    }
  }

  var children = normalizeChildren(vnode.children);
  var childNodes = vnode.childNodes;

  var _iterator = _createForOfIteratorHelper(children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;

      var _e2 = render(c, element);

      childNodes.push(_e2);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var i = 0; i < childNodes.length; i++) {
    var e = childNodes[i];

    if (e && e._component) {
      e._component.nextOldDomNode = getNextOldDomNode(childNodes, i);
    }
  }

  return element;
};

var normalizeChildren = function normalizeChildren(children) {
  if ((0, _util.isArray)(children[0])) {
    return normalizeChildren(children[0]);
  } else {
    return children;
  }
};

var updateDom = function updateDom(container, oldDomNode, oldVNode, newVNode, nextOldDomNode) {
  // new add
  if (isNilNode(oldVNode)) {
    if (!isNilNode(newVNode)) {
      var element = renderVNode(container, newVNode);

      if (nextOldDomNode) {
        insertBefore(container, element, nextOldDomNode);
      } else {
        appendChild(container, element);
      }

      return element;
    } else {// nothing changed
    }

    return null;
  } // remove


  if (isNilNode(newVNode)) {
    if (oldDomNode) {
      removeNode(oldDomNode);
    }

    return null;
  } // trival node changed


  if (isTrivalNode(oldVNode) || isTrivalNode(newVNode)) {
    if (oldVNode !== newVNode) {
      var _element = renderVNode(container, newVNode);

      replaceChild(container, _element, oldDomNode);
      return _element;
    }

    return oldDomNode;
  } // node type changed


  if (oldVNode.tag !== newVNode.tag) {
    var _element2 = renderVNode(container, newVNode);

    replaceChild(container, _element2, oldDomNode);
    return _element2;
  }

  if ((0, _util.isFunction)(newVNode.tag)) {
    return updateComponent(oldDomNode, newVNode);
  } // same node type, check props and children


  updateProps(oldDomNode, oldVNode, newVNode);
  var oldVChilds = oldVNode.children;
  var newVChilds = newVNode.children;
  var newChildNodes = updateChildren(oldDomNode, oldVNode.childNodes, oldVChilds, newVChilds);
  newVNode.childNodes = newChildNodes;
  return oldDomNode;
};

var updateProps = function updateProps(element, oldVNode, newVNode) {
  var oldAttrs = {};
  var newAttrs = {};

  for (var name in oldVNode.attrs) {
    if (!name.startsWith('__')) {
      oldAttrs[name] = oldVNode.attrs[name];
    }
  }

  for (var _name in newVNode.attrs) {
    if (!_name.startsWith('__')) {
      newAttrs[_name] = newVNode.attrs[_name];
    }
  }

  for (var _name2 in oldAttrs) {
    if (!(_name2 in newAttrs)) {
      removeAttribute(element, _name2);
    }
  }

  for (var _name3 in newAttrs) {
    if (oldAttrs[_name3] !== newAttrs[_name3]) {
      setAttribute(element, _name3, newAttrs[_name3]);
    }
  }
};

var updateChildren = function updateChildren(container, oldChildNodes, oldVChilds, newVChilds) {
  var isList = (0, _util.isArray)(newVChilds[0]);

  if (isList) {
    return updateChildrenWithKey(container, oldChildNodes, oldVChilds, newVChilds);
  } else {
    return updateChildrenWithoutKey(container, oldChildNodes, oldVChilds, newVChilds);
  }
};

var updateChildrenWithKey = function updateChildrenWithKey(container, oldChildNodes, oldVChilds, newVChilds) {
  oldVChilds = normalizeChildren(oldVChilds);
  newVChilds = normalizeChildren(newVChilds); // index old childs

  var oldKeyedVChildMapper = {};
  var oldVChildsWithoutKey = [];

  for (var i = 0; i < oldVChilds.length; i++) {
    var vnode = oldVChilds[i];
    var element = oldChildNodes[i];

    if (!(0, _util.isNil)(vnode.key)) {
      oldKeyedVChildMapper[vnode.key] = {
        element: element,
        vnode: vnode,
        index: i
      };
    } else {
      oldVChildsWithoutKey.push({
        element: element,
        vnode: vnode,
        index: i
      });
    }
  } // index new childs


  var newKeyedVChildMapper = {};
  var newVChildsWithKey = [];
  var newVChildsWithoutKey = [];

  for (var _i2 = 0; _i2 < newVChilds.length; _i2++) {
    var c = newVChilds[_i2];

    if (!(0, _util.isNil)(c.key)) {
      newVChildsWithKey.push({
        vnode: c,
        index: _i2
      });
      newKeyedVChildMapper[c.key] = {
        vnode: c,
        index: _i2
      };
    } else {
      newVChildsWithoutKey.push(c);
    }
  } // update childs


  var newChildNodes = [];
  var needInsertNodes = [];
  var lastIndex = 0;

  for (var _i3 = 0, _newVChildsWithKey = newVChildsWithKey; _i3 < _newVChildsWithKey.length; _i3++) {
    var item = _newVChildsWithKey[_i3];
    var newVNode = item.vnode,
        newIndex = item.index;

    if (newVNode.key in oldKeyedVChildMapper) {
      var nextElement = getNextOldDomNode(oldChildNodes, lastIndex);
      var _oldKeyedVChildMapper = oldKeyedVChildMapper[newVNode.key],
          oldVNode = _oldKeyedVChildMapper.vnode,
          oldIndex = _oldKeyedVChildMapper.index,
          _element3 = _oldKeyedVChildMapper.element;
      var newElement = updateDom(container, _element3, oldVNode, newVNode, nextElement);
      oldChildNodes[oldIndex] = newElement;

      if (oldIndex < lastIndex) {
        insertBefore(container, newElement, nextElement);
      }

      newChildNodes.push(newElement);
      needInsertNodes.push(null);
      lastIndex = Math.max(oldIndex, lastIndex);
    } else {
      // collect new nodes
      var _newElement = renderVNode(container, newVNode);

      newChildNodes.push(_newElement);
      needInsertNodes.push(_newElement);
    }
  } // insert new nodes


  needInsertNodes.forEach(function (newElement, index) {
    if (newElement) {
      var _nextElement = null;

      for (var _i4 = index + 1; _i4 < newChildNodes.length; _i4++) {
        var node = newChildNodes[_i4];
        var _vnode = newVChilds[_i4];

        if (node && _vnode.key in oldKeyedVChildMapper) {
          _nextElement = node;
          break;
        }
      }

      insertBefore(container, newElement, _nextElement);
    }
  }); // remove key not in newVChildsWithKey

  for (var _i5 = 0, _Object$entries2 = Object.entries(oldKeyedVChildMapper); _i5 < _Object$entries2.length; _i5++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i5], 2),
        key = _Object$entries2$_i[0],
        _element4 = _Object$entries2$_i[1].element;

    if (!(key in newKeyedVChildMapper)) {
      removeNode(_element4);
    }
  }

  return newChildNodes;
};

var updateChildrenWithoutKey = function updateChildrenWithoutKey(container, oldChildNodes, oldVChilds, newVChilds) {
  oldVChilds = normalizeChildren(oldVChilds);
  newVChilds = normalizeChildren(newVChilds);
  var newChildNodes = []; // replace childs

  for (var i = 0; i < newVChilds.length; i++) {
    var oldVNode = oldVChilds[i];
    var newVNode = newVChilds[i];
    var element = oldChildNodes[i];
    var nextOldDomNode = getNextOldDomNode(oldChildNodes, i);

    if (element && element._component) {
      element._component.nextOldDomNode = nextOldDomNode;
    }

    var newDomNode = updateDom(container, element, oldVNode, newVNode, nextOldDomNode);
    newChildNodes.push(newDomNode);
  } // remove childs


  for (var _i6 = newVChilds.length; _i6 < oldVChilds.length; _i6++) {
    removeNode(oldChildNodes[_i6]);
  }

  return newChildNodes;
};

var unmountComponent = function unmountComponent(component) {
  if (component.componentWillUnmount) {
    component.componentWillUnmount();
  }

  if (component._hooks) {
    var effects = component._hooks.effects;

    var _iterator2 = _createForOfIteratorHelper(effects),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var effect = _step2.value;

        if ((0, _util.isFunction)(effect.cleanup)) {
          effect.cleanup();
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  removeNode(component.base);
};

var createComponent = function createComponent(vnode) {
  var component = vnode.tag;
  var props = vnode.attrs;

  if (!(component.prototype && component.prototype.render)) {
    var comp = new _xreact["default"].Component(props);
    comp.constructor = component;
    comp._hooks = {
      stateIndex: 0,
      states: [],
      effectIndex: 0,
      effects: [],
      pendingEffects: [],
      layoutEffectIndex: 0,
      layoutEffects: [],
      pendingLayoutEffects: []
    };

    comp.render = function () {
      return component(props);
    };

    return comp;
  } else {
    var _comp = new component(props);

    return _comp;
  }
};

var renderComponentWithProps = function renderComponentWithProps(component, props) {
  component.props = props;
  return renderComponent(component);
};

var updateComponent = function updateComponent(element, newVNode) {
  var component = element && element._component;

  if (component && component.constructor === newVNode.tag) {
    renderComponentWithProps(component, newVNode.attrs);
    return component.base;
  } else {
    if (component) {
      unmountComponent(component);
    }

    var newComponent = createComponent(newVNode);
    renderComponentWithProps(newComponent, newVNode.attrs);
    return newComponent.base;
  }
};

var renderComponent = function renderComponent(component) {
  setCurrentComponent(component);
  resetComponentHooksIndex(component);
  resetComponentHooksPendingEffects(component);
  var newVNode = component.render();
  component._dirty = false;
  updateLayoutEffects(component);

  if (component._dirty) {
    return renderComponent(component);
  }

  var base = updateDom(component.container, component.base, component.oldVNode, newVNode, component.nextOldDomNode);

  if (component.base) {
    if (component.componentDidUpdate) {
      component.componentDidUpdate();
    }
  } else if (component.componentDidMount) {
    component.base = base;
    component.oldVNode = newVNode;

    if (base) {
      base._component = component;
    }

    component.componentDidMount();
  }

  component.base = base;
  component.oldVNode = newVNode;

  if (base) {
    base._component = component;
  }

  updateEffects(component);
  return base;
};

exports.renderComponent = renderComponent;
var _effectsComponents = [];

var addEffectsComponent = function addEffectsComponent(component) {
  _effectsComponents.push(component);
};

var updateEffectsAfterPaint = function updateEffectsAfterPaint() {
  var _iterator3 = _createForOfIteratorHelper(_effectsComponents),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var component = _step3.value;
      updateEffects(component);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  _effectsComponents = [];
};

var updateEffects = function updateEffects(component) {
  return _updateEffects(component, 'pendingEffects');
};

var updateLayoutEffects = function updateLayoutEffects(component) {
  return _updateEffects(component, 'pendingLayoutEffects');
};

var _updateEffects = function _updateEffects(component, effectType) {
  if (component._hooks) {
    var pendingEffects = component._hooks[effectType]; // cleanup

    var _iterator4 = _createForOfIteratorHelper(pendingEffects),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var effect = _step4.value;
        var cleanup = effect.cleanup;

        if ((0, _util.isFunction)(cleanup)) {
          cleanup();
        }
      } // useEffect

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var _iterator5 = _createForOfIteratorHelper(pendingEffects),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _effect = _step5.value;
        var callback = _effect.callback;

        if ((0, _util.isFunction)(callback)) {
          _effect.cleanup = callback();
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    component._hooks[effectType] = [];
  }
};

var cleanupEffects = function cleanupEffects(component) {
  if (component && component._hooks) {
    var _component$_hooks = component._hooks,
        effects = _component$_hooks.effects,
        layoutEffects = _component$_hooks.layoutEffects; // cleanup effects

    var _iterator6 = _createForOfIteratorHelper(effects),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var effect = _step6.value;

        if ((0, _util.isFunction)(effect.cleanup)) {
          effect.cleanup();
        }
      } // cleanup layout effects

    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    var _iterator7 = _createForOfIteratorHelper(layoutEffects),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _effect2 = _step7.value;

        if ((0, _util.isFunction)(_effect2.cleanup)) {
          _effect2.cleanup();
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
};

var removeAttribute = function removeAttribute(element, key) {
  if (key === 'className') {
    key = 'class';
  }

  if (key.startsWith('on')) {
    key = key.toLowerCase();
  }

  element.removeAttribute(key);
};

var setAttribute = function setAttribute(element, key, value) {
  if (key === 'className') {
    key = 'class';
  }

  if (key.startsWith('on')) {
    var k = key.toLowerCase();

    if (k === 'ondoubleclick') {
      k = 'ondblclick';
    }

    if (k === 'onchange') {
      k = 'oninput';
    }

    element[k] = value;
    return;
  } else if (key === 'style') {
    if ((0, _util.isString)(value)) {
      element[key] = value;
      return;
    } else if ((0, _util.isObject)(value)) {
      var css = Object.entries(value).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return "".concat((0, _util.toHypenFromCamelCase)(k), ": ").concat(v, ";");
      }).join(' ');
      element[key] = css;
      return;
    }
  } else if (key in element) {
    element[key] = value;
  } else {
    element.setAttribute(key, value);
  }
};

var stateChangeQueue = [];
var stateChangeComponents = new Set();

var stateChangeComponentAdd = function stateChangeComponentAdd(component) {
  stateChangeComponents.add(component);
  defer(flush);
};

exports.stateChangeComponentAdd = stateChangeComponentAdd;

var stateChangeAdd = function stateChangeAdd(component, stateChange) {
  if (stateChangeQueue.length === 0) {
    defer(flush);
  }

  stateChangeQueue.push({
    component: component,
    stateChange: stateChange
  });
  stateChangeComponents.add(component);
};

exports.stateChangeAdd = stateChangeAdd;

var flush = function flush() {
  var queue = stateChangeQueue;
  stateChangeQueue = [];

  var _iterator8 = _createForOfIteratorHelper(queue),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var _step8$value = _step8.value,
          component = _step8$value.component,
          stateChange = _step8$value.stateChange;

      if (!component.prevState) {
        component.prevState = component.state;
      }

      if ((0, _util.isFunction)(stateChange)) {
        Object.assign(component.state, stateChange(component.prevState, component.props));
      } else {
        Object.assign(component.state, stateChange);
      }

      component.prevState = component.state;
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  var components = (0, _util.arrayFromSet)(stateChangeComponents);
  stateChangeComponents.clear();

  var _iterator9 = _createForOfIteratorHelper(components),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _component = _step9.value;
      renderComponent(_component);
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
};

var defer = function defer(fn) {
  requestAnimationFrame(fn);
};

var ReactDOM = {};

ReactDOM.render = function (vnode, container) {
  container.innerHTML = '';
  var e = render(vnode, container);
  return e;
};

var _default = ReactDOM;
exports["default"] = _default;
    },
    {"./xreact.js":1,"./util.js":2}
],
4: [
    function(require, module, exports) {
        "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xreact = _interopRequireWildcard(require("/Users/user/frontend/xreact/src/xreact"));

var _Header = _interopRequireDefault(require("./Header"));

var _MainSection = _interopRequireDefault(require("./MainSection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = [{
  text: 'XReact TodoMVC',
  completed: false,
  id: 0
}];

var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "addTodo", function (text) {
      var todos = [{
        id: _this.state.todos.reduce(function (maxId, todo) {
          return Math.max(todo.id, maxId);
        }, -1) + 1,
        completed: false,
        text: text
      }].concat(_toConsumableArray(_this.state.todos));

      _this.setState({
        todos: todos
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteTodo", function (id) {
      var todos = _this.state.todos.filter(function (todo) {
        return todo.id !== id;
      });

      _this.setState({
        todos: todos
      });
    });

    _defineProperty(_assertThisInitialized(_this), "editTodo", function (id, text) {
      var todos = _this.state.todos.map(function (todo) {
        return todo.id === id ? _objectSpread(_objectSpread({}, todo), {}, {
          text: text
        }) : todo;
      });

      _this.setState({
        todos: todos
      });
    });

    _defineProperty(_assertThisInitialized(_this), "completeTodo", function (id) {
      var todos = _this.state.todos.map(function (todo) {
        return todo.id === id ? _objectSpread(_objectSpread({}, todo), {}, {
          completed: !todo.completed
        }) : todo;
      });

      _this.setState({
        todos: todos
      });
    });

    _defineProperty(_assertThisInitialized(_this), "completeAll", function () {
      var areAllMarked = _this.state.todos.every(function (todo) {
        return todo.completed;
      });

      var todos = _this.state.todos.map(function (todo) {
        return _objectSpread(_objectSpread({}, todo), {}, {
          completed: !areAllMarked
        });
      });

      _this.setState({
        todos: todos
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearCompleted", function () {
      var todos = _this.state.todos.filter(function (todo) {
        return todo.completed === false;
      });

      _this.setState({
        todos: todos
      });
    });

    _defineProperty(_assertThisInitialized(_this), "actions", {
      addTodo: _this.addTodo,
      deleteTodo: _this.deleteTodo,
      editTodo: _this.editTodo,
      completeTodo: _this.completeTodo,
      completeAll: _this.completeAll,
      clearCompleted: _this.clearCompleted
    });

    _this.state = {
      todos: initialState,
      gameID: null,
      player: 0
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_xreact["default"].createElement("div", null, /*#__PURE__*/_xreact["default"].createElement(_Header["default"], {
        addTodo: this.actions.addTodo
      }), /*#__PURE__*/_xreact["default"].createElement(_MainSection["default"], {
        todos: this.state.todos,
        actions: this.actions
      }));
    }
  }]);

  return App;
}(_xreact.Component);

var _default = App;
exports["default"] = _default;
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"./Header.js":5,"./MainSection.js":8}
],
5: [
    function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xreact = _interopRequireDefault(require("/Users/user/frontend/xreact/src/xreact"));

var _TodoTextInput = _interopRequireDefault(require("./TodoTextInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var addTodo = _ref.addTodo;

  var handleSave = function handleSave(text) {
    if (text.length !== 0) {
      addTodo(text);
    }
  };

  return /*#__PURE__*/_xreact["default"].createElement("header", {
    className: "header"
  }, /*#__PURE__*/_xreact["default"].createElement("h1", null, "todos"), /*#__PURE__*/_xreact["default"].createElement(_TodoTextInput["default"], {
    newTodo: true,
    onSave: handleSave,
    placeholder: "What needs to be done?"
  }));
};

var _default = Header;
exports["default"] = _default;
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"./TodoTextInput.js":6}
],
6: [
    function(require, module, exports) {
        "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xreact = _interopRequireWildcard(require("/Users/user/frontend/xreact/src/xreact"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TodoTextInput = /*#__PURE__*/function (_Component) {
  _inherits(TodoTextInput, _Component);

  var _super = _createSuper(TodoTextInput);

  function TodoTextInput() {
    var _this;

    _classCallCheck(this, TodoTextInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: _this.props.text || ''
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      var text = e.target.value.trim();

      if (e.which === 13) {
        _this.props.onSave(text);

        if (_this.props.newTodo) {
          _this.setState({
            text: ''
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      _this.setState({
        text: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (e) {
      if (!_this.props.newTodo) {
        _this.props.onSave(e.target.value);
      }
    });

    return _this;
  }

  _createClass(TodoTextInput, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_xreact["default"].createElement("input", {
        className: (0, _util.classnames)({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        }),
        type: "text",
        placeholder: this.props.placeholder,
        autoFocus: "true",
        value: this.state.text,
        onBlur: this.handleBlur,
        onInput: this.handleChange,
        onKeyDown: this.handleSubmit
      });
    }
  }]);

  return TodoTextInput;
}(_xreact.Component);

exports["default"] = TodoTextInput;
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"./util.js":7}
],
7: [
    function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classnames = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var classnames = function classnames(options) {
  var classes = [];

  for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        className = _Object$entries$_i[0],
        enabled = _Object$entries$_i[1];

    if (enabled) {
      classes.push(className);
    }
  }

  return classes.join(' ');
};

exports.classnames = classnames;
    },
    {}
],
8: [
    function(require, module, exports) {
        "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xreact = _interopRequireWildcard(require("/Users/user/frontend/xreact/src/xreact"));

var _TodoItem = _interopRequireDefault(require("./TodoItem"));

var _Footer = _interopRequireDefault(require("./Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TODO_FILTERS = {
  SHOW_ALL: function SHOW_ALL() {
    return true;
  },
  SHOW_ACTIVE: function SHOW_ACTIVE(todo) {
    return !todo.completed;
  },
  SHOW_COMPLETED: function SHOW_COMPLETED(todo) {
    return todo.completed;
  }
};

var MainSection = /*#__PURE__*/function (_Component) {
  _inherits(MainSection, _Component);

  var _super = _createSuper(MainSection);

  function MainSection() {
    var _this;

    _classCallCheck(this, MainSection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      filter: 'SHOW_ALL'
    });

    _defineProperty(_assertThisInitialized(_this), "handleClearCompleted", function () {
      _this.props.actions.clearCompleted();
    });

    _defineProperty(_assertThisInitialized(_this), "handleShow", function (filter) {
      _this.setState({
        filter: filter
      });
    });

    return _this;
  }

  _createClass(MainSection, [{
    key: "renderToggleAll",
    value: function renderToggleAll(completedCount) {
      var _this$props = this.props,
          todos = _this$props.todos,
          actions = _this$props.actions;

      if (todos.length > 0) {
        return /*#__PURE__*/_xreact["default"].createElement("input", {
          className: "toggle-all",
          type: "checkbox",
          checked: completedCount === todos.length,
          onInput: actions.completeAll
        });
      }
    }
  }, {
    key: "renderFooter",
    value: function renderFooter(completedCount) {
      var todos = this.props.todos;
      var filter = this.state.filter;
      var activeCount = todos.length - completedCount;

      if (todos.length) {
        return /*#__PURE__*/_xreact["default"].createElement(_Footer["default"], {
          completedCount: completedCount,
          activeCount: activeCount,
          filter: filter,
          onClearCompleted: this.handleClearCompleted.bind(this),
          onShow: this.handleShow.bind(this)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          todos = _this$props2.todos,
          actions = _this$props2.actions;
      var filter = this.state.filter;
      var filteredTodos = todos.filter(TODO_FILTERS[filter]);
      var completedCount = todos.reduce(function (count, todo) {
        return todo.completed ? count + 1 : count;
      }, 0);
      return /*#__PURE__*/_xreact["default"].createElement("section", {
        className: "main"
      }, this.renderToggleAll(completedCount), /*#__PURE__*/_xreact["default"].createElement("ul", {
        className: "todo-list"
      }, filteredTodos.map(function (todo) {
        return /*#__PURE__*/_xreact["default"].createElement(_TodoItem["default"], _extends({
          key: todo.id,
          todo: todo
        }, actions));
      })), this.renderFooter(completedCount));
    }
  }]);

  return MainSection;
}(_xreact.Component);

exports["default"] = MainSection;
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"./TodoItem.js":9,"./Footer.js":10}
],
9: [
    function(require, module, exports) {
        "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xreact = _interopRequireWildcard(require("/Users/user/frontend/xreact/src/xreact"));

var _util = require("./util");

var _TodoTextInput = _interopRequireDefault(require("./TodoTextInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TodoItem = /*#__PURE__*/function (_Component) {
  _inherits(TodoItem, _Component);

  var _super = _createSuper(TodoItem);

  function TodoItem() {
    var _this;

    _classCallCheck(this, TodoItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      editing: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleDoubleClick", function () {
      _this.setState({
        editing: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSave", function (id, text) {
      if (text.length === 0) {
        _this.props.deleteTodo(id);
      } else {
        _this.props.editTodo(id, text);
      }

      _this.setState({
        editing: false
      });
    });

    return _this;
  }

  _createClass(TodoItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          todo = _this$props.todo,
          completeTodo = _this$props.completeTodo,
          deleteTodo = _this$props.deleteTodo;
      var element;

      if (this.state.editing) {
        element = /*#__PURE__*/_xreact["default"].createElement(_TodoTextInput["default"], {
          text: todo.text,
          editing: this.state.editing,
          onSave: function onSave(text) {
            return _this2.handleSave(todo.id, text);
          }
        });
      } else {
        element = /*#__PURE__*/_xreact["default"].createElement("div", {
          className: "view"
        }, /*#__PURE__*/_xreact["default"].createElement("input", {
          className: "toggle",
          type: "checkbox",
          checked: todo.completed,
          onInput: function onInput() {
            return completeTodo(todo.id);
          }
        }), /*#__PURE__*/_xreact["default"].createElement("label", {
          onDoubleClick: this.handleDoubleClick
        }, todo.text), /*#__PURE__*/_xreact["default"].createElement("button", {
          className: "destroy",
          onClick: function onClick() {
            return deleteTodo(todo.id);
          }
        }));
      }

      return /*#__PURE__*/_xreact["default"].createElement("li", {
        dataKey: this.props.key,
        className: (0, _util.classnames)({
          completed: todo.completed,
          editing: this.state.editing
        })
      }, element);
    }
  }]);

  return TodoItem;
}(_xreact.Component);

exports["default"] = TodoItem;
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"./util.js":7,"./TodoTextInput.js":6}
],
10: [
    function(require, module, exports) {
        "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xreact = _interopRequireWildcard(require("/Users/user/frontend/xreact/src/xreact"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

var Footer = /*#__PURE__*/function (_Component) {
  _inherits(Footer, _Component);

  var _super = _createSuper(Footer);

  function Footer() {
    _classCallCheck(this, Footer);

    return _super.apply(this, arguments);
  }

  _createClass(Footer, [{
    key: "renderTodoCount",
    value: function renderTodoCount() {
      var activeCount = this.props.activeCount;
      var itemWord = activeCount === 1 ? 'item' : 'items';
      return /*#__PURE__*/_xreact["default"].createElement("span", {
        className: "todo-count"
      }, /*#__PURE__*/_xreact["default"].createElement("strong", null, activeCount || 'No'), itemWord, " left");
    }
  }, {
    key: "renderFilterLink",
    value: function renderFilterLink(filter) {
      var title = FILTER_TITLES[filter];
      var _this$props = this.props,
          selectedFilter = _this$props.filter,
          onShow = _this$props.onShow;
      return /*#__PURE__*/_xreact["default"].createElement("a", {
        className: (0, _util.classnames)({
          selected: filter === selectedFilter
        }),
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          return onShow(filter);
        }
      }, title);
    }
  }, {
    key: "renderClearButton",
    value: function renderClearButton() {
      var _this$props2 = this.props,
          completedCount = _this$props2.completedCount,
          onClearCompleted = _this$props2.onClearCompleted;

      if (completedCount > 0) {
        return /*#__PURE__*/_xreact["default"].createElement("button", {
          className: "clear-completed",
          onClick: onClearCompleted
        }, "Clear completed");
      }
    }
  }, {
    key: "renderFilterList",
    value: function renderFilterList() {
      var _this = this;

      return ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map(function (filter) {
        return /*#__PURE__*/_xreact["default"].createElement("li", {
          key: filter
        }, _this.renderFilterLink(filter));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_xreact["default"].createElement("footer", {
        className: "footer"
      }, this.renderTodoCount(), /*#__PURE__*/_xreact["default"].createElement("ul", {
        className: "filters"
      }, this.renderFilterList()), this.renderClearButton());
    }
  }]);

  return Footer;
}(_xreact.Component);

exports["default"] = Footer;
    },
    {"/Users/user/frontend/xreact/src/xreact.js":1,"./util.js":7}
],
11: [
    function(require, module, exports) {
        "use strict";

var __xwebpack_style = document.createElement('style');

__xwebpack_style.innerHTML = "html,\nbody {\n    margin: 0;\n    padding: 0;\n}\n\nbutton {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    background: none;\n    font-size: 100%;\n    vertical-align: baseline;\n    font-family: inherit;\n    font-weight: inherit;\n    color: inherit;\n    -webkit-appearance: none;\n    appearance: none;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    line-height: 1.4em;\n    background: #f5f5f5;\n    color: #111111;\n    min-width: 230px;\n    max-width: 550px;\n    margin: 0 auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    font-weight: 300;\n}\n\n:focus {\n    outline: 0;\n}\n\n.hidden {\n    display: none;\n}\n\n.todoapp {\n    background: #fff;\n    margin: 130px 0 40px 0;\n    position: relative;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n                0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp input::-moz-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp input::input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp h1 {\n    position: absolute;\n    top: -140px;\n    width: 100%;\n    font-size: 80px;\n    font-weight: 200;\n    text-align: center;\n    color: #b83f45;\n    -webkit-text-rendering: optimizeLegibility;\n    -moz-text-rendering: optimizeLegibility;\n    text-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    font-size: 24px;\n    font-family: inherit;\n    font-weight: inherit;\n    line-height: 1.4em;\n    color: inherit;\n    padding: 6px;\n    border: 1px solid #999;\n    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n    padding: 16px 16px 16px 60px;\n    border: none;\n    background: rgba(0, 0, 0, 0.003);\n    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n    position: relative;\n    z-index: 2;\n    border-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n    width: 1px;\n    height: 1px;\n    border: none; /* Mobile Safari */\n    opacity: 0;\n    position: absolute;\n    right: 100%;\n    bottom: 100%;\n}\n\n.toggle-all + label {\n    width: 60px;\n    height: 34px;\n    font-size: 0;\n    position: absolute;\n    top: -52px;\n    left: -13px;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n}\n\n.toggle-all + label:before {\n    content: '❯';\n    font-size: 22px;\n    color: #e6e6e6;\n    padding: 10px 27px 10px 27px;\n}\n\n.toggle-all:checked + label:before {\n    color: #737373;\n}\n\n.todo-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.todo-list li {\n    position: relative;\n    font-size: 24px;\n    border-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n    border-bottom: none;\n}\n\n.todo-list li.editing {\n    border-bottom: none;\n    padding: 0;\n}\n\n.todo-list li.editing .edit {\n    display: block;\n    width: calc(100% - 43px);\n    padding: 12px 16px;\n    margin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n    display: none;\n}\n\n.todo-list li .toggle {\n    text-align: center;\n    width: 40px;\n    /* auto, since non-WebKit browsers doesn't support input styling */\n    height: auto;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    border: none; /* Mobile Safari */\n    -webkit-appearance: none;\n    appearance: none;\n}\n\n.todo-list li .toggle {\n    opacity: 0;\n}\n\n.todo-list li .toggle + label {\n    /*\n                Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n                IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n   */\n    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n    background-repeat: no-repeat;\n    background-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');\n}\n\n.todo-list li label {\n    word-break: break-all;\n    padding: 15px 15px 15px 60px;\n    display: block;\n    line-height: 1.2;\n    transition: color 0.4s;\n    font-weight: 400;\n    color: #4d4d4d;\n}\n\n.todo-list li.completed label {\n    color: #cdcdcd;\n    text-decoration: line-through;\n}\n\n.todo-list li .destroy {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 10px;\n    bottom: 0;\n    width: 40px;\n    height: 40px;\n    margin: auto 0;\n    font-size: 30px;\n    color: #cc9a9a;\n    margin-bottom: 11px;\n    transition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover {\n    color: #af5b5e;\n}\n\n.todo-list li .destroy:after {\n    content: '×';\n}\n\n.todo-list li:hover .destroy {\n    display: block;\n}\n\n.todo-list li .edit {\n    display: none;\n}\n\n.todo-list li.editing:last-child {\n    margin-bottom: -1px;\n}\n\n.footer {\n    padding: 10px 15px;\n    height: 20px;\n    text-align: center;\n    font-size: 15px;\n    border-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n    content: '';\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    height: 50px;\n    overflow: hidden;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n                0 8px 0 -3px #f6f6f6,\n                0 9px 1px -3px rgba(0, 0, 0, 0.2),\n                0 16px 0 -6px #f6f6f6,\n                0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n    float: left;\n    text-align: left;\n}\n\n.todo-count strong {\n    font-weight: 300;\n}\n\n.filters {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    position: absolute;\n    right: 0;\n    left: 0;\n}\n\n.filters li {\n    display: inline;\n}\n\n.filters li a {\n    color: inherit;\n    margin: 3px;\n    padding: 3px 7px;\n    text-decoration: none;\n    border: 1px solid transparent;\n    border-radius: 3px;\n}\n\n.filters li a:hover {\n    border-color: rgba(175, 47, 47, 0.1);\n}\n\n.filters li a.selected {\n    border-color: rgba(175, 47, 47, 0.2);\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n    float: right;\n    position: relative;\n    line-height: 20px;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.clear-completed:hover {\n    text-decoration: underline;\n}\n\n.info {\n    margin: 65px auto 0;\n    color: #4d4d4d;\n    font-size: 11px;\n    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n    text-align: center;\n}\n\n.info p {\n    line-height: 1;\n}\n\n.info a {\n    color: inherit;\n    text-decoration: none;\n    font-weight: 400;\n}\n\n.info a:hover {\n    text-decoration: underline;\n}\n\n/*\n  Hack to remove background from Mobile Safari.\n  Can't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n    .toggle-all,\n    .todo-list li .toggle {\n        background: none;\n    }\n\n    .todo-list li .toggle {\n        height: 40px;\n    }\n}\n\n@media (max-width: 430px) {\n    .footer {\n        height: 50px;\n    }\n\n    .filters {\n        bottom: 10px;\n    }\n}\n";
document.head.appendChild(__xwebpack_style);
    },
    {}
],})