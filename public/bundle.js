(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _newsForm = _interopRequireDefault(require("./news/news-form"));

var _newsRender = _interopRequireDefault(require("./news/news-render"));

var _newsDisplay = _interopRequireDefault(require("./news/news-display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _newsDisplay.default)();
const html = (0, _newsForm.default)();
(0, _newsRender.default)(html, "news_input");

},{"./news/news-display":3,"./news/news-form":4,"./news/news-render":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsFactory = (newsURL, newsName, newsSumm) => {
  return `<section>
    <h2><a href="${newsURL}">${newsName}</a></h2>
        <p>${newsSumm}</p>
            </section>`;
};

var _default = newsFactory;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsRender = _interopRequireDefault(require("./news-render"));

var _newsDisplayFactory = _interopRequireDefault(require("./news-display-factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newsGetAndShow = () => {
  return fetch("http://localhost:8088/news").then(response => response.json()).then(myParsedNews => {
    myParsedNews.forEach(news => {
      const newsName = news.newsTitle;
      const newsUrl = news.url;
      const newsSumm = news.synopsis;
      const html = (0, _newsDisplayFactory.default)(newsUrl, newsName, newsSumm);
      (0, _newsRender.default)(html, "news_display");
    });
  });
};

var _default = newsGetAndShow;
exports.default = _default;

},{"./news-display-factory":2,"./news-render":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsPrintToDom = (html, destination) => document.querySelector(`#${destination}`).innerHTML += html;

var _default = newsPrintToDom;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1kaXNwbGF5LWZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1kaXNwbGF5LmpzIiwiLi4vc2NyaXB0cy9uZXdzL25ld3MtZm9ybS5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzLXJlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBLE1BQU0sSUFBSSxHQUFHLHdCQUFiO0FBRUEseUJBQWUsSUFBZixFQUFxQixZQUFyQjs7Ozs7Ozs7OztBQ1BBLE1BQU0sV0FBVyxHQUFHLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsUUFBcEIsS0FBaUM7QUFDakQsU0FBUTttQkFDTyxPQUFRLEtBQUksUUFBUzthQUMzQixRQUFTO3VCQUZsQjtBQUlILENBTEQ7O2VBT2UsVzs7Ozs7Ozs7Ozs7QUNQZjs7QUFDQTs7OztBQUVBLE1BQU0sY0FBYyxHQUFHLE1BQU07QUFDekIsU0FBTyxLQUFLLENBQUMsNEJBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixFQUVGLElBRkUsQ0FFRyxZQUFZLElBQUk7QUFDbEIsSUFBQSxZQUFZLENBQUMsT0FBYixDQUFxQixJQUFJLElBQUk7QUFDekIsWUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQXRCO0FBQ0EsWUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQXJCO0FBQ0EsWUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQXRCO0FBRUEsWUFBTSxJQUFJLEdBQUcsaUNBQVksT0FBWixFQUFxQixRQUFyQixFQUErQixRQUEvQixDQUFiO0FBQ0EsK0JBQWUsSUFBZixFQUFxQixjQUFyQjtBQUNILEtBUEQ7QUFRSCxHQVhFLENBQVA7QUFZSCxDQWJEOztlQWNlLGM7Ozs7Ozs7Ozs7O0FDakJmLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTTtBQUMvQixTQUFROzs7Ozs7a0RBQVI7QUFPQyxDQVJEOztlQVNlLGdCOzs7Ozs7Ozs7OztBQ1RmLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBRCxFQUFPLFdBQVAsS0FBdUIsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsSUFBRyxXQUFZLEVBQXZDLEVBQTBDLFNBQTFDLElBQXVELElBQXJHOztlQUVlLGMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbmV3c0ltcG9ydEZhY3RvcnkgZnJvbSBcIi4vbmV3cy9uZXdzLWZvcm1cIlxyXG5pbXBvcnQgbmV3c1ByaW50VG9Eb20gZnJvbSBcIi4vbmV3cy9uZXdzLXJlbmRlclwiXHJcbmltcG9ydCBuZXdzR2V0QW5kU2hvdyBmcm9tIFwiLi9uZXdzL25ld3MtZGlzcGxheVwiXHJcblxyXG5uZXdzR2V0QW5kU2hvdygpO1xyXG5jb25zdCBodG1sID0gbmV3c0ltcG9ydEZhY3RvcnkoKVxyXG5cclxubmV3c1ByaW50VG9Eb20oaHRtbCwgXCJuZXdzX2lucHV0XCIpIiwiY29uc3QgbmV3c0ZhY3RvcnkgPSAobmV3c1VSTCwgbmV3c05hbWUsIG5ld3NTdW1tKSA9PiB7XHJcbiAgICByZXR1cm4gYDxzZWN0aW9uPlxyXG4gICAgPGgyPjxhIGhyZWY9XCIke25ld3NVUkx9XCI+JHtuZXdzTmFtZX08L2E+PC9oMj5cclxuICAgICAgICA8cD4ke25ld3NTdW1tfTwvcD5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3c0ZhY3RvcnkiLCJpbXBvcnQgbmV3c1ByaW50VG9Eb20gZnJvbSBcIi4vbmV3cy1yZW5kZXJcIlxyXG5pbXBvcnQgbmV3c0ZhY3RvcnkgZnJvbSBcIi4vbmV3cy1kaXNwbGF5LWZhY3RvcnlcIlxyXG5cclxuY29uc3QgbmV3c0dldEFuZFNob3cgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c1wiKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihteVBhcnNlZE5ld3MgPT4ge1xyXG4gICAgICAgICAgICBteVBhcnNlZE5ld3MuZm9yRWFjaChuZXdzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld3NOYW1lID0gbmV3cy5uZXdzVGl0bGVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld3NVcmwgPSBuZXdzLnVybFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3c1N1bW0gPSBuZXdzLnN5bm9wc2lzXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IG5ld3NGYWN0b3J5KG5ld3NVcmwsIG5ld3NOYW1lLCBuZXdzU3VtbSlcclxuICAgICAgICAgICAgICAgIG5ld3NQcmludFRvRG9tKGh0bWwsIFwibmV3c19kaXNwbGF5XCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBuZXdzR2V0QW5kU2hvdyIsImNvbnN0IG5ld3NJbnB1dEZhY3RvcnkgPSAoKSA9PiB7XHJcbnJldHVybiBgPGxhYmVsIGZvcj1cIk5hbWVcIj5OYW1lOiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJuYW1lXCI+U3VtbWFyeTogPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJzdW1tYXJ5XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInN1bW1hcnlcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPkVtYWlsOiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cIlVSTFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvblwiPlNhdmUgQXJ0aWNsZTwvYnV0dG9uPmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBuZXdzSW5wdXRGYWN0b3J5IiwiY29uc3QgbmV3c1ByaW50VG9Eb20gPSAoaHRtbCwgZGVzdGluYXRpb24pID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2Rlc3RpbmF0aW9ufWApLmlubmVySFRNTCArPSBodG1sXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXdzUHJpbnRUb0RvbVxyXG4iXX0=
