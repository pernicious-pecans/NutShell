(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

var _eventListener = _interopRequireDefault(require("./eventListener"));

var _eventList = _interopRequireDefault(require("./eventList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const listArea = $("#events_display");

const eventAction = () => {
  {
    /* <article id="events_input"> </article>
       <article id="events_display"> </article> */
  }
  listArea.addEventListener("click", () => {
    if (event.target.id.startsWith("Edit")) {
      let theId = parseInt(event.target.id.split("--")[1]);

      _evtDataMgr.default.getEvent(theId).then(event => {
        $("#eventId").value = event.id, // $("#userId").value = event.userId,
        $("#eventDate").value = event.eventDate, $("#eventLocation").value = event.eventLocation, $("#eventName").value = event.eventName, $("#eventFormAction").textContent = "Update Event";
      }).then(() => (0, _eventListener.default)()).then(() => _eventList.default);
    } else if (event.target.id.startsWith("Delete")) {
      console.log("in the delete button");
      let id = parseInt(event.target.id.split("--")[1]);

      _evtDataMgr.default.deleteEvent(id).then(() => $("#events_display").innerHTML = "").then(() => _eventList.default.list());
    }
  });
};

var _default = eventAction;
exports.default = _default;

},{"./eventList":5,"./eventListener":6,"./evtDataMgr":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const $ = document.querySelector.bind(document);

const clearEventForm = () => {
  $("#eventName").value = "", $("#userId").value = "", $("#eventId").value = "", $("#eventLocation").value = "", $("#eventDate").value = "";
};

var _default = clearEventForm;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const eventCard = event => {
  return `
    <section>
   <h2>${event.eventName}</h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>
    <button class="event-card--button" id='Edit--${event.id}'>Edit ${event.eventName} Event </button>
    <br>
    <button class="event-card--button" id='Delete--${event.id}'>Delete ${event.eventName} Event</button>
    </section>
    `;
};

var _default = eventCard;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const $ = document.querySelector.bind(document);
/*
1. Name of event
2. Date of event
3. Location of event

**Given** a user has entered in all details of an event
**When** the user performs a gesture to save the event
**Then** the event should be displayed in the application in the `Events` component
*/

const formHTML = () => {
  return `
        <section>
                <input id="eventId" name="eventId" ></input>
                <input id="userId" name="userId"></input>

            <fieldset>
                <label class="label" for="eventName"> Name of Event </label>
                <input id="eventName" type="text"></input>
            </fieldset>

            <fieldset>
                <label class="label" for="eventDate"> Date of Event </label>
                <input id="eventDate" type="text"></input>
            </fieldset>

            <fieldset>
                <label class="label" for="eventLocation"> Location of Event </label>
                <input id="eventLocation" type="text"></input>
            </fieldset>

            <button id="eventFormAction">Save Event</button>
            </section>
        `;
};

var _default = formHTML;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

var _eventCard = _interopRequireDefault(require("./eventCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const spot = $("#events_display"); //list all events

const eventList = {
  list: () => {
    _evtDataMgr.default.fetchEvents().then(parsedEvents => {
      spot.innerHTML = "";
      parsedEvents.forEach(event => {
        spot.innerHTML += (0, _eventCard.default)(event);
      });
    });
  }
};
var _default = eventList; //then change the list to show only those items related to the user id that is in session

exports.default = _default;

},{"./eventCard":3,"./evtDataMgr":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

var _eventList = _interopRequireDefault(require("./eventList"));

var _emptyEventFields = _interopRequireDefault(require("./emptyEventFields"));

var _cardEventListener = _interopRequireDefault(require("./cardEventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);

const saveEvent = () => {
  const theButton = $("#eventFormAction");
  theButton.addEventListener("click", () => {
    const newEvent = {
      // userId: $("#userId").value,
      eventName: $("#eventName").value,
      eventDate: $("#eventDate").value,
      eventLocation: $("#eventLocation").value
    };

    if (theButton.textContent.startsWith("Save")) {
      console.log("new event:", newEvent);

      _evtDataMgr.default.saveEvent(newEvent).then(() => _eventList.default.list()).then(() => (0, _emptyEventFields.default)());
    } else if (theButton.textContent.startsWith("Update")) {
      const id = $("#eventId").value;

      _evtDataMgr.default.editEvent(parseInt(id), newEvent).then(() => _eventList.default.list()).then(() => (0, _emptyEventFields.default)()).then(() => {
        document.querySelector("#eventFormAction").textContent = "Save Event";
      });
    }
  });
};

var _default = saveEvent;
exports.default = _default;

},{"./cardEventListener":1,"./emptyEventFields":2,"./eventList":5,"./evtDataMgr":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const $ = document.querySelector.bind(document);
const eventDataManager = {
  fetchEvents: () => {
    return fetch("http://localhost:8088/events").then(Response => Response.json());
  },
  deleteEvent: eventId => {
    console.log(`http://localhost:8088/events/${eventId}`);
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "DELETE"
    }).then(Response => Response.json());
  },
  getEvent: eventId => {
    return fetch(`http://localhost:8088/events/${eventId}`).then(events => events.json());
  },
  editEvent: (eventId, event) => {
    console.log("event", event);
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }).then(event => event.json());
  },
  saveEvent: newEvent => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    }).then(event => event.json());
  }
};
var _default = eventDataManager;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

