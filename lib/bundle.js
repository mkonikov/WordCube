/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function (e) {
  var game = new _game2.default();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cube = __webpack_require__(2);

var _cube2 = _interopRequireDefault(_cube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.bindCube();
    this.selection = "";
    this.selecting = false;
    this.prevCoords = [];
  }

  _createClass(Game, [{
    key: "handleLetterSelection",
    value: function handleLetterSelection(moveData) {
      if (this.checkMove(moveData)) {
        var hoveredLetter = moveData.value;
        this.selection += hoveredLetter;
        console.log(this.selection);
      }
    }
  }, {
    key: "checkMove",
    value: function checkMove(pos) {
      var x = parseInt(pos.x);
      var y = parseInt(pos.y);

      if (this.prevCoords.length < 1) {
        this.prevCoords.push([x, y]);
        return true;
      }

      var last = this.prevCoords.length - 1;
      var xDiff = x - this.prevCoords[last][0];
      var yDiff = y - this.prevCoords[last][1];
      var actuallyMoved = [xDiff, yDiff] !== [0, 0];
      var xNeighbor = [-1, 0, 1].includes(xDiff);
      var yNeighbor = [-1, 0, 1].includes(yDiff);
      var pastPos = this.prevCoords.some(function (el) {
        return el.join() === [x, y].join();
      });

      if (this.prevCoords.length < 1 || actuallyMoved && !pastPos && xNeighbor && yNeighbor) {
        this.prevCoords.push([x, y]);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "logLetter",
    value: function logLetter(e) {
      if (this.selecting && e.target.nodeName === "LI") {
        this.handleLetterSelection(e.target.dataset);
      }
      e.stopPropagation();
    }
  }, {
    key: "submitWord",
    value: function submitWord() {
      this.selection = "";
      this.prevCoords = [];
    }
  }, {
    key: "toggleSelecting",
    value: function toggleSelecting(e) {
      if (this.selecting) {
        this.submitWord();
      } else {
        debugger;
        this.handleLetterSelection(e.target.dataset);
      }
      this.selecting = !this.selecting;
    }
  }, {
    key: "bindCube",
    value: function bindCube() {
      var _this = this;

      var cube = document.querySelector('#cube');
      cube.addEventListener("click", function (e) {
        return _this.toggleSelecting(e);
      });
      cube.addEventListener("mouseover", function (e) {
        return _this.logLetter(e);
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = function Cube() {
  _classCallCheck(this, Cube);
};

exports.default = Cube;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map