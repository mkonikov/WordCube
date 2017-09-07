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

var _cube = __webpack_require__(2);

var _cube2 = _interopRequireDefault(_cube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game() {
  _classCallCheck(this, Game);

  this.cube = new _cube2.default();
};

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _letter = __webpack_require__(3);

var _letter2 = _interopRequireDefault(_letter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOP = ['a', 'e', 'i', 'o', 't'];
var FREQUENT = ['h', 'n', 'r', 's'];
var OFTEN = ['c', 'd', 'l', 'u'];
var RARE = ['b', 'f', 'g', 'k', 'm', 'p', 'v', 'w', 'y', 'j'];
var RAREST = ['z', 'x', 'q'];

var Cube = function () {
  function Cube() {
    _classCallCheck(this, Cube);

    this.bindCube();
    this.selection = "";
    this.selecting = false;
    this.prevCoords = [];
    this.letters = [];
    this.shuffleCube();
  }

  _createClass(Cube, [{
    key: 'randomLetters',
    value: function randomLetters() {
      return [].concat(TOP, TOP, TOP, TOP, TOP, FREQUENT, FREQUENT, FREQUENT, FREQUENT, OFTEN, OFTEN, OFTEN, RARE, RARE, RAREST);
    }
  }, {
    key: 'shuffleCube',
    value: function shuffleCube() {
      var _this = this;

      [0, 1, 2].forEach(function (y) {
        [0, 1, 2].forEach(function (x) {
          var availableLetters = _this.randomLetters();
          var letterOptions = {
            coords: [x, y],
            character: availableLetters[Math.floor(Math.random() * availableLetters.length)]
          };
          _this.letters.push(new _letter2.default(letterOptions));
        });
      });
    }
  }, {
    key: 'handleLetterSelection',
    value: function handleLetterSelection(letter) {
      if (this.checkMove(letter)) {
        var hoveredLetter = letter.character;
        this.selection += letter.character;
        console.log(this.selection);
      }
    }
  }, {
    key: 'checkMove',
    value: function checkMove(letter) {
      if (this.prevCoords.length < 1) {
        this.prevCoords.push(letter.coords);
        return true;
      }

      var last = this.prevCoords.length - 1;
      var xDiff = letter.coords[0] - this.prevCoords[last][0];
      var yDiff = letter.coords[1] - this.prevCoords[last][1];
      var actuallyMoved = [xDiff, yDiff] !== [0, 0];
      var xNeighbor = [-1, 0, 1].includes(xDiff);
      var yNeighbor = [-1, 0, 1].includes(yDiff);
      var pastPos = this.prevCoords.some(function (el) {
        return el.join() === letter.coords.join();
      });

      if (this.prevCoords.length < 1 || actuallyMoved && !pastPos && xNeighbor && yNeighbor) {
        this.prevCoords.push(letter.coords);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'logLetter',
    value: function logLetter(e) {
      if (this.selecting && e.target.nodeName === "LI") {
        var letter = new _letter2.default(e.target.dataset);
        this.handleLetterSelection(letter);
      }
      e.stopPropagation();
    }
  }, {
    key: 'submitWord',
    value: function submitWord() {
      this.selection = "";
      this.prevCoords = [];
    }
  }, {
    key: 'toggleSelecting',
    value: function toggleSelecting(e) {
      if (this.selecting) {
        this.submitWord();
      } else {
        var letter = new _letter2.default(e.target.dataset);
        this.handleLetterSelection(letter);
      }
      this.selecting = !this.selecting;
    }
  }, {
    key: 'bindCube',
    value: function bindCube() {
      var _this2 = this;

      var cube = document.querySelector('#cube');
      cube.addEventListener("click", function (e) {
        return _this2.toggleSelecting(e);
      });
      cube.addEventListener("mouseover", function (e) {
        return _this2.logLetter(e);
      });
    }
  }]);

  return Cube;
}();

exports.default = Cube;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Letter = function Letter(letterData) {
  _classCallCheck(this, Letter);

  this.coords = [parseInt(letterData.x), parseInt(letterData.y)];
  this.character = letterData.value;
};

exports.default = Letter;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map