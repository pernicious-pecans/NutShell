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

      _newsAPIButler.default.delete(newsId) //re-populates the container with updated database information
      .then(_newsDisplay.default);
    } else if (event.target.id.startsWith("edit--")) {
      //create a refrence to the actual id of the contact you want to edit
      let newsId = event.target.id.split("--")[1];

      _newsAPIButler.default.getNews(newsId).then(response => {
        $("#name").value = response.name;
        $("#summary").value = response.synopsis;
        $("URL").value = response.url;
        $("#newsId").value = response.id;
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
        userId: 2,
        newsTitle: $("#name").value,
        synopsis: $("#summary").value,
        url: $("#URL").value,
        newsTimestamp: 2
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
  //deletes a contact from the database
  delete: newsID => {
    return fetch(`http://127.0.0.1:8088/news/${newsID}`, {
      method: "DELETE"
    });
  },
  getNews: newsID => {
    return fetch(`http://127.0.0.1:8088/news/${newsID}`).then(response => response.json());
  },
  //gets the contact array and parses the json
  getForUser: function (userId) {
    return fetch(`http://localhost:8088/news?userId=${userId}`).then(response => response.json());
  },
  //gets the contact array and parses the json
  get: function () {
    return fetch("http://localhost:8088/news").then(response => response.json());
  },
  //posts to the database - the function accepts an object as the argument
  Put: function (id, contact) {
    return fetch(`http://localhost:8088/news/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });
  },
  //posts to the database - the function accepts an object as the argument
  Post: function (entryToPost) {
    return fetch("http://localhost:8088/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryToPost)
    });
  }
}; //exports the contactCollection object

var _default = newsAPIButler;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1kaXNwbGF5LWZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1kaXNwbGF5LmpzIiwiLi4vc2NyaXB0cy9uZXdzL25ld3MtZWRpdC1kZWxldGUuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1wb3N0LW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0FQSUJ1dGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSx5QkFBWSxnQkFBWjs7QUFDQSx5QkFBWSxRQUFaOztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLFFBQXBCLEVBQThCLE1BQTlCLEtBQXlDO0FBQ3pELFNBQVE7bUJBQ08sT0FBUSxLQUFJLFFBQVM7YUFDM0IsUUFBUzs0QkFDTSxNQUFPOzhCQUNMLE1BQU87dUJBSmpDO0FBTUgsQ0FQRDs7ZUFTZSxXOzs7Ozs7Ozs7OztBQ1RmOzs7O0FBQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQ3pCLFNBQU8sS0FBSyxDQUFDLDRCQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsRUFFRixJQUZFLENBRUcsWUFBWSxJQUFJO0FBQ2xCLElBQUEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsSUFBSSxJQUFJO0FBQ3pCLFlBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUF0QjtBQUNBLFlBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFyQjtBQUNBLFlBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUF0QjtBQUNBLFlBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFwQjtBQUVBLFlBQU0sSUFBSSxHQUFHLGlDQUFZLE9BQVosRUFBcUIsUUFBckIsRUFBK0IsUUFBL0IsRUFBeUMsTUFBekMsQ0FBYjtBQUNBLE1BQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixTQUFuQixJQUFnQyxJQUFoQztBQUNILEtBUkQ7QUFTSCxHQVpFLENBQVA7QUFhSCxDQWREOztlQWVlLGM7Ozs7Ozs7Ozs7O0FDakJmOztBQUNBOzs7O0FBRkEsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFJQTtBQUNBLElBQUksY0FBYyxHQUFHLE1BQU07QUFDekIsTUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsZUFBRCxDQUF4QjtBQUNBLEVBQUEsZ0JBQWdCLENBQUMsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLE1BQU07QUFDL0M7QUFDQSxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixVQUFoQixDQUEyQixVQUEzQixDQUFKLEVBQTRDO0FBQzFDO0FBQ0EsVUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQWI7QUFDQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWixFQUgwQyxDQUkxQzs7QUFDQSw2QkFDRyxNQURILENBQ1UsTUFEVixFQUVFO0FBRkYsT0FHRyxJQUhILENBR1Esb0JBSFI7QUFJRCxLQVRELE1BU08sSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsVUFBaEIsQ0FBMkIsUUFBM0IsQ0FBSixFQUEwQztBQUMvQztBQUNBLFVBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFiOztBQUdBLDZCQUFjLE9BQWQsQ0FBc0IsTUFBdEIsRUFBOEIsSUFBOUIsQ0FBbUMsUUFBUSxJQUFJO0FBQzdDLFFBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLEtBQVgsR0FBbUIsUUFBUSxDQUFDLElBQTVCO0FBQ0EsUUFBQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsS0FBZCxHQUFzQixRQUFRLENBQUMsUUFBL0I7QUFDQSxRQUFBLENBQUMsQ0FBQyxLQUFELENBQUQsQ0FBUyxLQUFULEdBQWlCLFFBQVEsQ0FBQyxHQUExQjtBQUNBLFFBQUEsQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhLEtBQWIsR0FBcUIsUUFBUSxDQUFDLEVBQTlCO0FBQ0QsT0FMRDtBQVNEO0FBQ0YsR0ExQkQ7QUEyQkQsQ0E3QkQ7O2VBOEJlLGM7Ozs7Ozs7Ozs7O0FDbENmOzs7O0FBREEsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUVBLE1BQU0sV0FBVyxHQUFHO0FBQ2hCLEVBQUEsUUFBUSxFQUFHLE1BQU07QUFDYixJQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLGdCQUFyQyxDQUFzRCxPQUF0RCxFQUErRCxNQUFNO0FBRXpFLFlBQU0sU0FBUyxHQUFHO0FBQ04sUUFBQSxNQUFNLEVBQUUsQ0FERjtBQUVOLFFBQUEsU0FBUyxFQUFFLENBQUMsQ0FBQyxPQUFELENBQUQsQ0FBVyxLQUZoQjtBQUdOLFFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUhsQjtBQUlOLFFBQUEsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxLQUpUO0FBS04sUUFBQSxhQUFhLEVBQUU7QUFMVCxPQUFsQjtBQVFRLE1BQUEsS0FBSyxDQUFDLDRCQUFELEVBQStCO0FBQ2hDLFFBQUEsTUFBTSxFQUFFLE1BRHdCO0FBRWhDLFFBQUEsT0FBTyxFQUFFO0FBQ0wsMEJBQWdCO0FBRFgsU0FGdUI7QUFLaEMsUUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxTQUFmO0FBTDBCLE9BQS9CLENBQUwsQ0FWaUUsQ0FpQmpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVKO0FBQWtCLEtBekJsQjtBQTBCSCxHQTVCZTtBQTZCaEIsRUFBQSxnQkFBZ0IsRUFBRyxNQUFNO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBbUQ7Ozs7Ozs7O1NBQW5EO0FBU0g7QUF2Q2UsQ0FBcEI7ZUErQ2UsVzs7Ozs7Ozs7OztBQ2pEZjtBQUNBLE1BQU0sYUFBYSxHQUFHO0FBQ2xCO0FBQ0EsRUFBQSxNQUFNLEVBQUUsTUFBTSxJQUFJO0FBQ2QsV0FBTyxLQUFLLENBQUUsOEJBQTZCLE1BQU8sRUFBdEMsRUFBeUM7QUFDakQsTUFBQSxNQUFNLEVBQUU7QUFEeUMsS0FBekMsQ0FBWjtBQUdILEdBTmlCO0FBT2xCLEVBQUEsT0FBTyxFQUFFLE1BQU0sSUFBSTtBQUNmLFdBQU8sS0FBSyxDQUFFLDhCQUE2QixNQUFPLEVBQXRDLENBQUwsQ0FBOEMsSUFBOUMsQ0FBbUQsUUFBUSxJQUM5RCxRQUFRLENBQUMsSUFBVCxFQURHLENBQVA7QUFHSCxHQVhpQjtBQWFsQjtBQUNBLEVBQUEsVUFBVSxFQUFFLFVBQVUsTUFBVixFQUFrQjtBQUMxQixXQUFPLEtBQUssQ0FBRSxxQ0FBb0MsTUFBTyxFQUE3QyxDQUFMLENBQXFELElBQXJELENBQTBELFFBQVEsSUFDckUsUUFBUSxDQUFDLElBQVQsRUFERyxDQUFQO0FBR0gsR0FsQmlCO0FBbUJsQjtBQUNBLEVBQUEsR0FBRyxFQUFFLFlBQVk7QUFDYixXQUFPLEtBQUssQ0FBQyw0QkFBRCxDQUFMLENBQW9DLElBQXBDLENBQXlDLFFBQVEsSUFDcEQsUUFBUSxDQUFDLElBQVQsRUFERyxDQUFQO0FBR0gsR0F4QmlCO0FBeUJsQjtBQUNBLEVBQUEsR0FBRyxFQUFFLFVBQVUsRUFBVixFQUFjLE9BQWQsRUFBdUI7QUFDeEIsV0FBTyxLQUFLLENBQUUsOEJBQTZCLEVBQUcsRUFBbEMsRUFBcUM7QUFDN0MsTUFBQSxNQUFNLEVBQUUsS0FEcUM7QUFFN0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZvQztBQUs3QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWY7QUFMdUMsS0FBckMsQ0FBWjtBQU9ILEdBbENpQjtBQW1DbEI7QUFDQSxFQUFBLElBQUksRUFBRSxVQUFVLFdBQVYsRUFBdUI7QUFDekIsV0FBTyxLQUFLLENBQUMsNEJBQUQsRUFBK0I7QUFDdkMsTUFBQSxNQUFNLEVBQUUsTUFEK0I7QUFFdkMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUY4QjtBQUt2QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFdBQWY7QUFMaUMsS0FBL0IsQ0FBWjtBQU9IO0FBNUNpQixDQUF0QixDLENBOENBOztlQUNlLGEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbmV3c0dldEFuZFNob3cgZnJvbSBcIi4vbmV3cy9uZXdzLWRpc3BsYXlcIlxyXG5pbXBvcnQgTmV3c01hbmFnZXIgZnJvbSBcIi4vbmV3cy9uZXdzLXBvc3QtbWFuYWdlclwiXHJcbmltcG9ydCBuZXdzSXRlbUNoYW5nZSBmcm9tIFwiLi9uZXdzL25ld3MtZWRpdC1kZWxldGVcIlxyXG5cclxuTmV3c01hbmFnZXIuZ2VuZXJhdGVOZXdzRm9ybSgpXHJcbk5ld3NNYW5hZ2VyLnBvc3ROZXdzKClcclxubmV3c0dldEFuZFNob3coKVxyXG5uZXdzSXRlbUNoYW5nZSgpIiwiY29uc3QgbmV3c0ZhY3RvcnkgPSAobmV3c1VSTCwgbmV3c05hbWUsIG5ld3NTdW1tLCBuZXdzSWQpID0+IHtcclxuICAgIHJldHVybiBgPHNlY3Rpb24+XHJcbiAgICA8aDI+PGEgaHJlZj1cIiR7bmV3c1VSTH1cIj4ke25ld3NOYW1lfTwvYT48L2gyPlxyXG4gICAgICAgIDxwPiR7bmV3c1N1bW19PC9wPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJlZGl0LS0ke25ld3NJZH1cIj5lZGl0PC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS0tJHtuZXdzSWR9XCI+ZGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ld3NGYWN0b3J5IiwiaW1wb3J0IG5ld3NGYWN0b3J5IGZyb20gXCIuL25ld3MtZGlzcGxheS1mYWN0b3J5XCJcclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IG5ld3NHZXRBbmRTaG93ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4obXlQYXJzZWROZXdzID0+IHtcclxuICAgICAgICAgICAgbXlQYXJzZWROZXdzLmZvckVhY2gobmV3cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdzTmFtZSA9IG5ld3MubmV3c1RpdGxlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdzVXJsID0gbmV3cy51cmxcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld3NTdW1tID0gbmV3cy5zeW5vcHNpc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3c0lkID0gbmV3cy5pZFxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBuZXdzRmFjdG9yeShuZXdzVXJsLCBuZXdzTmFtZSwgbmV3c1N1bW0sIG5ld3NJZClcclxuICAgICAgICAgICAgICAgICQoXCIjbmV3c19kaXNwbGF5XCIpLmlubmVySFRNTCArPSBodG1sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBuZXdzR2V0QW5kU2hvdyIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcbmltcG9ydCBuZXdzQVBJQnV0bGVyIGZyb20gXCIuL25ld3NBUElCdXRsZXJcIjtcclxuaW1wb3J0IG5ld3NHZXRBbmRTaG93IGZyb20gXCIuL25ld3MtZGlzcGxheVwiO1xyXG5cclxuLy9hZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBlbnRpcmUgbmV3c19kaXNwbGF5IGNvbnRhaW5lclxyXG5sZXQgbmV3c0l0ZW1DaGFuZ2UgPSAoKSA9PiB7XHJcbiAgbGV0IGNvbnRhY3REaXNwbGF5RWwgPSAkKFwiI25ld3NfZGlzcGxheVwiKTtcclxuICBjb250YWN0RGlzcGxheUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAvL2lmIHRoZSBpZCBvZiB0aGUgZXZlbnQgdGFyZ2V0IHN0YXJ0cyB3aXRoIFwiZGVsdGUgYnV0dG9uXCJcclxuICAgIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcImRlbGV0ZS0tXCIpKSB7XHJcbiAgICAgIC8vY3JlYXRlIGEgcmVmcmVuY2UgdG8gdGhlIGFjdHVhbCBpZCBvZiB0aGUgY29udGFjdCB5b3Ugd2FudCB0byBkZWx0ZVxyXG4gICAgICBsZXQgbmV3c0lkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld3NJZClcclxuICAgICAgLy9jYWxscyB0aGUgbWV0aG9kIG9mIGRlbGV0ZSBvbiBuZXdzQVBJQnV0bGVyIHdpdGggdGhlIElEIHJlZnJlbmNlIGFzIGFuIGFyZ3VtZW50XHJcbiAgICAgIG5ld3NBUElCdXRsZXJcclxuICAgICAgICAuZGVsZXRlKG5ld3NJZClcclxuICAgICAgICAvL3JlLXBvcHVsYXRlcyB0aGUgY29udGFpbmVyIHdpdGggdXBkYXRlZCBkYXRhYmFzZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIC50aGVuKG5ld3NHZXRBbmRTaG93KTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJlZGl0LS1cIikpIHtcclxuICAgICAgLy9jcmVhdGUgYSByZWZyZW5jZSB0byB0aGUgYWN0dWFsIGlkIG9mIHRoZSBjb250YWN0IHlvdSB3YW50IHRvIGVkaXRcclxuICAgICAgbGV0IG5ld3NJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xyXG5cclxuXHJcbiAgICAgIG5ld3NBUElCdXRsZXIuZ2V0TmV3cyhuZXdzSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICQoXCIjbmFtZVwiKS52YWx1ZSA9IHJlc3BvbnNlLm5hbWU7XHJcbiAgICAgICAgJChcIiNzdW1tYXJ5XCIpLnZhbHVlID0gcmVzcG9uc2Uuc3lub3BzaXM7XHJcbiAgICAgICAgJChcIlVSTFwiKS52YWx1ZSA9IHJlc3BvbnNlLnVybDtcclxuICAgICAgICAkKFwiI25ld3NJZFwiKS52YWx1ZSA9IHJlc3BvbnNlLmlkO1xyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuICB9KTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgbmV3c0l0ZW1DaGFuZ2U7IiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuaW1wb3J0IG5ld3NHZXRBbmRTaG93IGZyb20gXCIuL25ld3MtZGlzcGxheVwiXHJcbmNvbnN0IE5ld3NNYW5hZ2VyID0ge1xyXG4gICAgcG9zdE5ld3MgOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjbmV3c1Bvc3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBuZXdzVG9BZGQgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IDIsXHJcbiAgICAgICAgICAgICAgICBuZXdzVGl0bGU6ICQoXCIjbmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHN5bm9wc2lzOiAkKFwiI3N1bW1hcnlcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICQoXCIjVVJMXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbmV3c1RpbWVzdGFtcDogMlxyXG4gICAgfVxyXG5cclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3c1wiLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3c1RvQWRkKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgICAgICAgICAvLyAvLyBCZWNhdXNlIGpzb24tc2VydmVyIHNlbmRzIHVzIHRoZSBuZXcgdGhpbmcgaW4gcmVzcG9uc2VcclxuICAgICAgICAgICAgLy8gLnRoZW4oKG5ld1VzZXJPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIFNob3cgY29udGFjdCBlbnRyeSBmb3JtXHJcbiAgICAgICAgICAgIC8vICAgICBnZW5lcmF0ZUNvbnRhY3RGb3JtKG5ld1VzZXJPYmplY3QuaWQpXHJcbiAgICAgICAgICAgIC8vICAgICBjb250YWN0Rm9ybSgpXHJcbiAgICAgICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIG5ld3NHZXRBbmRTaG93KCkgfSlcclxuICAgIH0sXHJcbiAgICBnZW5lcmF0ZU5ld3NGb3JtIDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3c19pbnB1dFwiKS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIk5hbWVcIj5OYW1lOiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJuYW1lXCI+U3VtbWFyeTogPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJzdW1tYXJ5XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInN1bW1hcnlcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPlVSTDogPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJVUkxcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCIjbmV3c1Bvc3RcIj5TYXZlIEFydGljbGU8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV3c01hbmFnZXIiLCIvL2NyZWF0ZXMgYW4gb2JqZWN0IHdpdGggVFdPIGtleXMsIGVhY2ggaXMgYSBtZXRob2RcclxuY29uc3QgbmV3c0FQSUJ1dGxlciA9IHtcclxuICAgIC8vZGVsZXRlcyBhIGNvbnRhY3QgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgIGRlbGV0ZTogbmV3c0lEID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9uZXdzLyR7bmV3c0lEfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TmV3czogbmV3c0lEID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9uZXdzLyR7bmV3c0lEfWApLnRoZW4ocmVzcG9uc2UgPT5cclxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9nZXRzIHRoZSBjb250YWN0IGFycmF5IGFuZCBwYXJzZXMgdGhlIGpzb25cclxuICAgIGdldEZvclVzZXI6IGZ1bmN0aW9uICh1c2VySWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzP3VzZXJJZD0ke3VzZXJJZH1gKS50aGVuKHJlc3BvbnNlID0+XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLy9nZXRzIHRoZSBjb250YWN0IGFycmF5IGFuZCBwYXJzZXMgdGhlIGpzb25cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzXCIpLnRoZW4ocmVzcG9uc2UgPT5cclxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL3Bvc3RzIHRvIHRoZSBkYXRhYmFzZSAtIHRoZSBmdW5jdGlvbiBhY2NlcHRzIGFuIG9iamVjdCBhcyB0aGUgYXJndW1lbnRcclxuICAgIFB1dDogZnVuY3Rpb24gKGlkLCBjb250YWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3cy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vcG9zdHMgdG8gdGhlIGRhdGFiYXNlIC0gdGhlIGZ1bmN0aW9uIGFjY2VwdHMgYW4gb2JqZWN0IGFzIHRoZSBhcmd1bWVudFxyXG4gICAgUG9zdDogZnVuY3Rpb24gKGVudHJ5VG9Qb3N0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3NcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeVRvUG9zdClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuLy9leHBvcnRzIHRoZSBjb250YWN0Q29sbGVjdGlvbiBvYmplY3RcclxuZXhwb3J0IGRlZmF1bHQgbmV3c0FQSUJ1dGxlcjsiXX0=
