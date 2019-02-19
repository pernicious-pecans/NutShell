(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _newsDisplay = _interopRequireDefault(require("./news/news-display"));

var _newsPostManager = _interopRequireDefault(require("./news/news-post-manager"));

var _newsEditDelete = _interopRequireDefault(require("./news/news-edit-delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_newsPostManager.default.generateNewsForm();

_newsPostManager.default.postNews();

(0, _newsDisplay.default)();
(0, _newsEditDelete.default)();

},{"./news/news-display":3,"./news/news-edit-delete":4,"./news/news-post-manager":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsFactory = (newsURL, newsName, newsSumm, newsId) => {
  return `<section>
    <h2><a href="${newsURL}">${newsName}</a></h2>
        <p>${newsSumm}</p>
        <button id="edit--${newsId}">edit</button>
        <button id="delete--${newsId}">delete</button>
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

var _newsDisplayFactory = _interopRequireDefault(require("./news-display-factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);

const newsGetAndShow = () => {
  return fetch("http://localhost:8088/news").then(response => response.json()).then(myParsedNews => {
    myParsedNews.forEach(news => {
      const newsName = news.newsTitle;
      const newsUrl = news.url;
      const newsSumm = news.synopsis;
      const newsId = news.id;
      const html = (0, _newsDisplayFactory.default)(newsUrl, newsName, newsSumm, newsId);
      $("#news_display").innerHTML += html;
    });
  });
};

var _default = newsGetAndShow;
exports.default = _default;

},{"./news-display-factory":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsAPIButler = _interopRequireDefault(require("./newsAPIButler"));

var _newsDisplay = _interopRequireDefault(require("./news-display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);

//adds an event listener to the entire news_display container
let newsItemChange = () => {
  let contactDisplayEl = $("#news_display");
  contactDisplayEl.addEventListener("click", () => {
    //if the id of the event target starts with "delte button"
    if (event.target.id.startsWith("delete--")) {
      //create a refrence to the actual id of the contact you want to delte
      let newsId = event.target.id.split("--")[1];
      console.log(newsId); //calls the method of delete on newsAPIButler with the ID refrence as an argument

      _newsAPIButler.default.deleteNews(newsId).then((0, _newsDisplay.default)());
    } else if (event.target.id.startsWith("edit--")) {
      //create a refrence to the actual id of the contact you want to edit
      let newsId = event.target.id.split("--")[1];

      _newsAPIButler.default.editNews(newsId).then(response => {
        $("#name").value = response.name;
        $("#summary").value = response.synopsis;
        $("#URL").value = response.url;
        newsId = response.id;
      });
    }
  });
};

var _default = newsItemChange;
exports.default = _default;

},{"./news-display":3,"./newsAPIButler":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsDisplay = _interopRequireDefault(require("./news-display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const NewsManager = {
  postNews: () => {
    document.getElementById("#newsPost").addEventListener("click", () => {
      const newsToAdd = {
        // userId: 2,
        newsTitle: $("#name").value,
        synopsis: $("#summary").value,
        url: $("#URL").value,
        newsTimestamp: `${new Date(2019, 2)}`,
        user: {
          userId: 2
        }
      };
      fetch("http://localhost:8088/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newsToAdd)
      }); // .then(r => r.json())
      // // Because json-server sends us the new thing in response
      // .then((newUserObject) => {
      //     // Show contact entry form
      //     generateContactForm(newUserObject.id)
      //     contactForm()
      // })

      (0, _newsDisplay.default)();
    });
  },
  generateNewsForm: () => {
    document.querySelector("#news_input").innerHTML = `
        <label for="Name">Name: </label>
        <input id="name" type="text">
        <label for="name">Summary: </label>
        <input id="summary" type="text" placeholder="summary">
        <label for="name">URL: </label>
        <input id="URL" type="text">
        <button id="#newsPost">Save Article</button>
        `;
  }
};
var _default = NewsManager;
exports.default = _default;

},{"./news-display":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//creates an object with TWO keys, each is a method
const newsAPIButler = {
  getUserNews: userId => {
    return fetch(`http://localhost:8088/news?_expand=user&userId=${userId}`).then(res => res.json());
  },
  getOneArticle: id => {
    return fetch(`http://localhost:8088/news/${id}`).then(res => res.json());
  },
  postNews: (userId, obj) => {
    return fetch(`http://localhost:8088/news?_expand=user&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
  },
  editNews: (id, obj) => {
    return fetch(`http://localhost:8088/news/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
  },
  deleteNews: id => {
    return fetch(`http://localhost:8088/news/${id}`, {
      method: "DELETE"
    });
  } //     //deletes a contact from the database
  //     deleteNews: newsID => {
  //         return fetch(`http://127.0.0.1:8088/news/${newsID}`, {
  //             method: "DELETE"
  //         });
  //     },
  //     getNews: newsID => {
  //         return fetch(`http://127.0.0.1:8088/news/${newsID}`).then(response =>
  //             response.json()
  //         );
  //     },
  //     //gets the contact array and parses the json
  //     getForUser: function (userId) {
  //         return fetch(`http://localhost:8088/news?userId=${userId}`).then(response =>
  //             response.json()
  //         );
  //     },
  //     //gets the contact array and parses the json
  //     get: function () {
  //         return fetch("http://localhost:8088/news").then(response =>
  //             response.json()
  //         );
  //     },
  //     //posts to the database - the function accepts an object as the argument
  //     Put: function (newsID, contact) {
  //         return fetch(`http://localhost:8088/news/${newsID}`, {
  //             method: "PUT",
  //             headers: {
  //                 "Content-Type": "application/json"
  //             },
  //             body: JSON.stringify(contact)
  //         });
  //     },
  //     //posts to the database - the function accepts an object as the argument
  //     Post: function (entryToPost) {
  //         return fetch("http://localhost:8088/news", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json"
  //             },
  //             body: JSON.stringify(entryToPost)
  //         });
  //     }
  // };
  //exports the contactCollection object

};
var _default = newsAPIButler;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1kaXNwbGF5LWZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1kaXNwbGF5LmpzIiwiLi4vc2NyaXB0cy9uZXdzL25ld3MtZWRpdC1kZWxldGUuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1wb3N0LW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0FQSUJ1dGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSx5QkFBWSxnQkFBWjs7QUFDQSx5QkFBWSxRQUFaOztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLFFBQXBCLEVBQThCLE1BQTlCLEtBQXlDO0FBQ3pELFNBQVE7bUJBQ08sT0FBUSxLQUFJLFFBQVM7YUFDM0IsUUFBUzs0QkFDTSxNQUFPOzhCQUNMLE1BQU87dUJBSmpDO0FBTUgsQ0FQRDs7ZUFRZSxXOzs7Ozs7Ozs7OztBQ1JmOzs7O0FBQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQ3pCLFNBQU8sS0FBSyxDQUFDLDRCQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsRUFFRixJQUZFLENBRUcsWUFBWSxJQUFJO0FBQ2xCLElBQUEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsSUFBSSxJQUFJO0FBQ3pCLFlBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUF0QjtBQUNBLFlBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFyQjtBQUNBLFlBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUF0QjtB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QSxNQUFNLEVBQUUsS0FEcUM7QUFFN0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZvQztBQUs3QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWY7QUFMdUMsS0FBckMsQ0FBWjtBQU9ILEdBM0JpQjtBQTRCbEIsRUFBQSxVQUFVLEVBQUcsRUFBRCxJQUFRO0FBQ2hCLFdBQU8sS0FBSyxDQUFFLDhCQUE2QixFQUFHLEVBQWxDLEVBQXFDO0FBQzdDLE1BQUEsTUFBTSxFQUFFO0FBRHFDLEtBQXJDLENBQVo7QUFHUCxHQWhDcUIsQ0FpQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE5RXNCLENBQXRCO2VBZ0ZlLGEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbmV3c0dldEFuZFNob3cgZnJvbSBcIi4vbmV3cy9uZXdzLWRpc3BsYXlcIlxyXG5pbXBvcnQgTmV3c01hbmFnZXIgZnJvbSBcIi4vbmV3cy9uZXdzLXBvc3QtbWFuYWdlclwiXHJcbmltcG9ydCBuZXdzSXRlbUNoYW5nZSBmcm9tIFwiLi9uZXdzL25ld3MtZWRpdC1kZWxldGVcIlxyXG5cclxuTmV3c01hbmFnZXIuZ2VuZXJhdGVOZXdzRm9ybSgpXHJcbk5ld3NNYW5hZ2VyLnBvc3ROZXdzKClcclxubmV3c0dldEFuZFNob3coKVxyXG5uZXdzSXRlbUNoYW5nZSgpIiwiY29uc3QgbmV3c0ZhY3RvcnkgPSAobmV3c1VSTCwgbmV3c05hbWUsIG5ld3NTdW1tLCBuZXdzSWQpID0+IHtcclxuICAgIHJldHVybiBgPHNlY3Rpb24+XHJcbiAgICA8aDI+PGEgaHJlZj1cIiR7bmV3c1VSTH1cIj4ke25ld3NOYW1lfTwvYT48L2gyPlxyXG4gICAgICAgIDxwPiR7bmV3c1N1bW19PC9wPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJlZGl0LS0ke25ld3NJZH1cIj5lZGl0PC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS0tJHtuZXdzSWR9XCI+ZGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3c0ZhY3RvcnkiLCJpbXBvcnQgbmV3c0ZhY3RvcnkgZnJvbSBcIi4vbmV3cy1kaXNwbGF5LWZhY3RvcnlcIlxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgbmV3c0dldEFuZFNob3cgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c1wiKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihteVBhcnNlZE5ld3MgPT4ge1xyXG4gICAgICAgICAgICBteVBhcnNlZE5ld3MuZm9yRWFjaChuZXdzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld3NOYW1lID0gbmV3cy5uZXdzVGl0bGVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld3NVcmwgPSBuZXdzLnVybFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3c1N1bW0gPSBuZXdzLnN5bm9wc2lzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdzSWQgPSBuZXdzLmlkXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IG5ld3NGYWN0b3J5KG5ld3NVcmwsIG5ld3NOYW1lLCBuZXdzU3VtbSwgbmV3c0lkKVxyXG4gICAgICAgICAgICAgICAgJChcIiNuZXdzX2Rpc3BsYXlcIikuaW5uZXJIVE1MICs9IGh0bWxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5ld3NHZXRBbmRTaG93IiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuaW1wb3J0IG5ld3NBUElCdXRsZXIgZnJvbSBcIi4vbmV3c0FQSUJ1dGxlclwiO1xyXG5pbXBvcnQgbmV3c0dldEFuZFNob3cgZnJvbSBcIi4vbmV3cy1kaXNwbGF5XCI7XHJcblxyXG4vL2FkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGVudGlyZSBuZXdzX2Rpc3BsYXkgY29udGFpbmVyXHJcbmxldCBuZXdzSXRlbUNoYW5nZSA9ICgpID0+IHtcclxuICBsZXQgY29udGFjdERpc3BsYXlFbCA9ICQoXCIjbmV3c19kaXNwbGF5XCIpO1xyXG4gIGNvbnRhY3REaXNwbGF5RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vaWYgdGhlIGlkIG9mIHRoZSBldmVudCB0YXJnZXQgc3RhcnRzIHdpdGggXCJkZWx0ZSBidXR0b25cIlxyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZGVsZXRlLS1cIikpIHtcclxuICAgICAgLy9jcmVhdGUgYSByZWZyZW5jZSB0byB0aGUgYWN0dWFsIGlkIG9mIHRoZSBjb250YWN0IHlvdSB3YW50IHRvIGRlbHRlXHJcbiAgICAgIGxldCBuZXdzSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuICAgICAgY29uc29sZS5sb2cobmV3c0lkKVxyXG4gICAgICAvL2NhbGxzIHRoZSBtZXRob2Qgb2YgZGVsZXRlIG9uIG5ld3NBUElCdXRsZXIgd2l0aCB0aGUgSUQgcmVmcmVuY2UgYXMgYW4gYXJndW1lbnRcclxuICAgICAgbmV3c0FQSUJ1dGxlci5kZWxldGVOZXdzKG5ld3NJZCkudGhlbihuZXdzR2V0QW5kU2hvdygpKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJlZGl0LS1cIikpIHtcclxuICAgICAgLy9jcmVhdGUgYSByZWZyZW5jZSB0byB0aGUgYWN0dWFsIGlkIG9mIHRoZSBjb250YWN0IHlvdSB3YW50IHRvIGVkaXRcclxuICAgICAgbGV0IG5ld3NJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xyXG5cclxuXHJcbiAgICAgIG5ld3NBUElCdXRsZXIuZWRpdE5ld3MobmV3c0lkKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAkKFwiI25hbWVcIikudmFsdWUgPSByZXNwb25zZS5uYW1lO1xyXG4gICAgICAgICQoXCIjc3VtbWFyeVwiKS52YWx1ZSA9IHJlc3BvbnNlLnN5bm9wc2lzO1xyXG4gICAgICAgICQoXCIjVVJMXCIpLnZhbHVlID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgIG5ld3NJZCA9IHJlc3BvbnNlLmlkO1xyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ld3NJdGVtQ2hhbmdlOyIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcbmltcG9ydCBuZXdzR2V0QW5kU2hvdyBmcm9tIFwiLi9uZXdzLWRpc3BsYXlcIlxyXG5jb25zdCBOZXdzTWFuYWdlciA9IHtcclxuICAgIHBvc3ROZXdzIDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI25ld3NQb3N0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgbmV3c1RvQWRkID0ge1xyXG4gICAgICAgICAgICAgICAgLy8gdXNlcklkOiAyLFxyXG4gICAgICAgICAgICAgICAgbmV3c1RpdGxlOiAkKFwiI25hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBzeW5vcHNpczogJChcIiNzdW1tYXJ5XCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAkKFwiI1VSTFwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIG5ld3NUaW1lc3RhbXA6IGAke25ldyBEYXRlKDIwMTksIDIpfWAsXHJcbiAgICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NcIiwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld3NUb0FkZClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLy8gLy8gQmVjYXVzZSBqc29uLXNlcnZlciBzZW5kcyB1cyB0aGUgbmV3IHRoaW5nIGluIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIC8vIC50aGVuKChuZXdVc2VyT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBTaG93IGNvbnRhY3QgZW50cnkgZm9ybVxyXG4gICAgICAgICAgICAvLyAgICAgZ2VuZXJhdGVDb250YWN0Rm9ybShuZXdVc2VyT2JqZWN0LmlkKVxyXG4gICAgICAgICAgICAvLyAgICAgY29udGFjdEZvcm0oKVxyXG4gICAgICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICBuZXdzR2V0QW5kU2hvdygpIH0pXHJcbiAgICB9LFxyXG4gICAgZ2VuZXJhdGVOZXdzRm9ybSA6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3NfaW5wdXRcIikuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJOYW1lXCI+TmFtZTogPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPlN1bW1hcnk6IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGlkPVwic3VtbWFyeVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJzdW1tYXJ5XCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIj5VUkw6IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGlkPVwiVVJMXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiI25ld3NQb3N0XCI+U2F2ZSBBcnRpY2xlPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld3NNYW5hZ2VyIiwiLy9jcmVhdGVzIGFuIG9iamVjdCB3aXRoIFRXTyBrZXlzLCBlYWNoIGlzIGEgbWV0aG9kXHJcbmNvbnN0IG5ld3NBUElCdXRsZXIgPSB7XHJcblxyXG4gICAgZ2V0VXNlck5ld3M6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzP19leHBhbmQ9dXNlciZ1c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZ2V0T25lQXJ0aWNsZTogKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3cy8ke2lkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHBvc3ROZXdzOiAodXNlcklkLCBvYmopID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzP19leHBhbmQ9dXNlciZ1c2VySWQ9JHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0TmV3czogKGlkLCBvYmopID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZU5ld3M6IChpZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3MvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICB9KVxyXG59XHJcbi8vICAgICAvL2RlbGV0ZXMgYSBjb250YWN0IGZyb20gdGhlIGRhdGFiYXNlXHJcbi8vICAgICBkZWxldGVOZXdzOiBuZXdzSUQgPT4ge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4L25ld3MvJHtuZXdzSUR9YCwge1xyXG4vLyAgICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH0sXHJcbi8vICAgICBnZXROZXdzOiBuZXdzSUQgPT4ge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4L25ld3MvJHtuZXdzSUR9YCkudGhlbihyZXNwb25zZSA9PlxyXG4vLyAgICAgICAgICAgICByZXNwb25zZS5qc29uKClcclxuLy8gICAgICAgICApO1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICAvL2dldHMgdGhlIGNvbnRhY3QgYXJyYXkgYW5kIHBhcnNlcyB0aGUganNvblxyXG4vLyAgICAgZ2V0Rm9yVXNlcjogZnVuY3Rpb24gKHVzZXJJZCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3M/dXNlcklkPSR7dXNlcklkfWApLnRoZW4ocmVzcG9uc2UgPT5cclxuLy8gICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpXHJcbi8vICAgICAgICAgKTtcclxuLy8gICAgIH0sXHJcbi8vICAgICAvL2dldHMgdGhlIGNvbnRhY3QgYXJyYXkgYW5kIHBhcnNlcyB0aGUganNvblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NcIikudGhlbihyZXNwb25zZSA9PlxyXG4vLyAgICAgICAgICAgICByZXNwb25zZS5qc29uKClcclxuLy8gICAgICAgICApO1xyXG4vLyAgICAgfSxcclxuLy8gICAgIC8vcG9zdHMgdG8gdGhlIGRhdGFiYXNlIC0gdGhlIGZ1bmN0aW9uIGFjY2VwdHMgYW4gb2JqZWN0IGFzIHRoZSBhcmd1bWVudFxyXG4vLyAgICAgUHV0OiBmdW5jdGlvbiAobmV3c0lELCBjb250YWN0KSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3cy8ke25ld3NJRH1gLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdClcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH0sXHJcbi8vICAgICAvL3Bvc3RzIHRvIHRoZSBkYXRhYmFzZSAtIHRoZSBmdW5jdGlvbiBhY2NlcHRzIGFuIG9iamVjdCBhcyB0aGUgYXJndW1lbnRcclxuLy8gICAgIFBvc3Q6IGZ1bmN0aW9uIChlbnRyeVRvUG9zdCkge1xyXG4vLyAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzXCIsIHtcclxuLy8gICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnlUb1Bvc3QpXHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9XHJcbi8vIH07XHJcbi8vZXhwb3J0cyB0aGUgY29udGFjdENvbGxlY3Rpb24gb2JqZWN0XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3c0FQSUJ1dGxlcjsiXX0=
