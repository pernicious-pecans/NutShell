(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _newsPrintToDom = _interopRequireDefault(require("./news/newsPrintToDom"));

var _newsPostManager = _interopRequireDefault(require("./news/news-post-manager"));

var _newsEventListeners = _interopRequireDefault(require("./news/newsEventListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_newsPostManager.default.generateNewsForm();

_newsPostManager.default.postNews();

(0, _newsPrintToDom.default)();
_newsEventListeners.default;

},{"./news/news-post-manager":2,"./news/newsEventListeners":4,"./news/newsPrintToDom":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsPrintToDom = _interopRequireDefault(require("./newsPrintToDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const NewsManager = {
  postNews: () => {
    document.getElementById("#newsPostButton").addEventListener("click", () => {
      const newsToAdd = {
        // userId: 2,
        newsTitle: $("#newsName").value,
        synopsis: $("#newsSummary").value,
        url: $("#newsUrl").value,
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

      (0, _newsPrintToDom.default)();
    });
  },
  generateNewsForm: () => {
    document.querySelector("#news_input").innerHTML = `
        <input type="hidden" id=newsHiddenInput value="">
        <label for="Name">Name: </label>
        <input id="newsName" type="text">
        <label for="name">Summary: </label>
        <input id="newsSummary" type="text" placeholder="summary">
        <label for="newsUrl">URL: </label>
        <input id="newsUrl" type="text">
        <button id="#newsPostButton">Save Article</button>
        `;
  }
};
var _default = NewsManager;
exports.default = _default;

},{"./newsPrintToDom":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const apiButlerNews = {
  getNews: userId => {
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
  }
};
var _default = apiButlerNews;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsAPI = _interopRequireDefault(require("./newsAPI"));

var _newsForm = _interopRequireDefault(require("./newsForm"));

var _newsPrintToDom = _interopRequireDefault(require("./newsPrintToDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newsEventListeners = {
  newsContainer() {
    //edit single news
    $("#news_display").addEventListener("click", e => {
      // const activeUserId = sessionStorage.getItem("activeUser")
      const buttonId = e.target.id;

      if (buttonId.includes("editNews--")) {
        //open new news form and prefill it with card data
        document.querySelector("#news_display").innerHTML = _newsForm.default.formEntrySlots;
        const newsId = buttonId.split("--")[1];
        $("#newsHiddenInput").value = parseInt(newsId); //change post button text to save

        $("#newsPostButton").textContent = "Save";
        $("#newsInputContainer").classList.add("newsEdit"); //grab that object from API and prefill form

        _newsAPI.default.getOnenews(parseInt(newsId)).then(news => {
          $("#newsName").value = news.title;
          $("#newsSynopsisInput").value = news.summary;
          $("#newsURLInput").value = news.url;
        }); //remove card from database

      } else if (event.target.id.startsWith("deleteNews--")) {
        //create a refrence to the actual id of the contact you want to delte
        let newsId = event.target.id.split("--")[1];
        console.log(newsId); //calls the method of delete on apiButlerNews with the ID refrence as an argument

        _newsAPI.default.deleteNews(newsId).then((0, _newsPrintToDom.default)());
      }
    });
  }

};
var _default = newsEventListeners;
exports.default = _default;

},{"./newsAPI":3,"./newsForm":5,"./newsPrintToDom":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const newsForm = {
  formEntrySlots: `
    
    <input type="hidden" id=newsHiddenInput value="">
    <label for="Name">Name: </label>
    <input id="newsName" type="text">
    <label for="name">Summary: </label>
    <input id="newsSummary" type="text" placeholder="summary">
    <label for="newsUrl">URL: </label>
    <input id="newsUrl" type="text">
    <button id="#newsPostButton">Save Article</button>`
};
var _default = newsForm;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsFactory = (newsURL, newsName, newsSumm, newsId) => {
  return `<section>
    <h2><a href="${newsURL}">${newsName}</a></h2>
        <p>${newsSumm}</p>
        <button id="editNews--${newsId}">edit</button>
        <button id="deleteNews--${newsId}">delete</button>
            </section>`;
};

var _default = newsFactory;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newsHTML = _interopRequireDefault(require("./newsHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);

const newsGetAndShow = () => {
  return fetch("http://localhost:8088/news").then(response => response.json()).then(myParsedNews => {
    myParsedNews.forEach(news => {
      const newsName = news.newsTitle;
      const newsUrl = news.url;
      const newsSumm = news.synopsis;
      const newsId = news.id;
      const html = (0, _newsHTML.default)(newsUrl, newsName, newsSumm, newsId);
      $("#news_display").innerHTML += html;
    });
  });
};

var _default = newsGetAndShow;
exports.default = _default;

},{"./newsHTML":6}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3cy1wb3N0LW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0FQSS5qcyIsIi4uL3NjcmlwdHMvbmV3cy9uZXdzRXZlbnRMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0Zvcm0uanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c0hUTUwuanMiLCIuLi9zY3JpcHRzL25ld3MvbmV3c1ByaW50VG9Eb20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOzs7O0FBRUEseUJBQVksZ0JBQVo7O0FBQ0EseUJBQVksUUFBWjs7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTkE7Ozs7QUFEQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBR0EsTUFBTSxXQUFXLEdBQUc7QUFDaEIsRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxNQUFNO0FBRXZFLFlBQU0sU0FBUyxHQUFHO0FBQ2Q7QUFDQSxRQUFBLFNBQVMsRUFBRSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUsS0FGWjtBQUdkLFFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsS0FIZDtBQUlkLFFBQUEsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUpMO0FBS2QsUUFBQSxhQUFhLEVBQUcsR0FBRSxJQUFJLElBQUosQ0FBUyxJQUFULEVBQWUsQ0FBZixDQUFrQixFQUx0QjtBQU1kLFFBQUEsSUFBSSxFQUFFO0FBQ0YsVUFBQSxNQUFNLEVBQUU7QUFETjtBQU5RLE9BQWxCO0FBVUEsTUFBQSxLQUFL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QztBQU1ILENBUEQ7O2VBUWUsVzs7Ozs7Ozs7Ozs7QUNSZjs7OztBQUNBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7O0FBRUEsTUFBTSxjQUFjLEdBQUcsTUFBTTtBQUN6QixTQUFPLEtBQUssQ0FBQyw0QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLEVBRUYsSUFGRSxDQUVHLFlBQVksSUFBSTtBQUNsQixJQUFBLFlBQVksQ0FBQyxPQUFiLENBQXFCLElBQUksSUFBSTtBQUN6QixZQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBdEI7QUFDQSxZQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBckI7QUFDQSxZQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBdEI7QUFDQSxZQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBcEI7QUFFQSxZQUFNLElBQUksR0FBRyx1QkFBWSxPQUFaLEVBQXFCLFFBQXJCLEVBQStCLFFBQS9CLEVBQXlDLE1BQXpDLENBQWI7QUFDQSxNQUFBLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUIsU0FBbkIsSUFBZ0MsSUFBaEM7QUFDSCxLQVJEO0FBU0gsR0FaRSxDQUFQO0FBYUgsQ0FkRDs7ZUFlZSxjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG5ld3NHZXRBbmRTaG93IGZyb20gXCIuL25ld3MvbmV3c1ByaW50VG9Eb21cIlxyXG5pbXBvcnQgTmV3c01hbmFnZXIgZnJvbSBcIi4vbmV3cy9uZXdzLXBvc3QtbWFuYWdlclwiXHJcbmltcG9ydCBuZXdzRXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbmV3cy9uZXdzRXZlbnRMaXN0ZW5lcnNcIlxyXG5cclxuTmV3c01hbmFnZXIuZ2VuZXJhdGVOZXdzRm9ybSgpXHJcbk5ld3NNYW5hZ2VyLnBvc3ROZXdzKClcclxubmV3c0dldEFuZFNob3coKVxyXG5uZXdzRXZlbnRMaXN0ZW5lcnMiLCJjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5pbXBvcnQgbmV3c0dldEFuZFNob3cgZnJvbSBcIi4vbmV3c1ByaW50VG9Eb21cIlxyXG5cclxuY29uc3QgTmV3c01hbmFnZXIgPSB7XHJcbiAgICBwb3N0TmV3czogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI25ld3NQb3N0QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdzVG9BZGQgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1c2VySWQ6IDIsXHJcbiAgICAgICAgICAgICAgICBuZXdzVGl0bGU6ICQoXCIjbmV3c05hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBzeW5vcHNpczogJChcIiNuZXdzU3VtbWFyeVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHVybDogJChcIiNuZXdzVXJsXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbmV3c1RpbWVzdGFtcDogYCR7bmV3IERhdGUoMjAxOSwgMil9YCxcclxuICAgICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzXCIsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdzVG9BZGQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICAgICAgICAgIC8vIC8vIEJlY2F1c2UganNvbi1zZXJ2ZXIgc2VuZHMgdXMgdGhlIG5ldyB0aGluZyBpbiByZXNwb25zZVxyXG4gICAgICAgICAgICAvLyAudGhlbigobmV3VXNlck9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gU2hvdyBjb250YWN0IGVudHJ5IGZvcm1cclxuICAgICAgICAgICAgLy8gICAgIGdlbmVyYXRlQ29udGFjdEZvcm0obmV3VXNlck9iamVjdC5pZClcclxuICAgICAgICAgICAgLy8gICAgIGNvbnRhY3RGb3JtKClcclxuICAgICAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgICAgIG5ld3NHZXRBbmRTaG93KClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlTmV3c0Zvcm06ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld3NfaW5wdXRcIikuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9bmV3c0hpZGRlbklucHV0IHZhbHVlPVwiXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cIk5hbWVcIj5OYW1lOiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cIm5ld3NOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPlN1bW1hcnk6IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGlkPVwibmV3c1N1bW1hcnlcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwic3VtbWFyeVwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJuZXdzVXJsXCI+VVJMOiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBpZD1cIm5ld3NVcmxcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCIjbmV3c1Bvc3RCdXR0b25cIj5TYXZlIEFydGljbGU8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV3c01hbmFnZXIiLCJcclxuY29uc3QgYXBpQnV0bGVyTmV3cyA9IHtcclxuICAgIGdldE5ld3M6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzP19leHBhbmQ9dXNlciZ1c2VySWQ9JHt1c2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZ2V0T25lQXJ0aWNsZTogKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbmV3cy8ke2lkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHBvc3ROZXdzOiAodXNlcklkLCBvYmopID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzP19leHBhbmQ9dXNlciZ1c2VySWQ9JHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0TmV3czogKGlkLCBvYmopID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZU5ld3M6IChpZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L25ld3MvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaUJ1dGxlck5ld3MiLCJpbXBvcnQgYXBpQnV0bGVyTmV3cyBmcm9tIFwiLi9uZXdzQVBJXCI7XHJcbmltcG9ydCBuZXdzRm9ybSBmcm9tIFwiLi9uZXdzRm9ybVwiO1xyXG5pbXBvcnQgbmV3c0dldEFuZFNob3cgZnJvbSBcIi4vbmV3c1ByaW50VG9Eb21cIjtcclxuXHJcbmNvbnN0IG5ld3NFdmVudExpc3RlbmVycyA9IHtcclxuICAgIG5ld3NDb250YWluZXIoKSB7XHJcbiAgICAgICAgLy9lZGl0IHNpbmdsZSBuZXdzXHJcbiAgICAgICAgJChcIiNuZXdzX2Rpc3BsYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IGFjdGl2ZVVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVVc2VyXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbklkID0gZS50YXJnZXQuaWRcclxuICAgICAgICAgICAgaWYgKGJ1dHRvbklkLmluY2x1ZGVzKFwiZWRpdE5ld3MtLVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy9vcGVuIG5ldyBuZXdzIGZvcm0gYW5kIHByZWZpbGwgaXQgd2l0aCBjYXJkIGRhdGFcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3c19kaXNwbGF5XCIpLmlubmVySFRNTCA9IG5ld3NGb3JtLmZvcm1FbnRyeVNsb3RzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdzSWQgPSBidXR0b25JZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAkKFwiI25ld3NIaWRkZW5JbnB1dFwiKS52YWx1ZSA9IHBhcnNlSW50KG5ld3NJZClcclxuICAgICAgICAgICAgICAgIC8vY2hhbmdlIHBvc3QgYnV0dG9uIHRleHQgdG8gc2F2ZVxyXG4gICAgICAgICAgICAgICAgJChcIiNuZXdzUG9zdEJ1dHRvblwiKS50ZXh0Q29udGVudCA9IFwiU2F2ZVwiXHJcbiAgICAgICAgICAgICAgICAkKFwiI25ld3NJbnB1dENvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwibmV3c0VkaXRcIilcclxuICAgICAgICAgICAgICAgIC8vZ3JhYiB0aGF0IG9iamVjdCBmcm9tIEFQSSBhbmQgcHJlZmlsbCBmb3JtXHJcbiAgICAgICAgICAgICAgICBhcGlCdXRsZXJOZXdzLmdldE9uZW5ld3MocGFyc2VJbnQobmV3c0lkKSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigobmV3cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI25ld3NOYW1lXCIpLnZhbHVlID0gbmV3cy50aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI25ld3NTeW5vcHNpc0lucHV0XCIpLnZhbHVlID0gbmV3cy5zdW1tYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbmV3c1VSTElucHV0XCIpLnZhbHVlID0gbmV3cy51cmxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgY2FyZCBmcm9tIGRhdGFiYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJkZWxldGVOZXdzLS1cIikpIHtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGEgcmVmcmVuY2UgdG8gdGhlIGFjdHVhbCBpZCBvZiB0aGUgY29udGFjdCB5b3Ugd2FudCB0byBkZWx0ZVxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld3NJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdzSWQpXHJcbiAgICAgICAgICAgICAgICAvL2NhbGxzIHRoZSBtZXRob2Qgb2YgZGVsZXRlIG9uIGFwaUJ1dGxlck5ld3Mgd2l0aCB0aGUgSUQgcmVmcmVuY2UgYXMgYW4gYXJndW1lbnRcclxuICAgICAgICAgICAgICAgIGFwaUJ1dGxlck5ld3MuZGVsZXRlTmV3cyhuZXdzSWQpLnRoZW4obmV3c0dldEFuZFNob3coKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3c0V2ZW50TGlzdGVuZXJzIiwiXHJcbmNvbnN0IG5ld3NGb3JtID0ge1xyXG4gICAgZm9ybUVudHJ5U2xvdHM6IGBcclxuICAgIFxyXG4gICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1uZXdzSGlkZGVuSW5wdXQgdmFsdWU9XCJcIj5cclxuICAgIDxsYWJlbCBmb3I9XCJOYW1lXCI+TmFtZTogPC9sYWJlbD5cclxuICAgIDxpbnB1dCBpZD1cIm5ld3NOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgIDxsYWJlbCBmb3I9XCJuYW1lXCI+U3VtbWFyeTogPC9sYWJlbD5cclxuICAgIDxpbnB1dCBpZD1cIm5ld3NTdW1tYXJ5XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInN1bW1hcnlcIj5cclxuICAgIDxsYWJlbCBmb3I9XCJuZXdzVXJsXCI+VVJMOiA8L2xhYmVsPlxyXG4gICAgPGlucHV0IGlkPVwibmV3c1VybFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICA8YnV0dG9uIGlkPVwiI25ld3NQb3N0QnV0dG9uXCI+U2F2ZSBBcnRpY2xlPC9idXR0b24+YFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5ld3NGb3JtIiwiY29uc3QgbmV3c0ZhY3RvcnkgPSAobmV3c1VSTCwgbmV3c05hbWUsIG5ld3NTdW1tLCBuZXdzSWQpID0+IHtcclxuICAgIHJldHVybiBgPHNlY3Rpb24+XHJcbiAgICA8aDI+PGEgaHJlZj1cIiR7bmV3c1VSTH1cIj4ke25ld3NOYW1lfTwvYT48L2gyPlxyXG4gICAgICAgIDxwPiR7bmV3c1N1bW19PC9wPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJlZGl0TmV3cy0tJHtuZXdzSWR9XCI+ZWRpdDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJkZWxldGVOZXdzLS0ke25ld3NJZH1cIj5kZWxldGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBuZXdzRmFjdG9yeSIsImltcG9ydCBuZXdzRmFjdG9yeSBmcm9tIFwiLi9uZXdzSFRNTFwiXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBuZXdzR2V0QW5kU2hvdyA9ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9uZXdzXCIpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKG15UGFyc2VkTmV3cyA9PiB7XHJcbiAgICAgICAgICAgIG15UGFyc2VkTmV3cy5mb3JFYWNoKG5ld3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3c05hbWUgPSBuZXdzLm5ld3NUaXRsZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3c1VybCA9IG5ld3MudXJsXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdzU3VtbSA9IG5ld3Muc3lub3BzaXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld3NJZCA9IG5ld3MuaWRcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gbmV3c0ZhY3RvcnkobmV3c1VybCwgbmV3c05hbWUsIG5ld3NTdW1tLCBuZXdzSWQpXHJcbiAgICAgICAgICAgICAgICAkKFwiI25ld3NfZGlzcGxheVwiKS5pbm5lckhUTUwgKz0gaHRtbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3c0dldEFuZFNob3ciXX0=
