(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _newsForm = _interopRequireDefault(require("./news/news-form"));

var _newsInputRender = _interopRequireDefault(require("./news/news-input-render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const html = (0, _newsForm.default)();
(0, _newsInputRender.default)(html, "news_input");

},{"./news/news-form":2,"./news/news-input-render":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsInputFactory = () => {
  return `<label for="Name">Name: </label>
        <input id="name" type="text">
        <label for="name">Summary: </label>
        <input id="summary" type="text" placeholder="summary">
        <label for="name">Email: </label>
        <input id="URL" type="text">
        <button id="button">Save Article</button>`;
};

var _default = newsInputFactory;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsPrintToDom = (html, destination) => document.querySelector(`#${destination}`).innerHTML += html;

var _default = newsPrintToDom;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1mb3JtLmpzIiwiLi4vc2NyaXB0cy9uZXdzL25ld3MtaW5wdXQtcmVuZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLHdCQUFiO0FBRUEsOEJBQWUsSUFBZixFQUFxQixZQUFyQjs7Ozs7Ozs7OztBQ0xBLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTTtBQUMvQixTQUFROzs7Ozs7a0RBQVI7QUFPQyxDQVJEOztlQVVlLGdCOzs7Ozs7Ozs7OztBQ1ZmLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBRCxFQUFPLFdBQVAsS0FBdUIsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsSUFBRyxXQUFZLEVBQXZDLEVBQTBDLFNBQTFDLElBQXVELElBQXJHOztlQUVlLGMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbmV3c0ltcG9ydEZhY3RvcnkgZnJvbSBcIi4vbmV3cy9uZXdzLWZvcm1cIlxyXG5pbXBvcnQgbmV3c1ByaW50VG9Eb20gZnJvbSBcIi4vbmV3cy9uZXdzLWlucHV0LXJlbmRlclwiXHJcblxyXG5jb25zdCBodG1sID0gbmV3c0ltcG9ydEZhY3RvcnkoKVxyXG5cclxubmV3c1ByaW50VG9Eb20oaHRtbCwgXCJuZXdzX2lucHV0XCIpIiwiY29uc3QgbmV3c0lucHV0RmFjdG9yeSA9ICgpID0+IHtcclxucmV0dXJuIGA8bGFiZWwgZm9yPVwiTmFtZVwiPk5hbWU6IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGlkPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIj5TdW1tYXJ5OiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cInN1bW1hcnlcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwic3VtbWFyeVwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJuYW1lXCI+RW1haWw6IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGlkPVwiVVJMXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiYnV0dG9uXCI+U2F2ZSBBcnRpY2xlPC9idXR0b24+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXdzSW5wdXRGYWN0b3J5IiwiY29uc3QgbmV3c1ByaW50VG9Eb20gPSAoaHRtbCwgZGVzdGluYXRpb24pID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2Rlc3RpbmF0aW9ufWApLmlubmVySFRNTCArPSBodG1sXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXdzUHJpbnRUb0RvbVxyXG4iXX0=
