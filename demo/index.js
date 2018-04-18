(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @since 2015-09-21 13:20
 * @author vivaxy
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcEventEmitterJs = require('../src/event-emitter.js');

var _srcEventEmitterJs2 = _interopRequireDefault(_srcEventEmitterJs);

var _srcEventEmitter2Js = require('../src/event-emitter2.js');

var _srcEventEmitter2Js2 = _interopRequireDefault(_srcEventEmitter2Js);

var event = new _srcEventEmitterJs2['default']();

event.on('lol', function (data1, data2) {
  console.log(undefined, data1, data2);
});

event.emit('lol', 1, 2); // => undefined 1 2

var test = function test(e) {
  console.log(e);
};

event.on('test', test);
event.on('test', test);
event.on('test', test);

event.emit('test', '这是测试'); // => 这是测试 x3
event.off('test', test);
event.emit('test', '这是测试'); // => 这是测试 x2
event.off('test');
event.emit('test', '这是测试');

var event2 = new _srcEventEmitter2Js2['default']();
var callback1 = function callback1(event, data, sender, refer) {
  console.log(event, data, sender, refer);
};
var refer1 = { name: 'refer1' };
event2.on('lol', callback1, refer1);
event2.emit('lol', { name: 'data1' }, { name: 'sender' }); // => lol { name: "data1" } { name: "sender" } { name: "refer1" }
event2.off('lol', callback1, refer1);
event2.emit('lol', { name: 'data2' }, { name: 'sender' });

},{"../src/event-emitter.js":2,"../src/event-emitter2.js":3}],2:[function(require,module,exports){
/**
 * @since 15-09-02 10:25
 * @author vivaxy
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventEmitter = (function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  /**
   *
   * @param event
   * @param callback
   * @returns {EventEmitter}
   */

  _createClass(EventEmitter, [{
    key: 'on',
    value: function on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
      return this;
    }

    /**
     *
     * @param event
     * @returns {EventEmitter}
     */
  }, {
    key: 'emit',
    value: function emit(event) {
      var _this = this;
      var callbacks = this.events[event];
      var _arguments = arguments;
      if (callbacks) {
        callbacks.forEach(function (callback) {
          callback.apply(_this, Array.prototype.slice.call(_arguments, 1));
        });
      }
      return this;
    }

    /**
     *
     * @param event
     * @param callback
     * @returns {EventEmitter}
     */
  }, {
    key: 'off',
    value: function off(event, callback) {
      if (this.events[event] && callback) {
        this.events[event].splice(this.events[event].indexOf(callback), 1);
      } else {
        this.events[event] = [];
      }
      return this;
    }
  }]);

  return EventEmitter;
})();

exports['default'] = EventEmitter;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
/**
 * @since 20180418 15:02
 * @author vivaxy
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = (function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  /**
   *
   * @param event
   * @param callback
   * @param refer
   * @returns {EventEmitter}
   */

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, callback, refer) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push({ callback: callback, refer: refer });
      return this;
    }

    /**
     * Do not using polymorphism
     * @param event
     * @param data
     * @param sender
     * @returns {EventEmitter}
     */
  }, {
    key: "emit",
    value: function emit(event, data, sender) {
      var handlers = this.events[event];
      for (var i = 0; i < handlers.length;) {
        var handler = handlers[i];
        if (handler) {
          handler.callback(event, data, sender, handler.refer);
          if (handler === handlers[i]) {
            i++;
          }
        }
      }
      return this;
    }

    /**
     *
     * @param event
     * @param callback
     * @param refer
     * @returns {EventEmitter}
     */
  }, {
    key: "off",
    value: function off(event, callback, refer) {
      var handlers = this.events[event];
      if (handlers) {
        var handlersLength = handlers.length;
        for (var i = 0; i < handlersLength; i++) {
          var handler = handlers[i];
          if (handler.callback === callback && handler.refer === refer) {
            handler.splice(i, 1);
            if (handlers.length === 0) {
              delete this.events[event];
            }
            return this;
          }
        }
      } else {
        this.events[event] = [];
      }
      return this;
    }
  }]);

  return EventEmitter;
})();

exports["default"] = EventEmitter;
module.exports = exports["default"];

},{}]},{},[1]);