var _evtDataMgr = _interopRequireDefault(require("./events/evtDataMgr"));

var _eventList = _interopRequireDefault(require("./events/eventList"));

var _eventCard = _interopRequireDefault(require("./events/eventCard"));

var _eventHTMLforForm = _interopRequireDefault(require("./events/eventHTMLforForm"));

var _eventListener = _interopRequireDefault(require("./events/eventListener"));

var _cardEventListener = _interopRequireDefault(require("./events/cardEventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const post = $("#events_input");

_eventList.default.list();

post.innerHTML += (0, _eventHTMLforForm.default)(); // eventAction

(0, _eventListener.default)();
(0, _cardEventListener.default)();

},{"./events/cardEventListener":1,"./events/eventCard":3,"./events/eventHTMLforForm":4,"./events/eventList":5,"./events/eventListener":6,"./events/evtDataMgr":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jYXJkRXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VtcHR5RXZlbnRGaWVsZHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudENhcmQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2dERhdGFNZ3IuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGlCQUFELENBQWxCOztBQUVBLE1BQU0sV0FBVyxHQUFHLE1BQU07QUFFMUI7QUFBQzs7QUFDK0M7QUFDNUMsRUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBTTtBQUdyQyxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixVQUFoQixDQUEyQixNQUEzQixDQUFKLEVBQXdDO0FBSXBDLFVBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBRCxDQUFwQjs7QUFFQSwwQkFBaUIsUUFBakIsQ0FBMEIsS0FBMUIsRUFBaUMsSUFBakMsQ0FDSyxLQUFELElBQVc7QUFDRixRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUFkLEdBQXNCLEtBQUssQ0FBQyxFQUE1QixFQUNEO0FB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QUFEWCxPQUYyQztBQUtwRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLEtBQWY7QUFMOEMsS0FBNUMsQ0FBTCxDQU1KLElBTkksQ0FNQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFOVixDQUFQO0FBT0QsR0ExQmtCO0FBMkJyQixFQUFBLFNBQVMsRUFBRyxRQUFELElBQWM7QUFDckIsV0FBTyxLQUFLLENBQUMsOEJBQUQsRUFBaUM7QUFDekMsTUFBQSxNQUFNLEVBQUUsTUFEaUM7QUFFekMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZnQztBQUt6QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFFBQWY7QUFMbUMsS0FBakMsQ0FBTCxDQU1KLElBTkksQ0FNQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFOVixDQUFQO0FBT0g7QUFuQ29CLENBQXpCO2VBc0NlLGdCOzs7Ozs7QUN4Q2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGVBQUQsQ0FBZDs7QUFHQSxtQkFBVSxJQUFWOztBQUVBLElBQUksQ0FBQyxTQUFMLElBQWtCLGdDQUFsQixDLENBS0E7O0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIjtcclxuaW1wb3J0IHNhdmVFdmVudCBmcm9tIFwiLi9ldmVudExpc3RlbmVyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudExpc3RcIlxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGxpc3RBcmVhID0gJChcIiNldmVudHNfZGlzcGxheVwiKVxyXG5cclxuY29uc3QgZXZlbnRBY3Rpb24gPSAoKSA9PiB7XHJcblxyXG57LyogPGFydGljbGUgaWQ9XCJldmVudHNfaW5wdXRcIj4gPC9hcnRpY2xlPlxyXG4gICAgPGFydGljbGUgaWQ9XCJldmVudHNfZGlzcGxheVwiPiA8L2FydGljbGU+ICovfVxyXG4gICAgbGlzdEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcIkVkaXRcIikpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHRoZUlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pXHJcblxyXG4gICAgICAgICAgICBldmVudERhdGFNYW5hZ2VyLmdldEV2ZW50KHRoZUlkKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2V2ZW50SWRcIikudmFsdWUgPSBldmVudC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJChcIiN1c2VySWRcIikudmFsdWUgPSBldmVudC51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlID0gZXZlbnQuZXZlbnREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWUgPSBldmVudC5ldmVudExvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2V2ZW50TmFtZVwiKS52YWx1ZSA9IGV2ZW50LmV2ZW50TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNldmVudEZvcm1BY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIlVwZGF0ZSBFdmVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2F2ZUV2ZW50KCkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGV2ZW50TGlzdClcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJEZWxldGVcIikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiB0aGUgZGVsZXRlIGJ1dHRvblwiKVxyXG4gICAgICAgICAgICBsZXQgaWQgPSBwYXJzZUludChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcclxuICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5kZWxldGVFdmVudChpZClcclxuICAgICAgICAgICAgLnRoZW4oKCk9PlxyXG4gICAgICAgICAgICAgICAgJChcIiNldmVudHNfZGlzcGxheVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICkudGhlbigoKSA9PiBldmVudExpc3QubGlzdCgpKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50QWN0aW9uIiwiXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBjbGVhckV2ZW50Rm9ybSA9ICgpID0+IHtcclxuXHJcbiAgICAgJChcIiNldmVudE5hbWVcIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI3VzZXJJZFwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnRJZFwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnRMb2NhdGlvblwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlPVwiXCJcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsZWFyRXZlbnRGb3JtIiwiXHJcbmNvbnN0IGV2ZW50Q2FyZCA9IChldmVudCk9PlxyXG57XHJcbiAgICByZXR1cm5gXHJcbiAgICA8c2VjdGlvbj5cclxuICAgPGgyPiR7ZXZlbnQuZXZlbnROYW1lfTwvaDI+XHJcbiAgICA8cD4ke2V2ZW50LmV2ZW50TG9jYXRpb259PHA+XHJcbiAgICA8cD4ke2V2ZW50LmV2ZW50RGF0ZX08cD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJldmVudC1jYXJkLS1idXR0b25cIiBpZD0nRWRpdC0tJHtldmVudC5pZH0nPkVkaXQgJHtldmVudC5ldmVudE5hbWV9IEV2ZW50IDwvYnV0dG9uPlxyXG4gICAgPGJyPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImV2ZW50LWNhcmQtLWJ1dHRvblwiIGlkPSdEZWxldGUtLSR7ZXZlbnQuaWR9Jz5EZWxldGUgJHtldmVudC5ldmVudE5hbWV9IEV2ZW50PC9idXR0b24+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50Q2FyZFxyXG4iLCJjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuLypcclxuMS4gTmFtZSBvZiBldmVudFxyXG4yLiBEYXRlIG9mIGV2ZW50XHJcbjMuIExvY2F0aW9uIG9mIGV2ZW50XHJcblxyXG4qKkdpdmVuKiogYSB1c2VyIGhhcyBlbnRlcmVkIGluIGFsbCBkZXRhaWxzIG9mIGFuIGV2ZW50XHJcbioqV2hlbioqIHRoZSB1c2VyIHBlcmZvcm1zIGEgZ2VzdHVyZSB0byBzYXZlIHRoZSBldmVudFxyXG4qKlRoZW4qKiB0aGUgZXZlbnQgc2hvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYXBwbGljYXRpb24gaW4gdGhlIGBFdmVudHNgIGNvbXBvbmVudFxyXG4qL1xyXG5cclxuY29uc3QgZm9ybUhUTUwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudElkXCIgbmFtZT1cImV2ZW50SWRcIiA+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJJZFwiIG5hbWU9XCJ1c2VySWRcIj48L2lucHV0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudE5hbWVcIj4gTmFtZSBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnROYW1lXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudERhdGVcIj4gRGF0ZSBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnREYXRlXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudExvY2F0aW9uXCI+IExvY2F0aW9uIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudExvY2F0aW9uXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImV2ZW50Rm9ybUFjdGlvblwiPlNhdmUgRXZlbnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1IVE1MIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRDYXJkXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5cclxuY29uc3Qgc3BvdCA9ICQoXCIjZXZlbnRzX2Rpc3BsYXlcIilcclxuLy9saXN0IGFsbCBldmVudHNcclxuXHJcbmNvbnN0IGV2ZW50TGlzdCA9IHtcclxuXHJcbiAgICBsaXN0OiAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnREYXRhTWFuYWdlci5mZXRjaEV2ZW50cygpLnRoZW4oXHJcbiAgICAgICAgICAgIChwYXJzZWRFdmVudHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHNwb3QuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHBhcnNlZEV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzcG90LmlubmVySFRNTCArPSBldmVudENhcmQoZXZlbnQpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudExpc3RcclxuLy90aGVuIGNoYW5nZSB0aGUgbGlzdCB0byBzaG93IG9ubHkgdGhvc2UgaXRlbXMgcmVsYXRlZCB0byB0aGUgdXNlciBpZCB0aGF0IGlzIGluIHNlc3Npb24iLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudExpc3RcIlxyXG5pbXBvcnQgY2xlYXJFdmVudEZvcm0gZnJvbSBcIi4vZW1wdHlFdmVudEZpZWxkc1wiXHJcbmltcG9ydCBldmVudEFjdGlvbiBmcm9tIFwiLi9jYXJkRXZlbnRMaXN0ZW5lclwiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNhdmVFdmVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRoZUJ1dHRvbiA9ICQoXCIjZXZlbnRGb3JtQWN0aW9uXCIpXHJcblxyXG4gICAgdGhlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xyXG4gICAgICAgICAgICAvLyB1c2VySWQ6ICQoXCIjdXNlcklkXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6ICQoXCIjZXZlbnROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudERhdGU6ICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudExvY2F0aW9uOiAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoZUJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiU2F2ZVwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBldmVudDpcIiwgbmV3RXZlbnQpXHJcbiAgICAgICAgICAgIGV2ZW50RGF0YU1hbmFnZXIuc2F2ZUV2ZW50KG5ld0V2ZW50KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBldmVudExpc3QubGlzdCgpKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBjbGVhckV2ZW50Rm9ybSgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGVCdXR0b24udGV4dENvbnRlbnQuc3RhcnRzV2l0aChcIlVwZGF0ZVwiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9ICQoXCIjZXZlbnRJZFwiKS52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICBldmVudERhdGFNYW5hZ2VyLmVkaXRFdmVudChwYXJzZUludChpZCksIG5ld0V2ZW50KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBldmVudExpc3QubGlzdCgpKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBjbGVhckV2ZW50Rm9ybSgpKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQWN0aW9uXCIpLnRleHRDb250ZW50ID0gXCJTYXZlIEV2ZW50XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2F2ZUV2ZW50IiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGV2ZW50RGF0YU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZmV0Y2hFdmVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YClcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pLnRoZW4oUmVzcG9uc2UgPT4gUmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGdldEV2ZW50OiAoZXZlbnRJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZXZlbnRzID0+IGV2ZW50cy5qc29uKCkpXHJcbiAgICAgICAgfSxcclxuICAgIGVkaXRFdmVudDogKGV2ZW50SWQsIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJldmVudFwiLCBldmVudClcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudClcclxuICAgICAgICB9KS50aGVuKGV2ZW50ID0+IGV2ZW50Lmpzb24oKSlcclxuICAgICAgfSxcclxuICAgIHNhdmVFdmVudDogKG5ld0V2ZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0V2ZW50KVxyXG4gICAgICAgIH0pLnRoZW4oZXZlbnQgPT4gZXZlbnQuanNvbigpKVxyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnREYXRhTWFuYWdlciIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudHMvZXZlbnRMaXN0XCJcclxuaW1wb3J0IGV2ZW50Q2FyZCBmcm9tIFwiLi9ldmVudHMvZXZlbnRDYXJkXCJcclxuaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtXCJcclxuaW1wb3J0IHNhdmVFdmVudCBmcm9tIFwiLi9ldmVudHMvZXZlbnRMaXN0ZW5lclwiXHJcbmltcG9ydCBldmVudEFjdGlvbiBmcm9tIFwiLi9ldmVudHMvY2FyZEV2ZW50TGlzdGVuZXJcIjtcclxuXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgcG9zdCA9ICQoXCIjZXZlbnRzX2lucHV0XCIpXHJcblxyXG5cclxuZXZlbnRMaXN0Lmxpc3QoKVxyXG5cclxucG9zdC5pbm5lckhUTUwgKz0gZm9ybUhUTUwoKVxyXG5cclxuXHJcblxyXG5cclxuLy8gZXZlbnRBY3Rpb25cclxuc2F2ZUV2ZW50KClcclxuZXZlbnRBY3Rpb24oKVxyXG4iXX0=
