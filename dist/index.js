'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function eventToPosition(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}

function distance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

var LongPressable = function (_React$PureComponent) {
  _inherits(LongPressable, _React$PureComponent);

  function LongPressable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LongPressable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LongPressable.__proto__ || Object.getPrototypeOf(LongPressable)).call.apply(_ref, [this].concat(args))), _this), _this.isLongPressing = false, _this.startingPosition = { x: 0, y: 0 }, _this.clearTimeout = function () {
      if (_this.timerID) {
        clearTimeout(_this.timerID);
        _this.timerID = null;
      }
    }, _this.onPointerUp = function (e) {
      if (_this.timerID) {
        _this.cancelLongPress();
      }

      var mousePosition = eventToPosition(e);

      if (!_this.isLongPressing && !_this.exceedDragThreshold(mousePosition)) {
        _this.props.onShortPress(e);
      } else {
        _this.isLongPressing = false;
      }
    }, _this.onPointerDown = function (e) {
      if (_this.props.primaryMouseButtonOnly) {
        if (e.pointerType === 'mouse' && e.button !== 0) {
          return;
        }
      }

      _this.startingPosition = eventToPosition(e);

      _this.timerID = setTimeout(function () {
        _this.isLongPressing = true;
        _this.props.onLongPress(e);
      }, _this.props.longPressTime);
    }, _this.onPointerMove = function (e) {
      var mousePosition = eventToPosition(e);
      if (_this.timerID && _this.exceedDragThreshold(mousePosition)) {
        _this.cancelLongPress();
      }
    }, _this.onPointerLeave = function () {
      if (_this.timerID) {
        _this.cancelLongPress();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LongPressable, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimeout();
    }
  }, {
    key: 'cancelLongPress',
    value: function cancelLongPress() {
      this.clearTimeout();
    }
  }, {
    key: 'exceedDragThreshold',
    value: function exceedDragThreshold(point) {
      return distance(this.startingPosition, point) > this.props.dragThreshold;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          onPointerUp: this.onPointerUp,
          onPointerDown: this.onPointerDown,
          onPointerMove: this.onPointerMove,
          onPointerLeave: this.onPointerLeave
        },
        this.props.children
      );
    }
  }]);

  return LongPressable;
}(_react2.default.PureComponent);

LongPressable.propTypes = {
  onLongPress: _propTypes2.default.func.isRequired,
  onShortPress: _propTypes2.default.func,
  longPressTime: _propTypes2.default.number,
  primaryMouseButtonOnly: _propTypes2.default.bool,
  // Maximum distance (pixels) user is allowed to drag before
  // click is canceled
  dragThreshold: _propTypes2.default.number,
  children: _propTypes2.default.node
};
LongPressable.defaultProps = {
  longPressTime: 500,
  primaryMouseButtonOnly: true,
  dragThreshold: 100
};
exports.default = LongPressable;