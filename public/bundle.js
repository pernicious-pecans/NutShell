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
        $("#eventDate").value = event.eventDate, $("#eventLocation").value = event.eventLocation, $("#eventName").value = event.eventName;
        document.querySelector("#eventFormAction").textContent = "Update Event";
      }).then(() => (0, _eventListener.default)()).then(() => {
        document.querySelector("#eventFormAction").textContent = "Save Event";
      });
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

      _evtDataMgr.default.editEvent(parseInt(id), newEvent).then(() => _eventList.default.list()).then(() => (0, _emptyEventFields.default)());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jYXJkRXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VtcHR5RXZlbnRGaWVsZHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudENhcmQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2dERhdGFNZ3IuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGlCQUFELENBQWxCOztBQUVBLE1BQU0sV0FBVyxHQUFHLE1BQU07QUFFMUI7QUFBQzs7QUFDK0M7QUFDNUMsRUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBTTtBQUdyQyxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixVQUFoQixDQUEyQixNQUEzQixDQUFKLEVBQXdDO0FBSXBDLFVBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBRCxDQUFwQjs7QUFFQSwwQkFBaUIsUUFBakIsQ0FBMEIsS0FBMUIsRUFBaUMsSUFBakMsQ0FDSyxLQUFELElBQVc7QUFDUCxRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUFkLEdBQXNCLEtBQUssQ0FBQyxFQUE1QixFQUNJO0FB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cEQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTDhDLEtBQTVDLENBQUwsQ0FNSixJQU5JLENBTUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFOLEVBTlYsQ0FBUDtBQU9ELEdBMUJrQjtBQTJCckIsRUFBQSxTQUFTLEVBQUcsUUFBRCxJQUFjO0FBQ3JCLFdBQU8sS0FBSyxDQUFDLDhCQUFELEVBQWlDO0FBQ3pDLE1BQUEsTUFBTSxFQUFFLE1BRGlDO0FBRXpDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGZ0M7QUFLekMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxRQUFmO0FBTG1DLEtBQWpDLENBQUwsQ0FNSixJQU5JLENBTUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFOLEVBTlYsQ0FBUDtBQU9IO0FBbkNvQixDQUF6QjtlQXNDZSxnQjs7Ozs7O0FDeENmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUVBLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxlQUFELENBQWQ7O0FBR0EsbUJBQVUsSUFBVjs7QUFFQSxJQUFJLENBQUMsU0FBTCxJQUFrQixnQ0FBbEIsQyxDQUtBOztBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCI7XHJcbmltcG9ydCBzYXZlRXZlbnQgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRMaXN0XCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBsaXN0QXJlYSA9ICQoXCIjZXZlbnRzX2Rpc3BsYXlcIilcclxuXHJcbmNvbnN0IGV2ZW50QWN0aW9uID0gKCkgPT4ge1xyXG5cclxuey8qIDxhcnRpY2xlIGlkPVwiZXZlbnRzX2lucHV0XCI+IDwvYXJ0aWNsZT5cclxuICAgIDxhcnRpY2xlIGlkPVwiZXZlbnRzX2Rpc3BsYXlcIj4gPC9hcnRpY2xlPiAqL31cclxuICAgIGxpc3RBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJFZGl0XCIpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0aGVJZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKVxyXG5cclxuICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5nZXRFdmVudCh0aGVJZCkudGhlbihcclxuICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXZlbnRJZFwiKS52YWx1ZSA9IGV2ZW50LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAkKFwiI3VzZXJJZFwiKS52YWx1ZSA9IGV2ZW50LnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNldmVudERhdGVcIikudmFsdWUgPSBldmVudC5ldmVudERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjZXZlbnRMb2NhdGlvblwiKS52YWx1ZSA9IGV2ZW50LmV2ZW50TG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjZXZlbnROYW1lXCIpLnZhbHVlID0gZXZlbnQuZXZlbnROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1BY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIlVwZGF0ZSBFdmVudFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzYXZlRXZlbnQoKSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1BY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIlNhdmUgRXZlbnRcIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcIkRlbGV0ZVwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluIHRoZSBkZWxldGUgYnV0dG9uXCIpXHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKVxyXG4gICAgICAgICAgICBldmVudERhdGFNYW5hZ2VyLmRlbGV0ZUV2ZW50KGlkKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+XHJcbiAgICAgICAgICAgICAgICAkKFwiI2V2ZW50c19kaXNwbGF5XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgKS50aGVuKCgpID0+IGV2ZW50TGlzdC5saXN0KCkpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRBY3Rpb24iLCJcclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGNsZWFyRXZlbnRGb3JtID0gKCkgPT4ge1xyXG5cclxuICAgICAkKFwiI2V2ZW50TmFtZVwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjdXNlcklkXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiNldmVudElkXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiNldmVudExvY2F0aW9uXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiNldmVudERhdGVcIikudmFsdWU9XCJcIlxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xlYXJFdmVudEZvcm0iLCJcclxuY29uc3QgZXZlbnRDYXJkID0gKGV2ZW50KT0+XHJcbntcclxuICAgIHJldHVybmBcclxuICAgIDxzZWN0aW9uPlxyXG4gICA8aDI+JHtldmVudC5ldmVudE5hbWV9PC9oMj5cclxuICAgIDxwPiR7ZXZlbnQuZXZlbnRMb2NhdGlvbn08cD5cclxuICAgIDxwPiR7ZXZlbnQuZXZlbnREYXRlfTxwPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImV2ZW50LWNhcmQtLWJ1dHRvblwiIGlkPSdFZGl0LS0ke2V2ZW50LmlkfSc+RWRpdCAke2V2ZW50LmV2ZW50TmFtZX0gRXZlbnQgPC9idXR0b24+XHJcbiAgICA8YnI+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZXZlbnQtY2FyZC0tYnV0dG9uXCIgaWQ9J0RlbGV0ZS0tJHtldmVudC5pZH0nPkRlbGV0ZSAke2V2ZW50LmV2ZW50TmFtZX0gRXZlbnQ8L2J1dHRvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRDYXJkXHJcbiIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG4vKlxyXG4xLiBOYW1lIG9mIGV2ZW50XHJcbjIuIERhdGUgb2YgZXZlbnRcclxuMy4gTG9jYXRpb24gb2YgZXZlbnRcclxuXHJcbioqR2l2ZW4qKiBhIHVzZXIgaGFzIGVudGVyZWQgaW4gYWxsIGRldGFpbHMgb2YgYW4gZXZlbnRcclxuKipXaGVuKiogdGhlIHVzZXIgcGVyZm9ybXMgYSBnZXN0dXJlIHRvIHNhdmUgdGhlIGV2ZW50XHJcbioqVGhlbioqIHRoZSBldmVudCBzaG91bGQgYmUgZGlzcGxheWVkIGluIHRoZSBhcHBsaWNhdGlvbiBpbiB0aGUgYEV2ZW50c2AgY29tcG9uZW50XHJcbiovXHJcblxyXG5jb25zdCBmb3JtSFRNTCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50SWRcIiBuYW1lPVwiZXZlbnRJZFwiID48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwidXNlcklkXCIgbmFtZT1cInVzZXJJZFwiPjwvaW5wdXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TmFtZVwiPiBOYW1lIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudE5hbWVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50RGF0ZVwiPiBEYXRlIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudERhdGVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TG9jYXRpb25cIj4gTG9jYXRpb24gb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50TG9jYXRpb25cIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiZXZlbnRGb3JtQWN0aW9uXCI+U2F2ZSBFdmVudDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybUhUTUwiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50Q2FyZCBmcm9tIFwiLi9ldmVudENhcmRcIlxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcblxyXG5jb25zdCBzcG90ID0gJChcIiNldmVudHNfZGlzcGxheVwiKVxyXG4vL2xpc3QgYWxsIGV2ZW50c1xyXG5cclxuY29uc3QgZXZlbnRMaXN0ID0ge1xyXG5cclxuICAgIGxpc3Q6ICgpID0+IHtcclxuICAgICAgICBldmVudERhdGFNYW5hZ2VyLmZldGNoRXZlbnRzKCkudGhlbihcclxuICAgICAgICAgICAgKHBhcnNlZEV2ZW50cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3BvdC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VkRXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwb3QuaW5uZXJIVE1MICs9IGV2ZW50Q2FyZChldmVudClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50TGlzdFxyXG4vL3RoZW4gY2hhbmdlIHRoZSBsaXN0IHRvIHNob3cgb25seSB0aG9zZSBpdGVtcyByZWxhdGVkIHRvIHRoZSB1c2VyIGlkIHRoYXQgaXMgaW4gc2Vzc2lvbiIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRMaXN0IGZyb20gXCIuL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBjbGVhckV2ZW50Rm9ybSBmcm9tIFwiLi9lbXB0eUV2ZW50RmllbGRzXCJcclxuaW1wb3J0IGV2ZW50QWN0aW9uIGZyb20gXCIuL2NhcmRFdmVudExpc3RlbmVyXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5cclxuY29uc3Qgc2F2ZUV2ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGhlQnV0dG9uID0gJChcIiNldmVudEZvcm1BY3Rpb25cIilcclxuXHJcbiAgICB0aGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSB7XHJcbiAgICAgICAgICAgIC8vIHVzZXJJZDogJChcIiN1c2VySWRcIikudmFsdWUsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogJChcIiNldmVudE5hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgIGV2ZW50RGF0ZTogJChcIiNldmVudERhdGVcIikudmFsdWUsXHJcbiAgICAgICAgICAgIGV2ZW50TG9jYXRpb246ICQoXCIjZXZlbnRMb2NhdGlvblwiKS52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhlQnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoXCJTYXZlXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IGV2ZW50OlwiLCBuZXdFdmVudClcclxuICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5zYXZlRXZlbnQobmV3RXZlbnQpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGV2ZW50TGlzdC5saXN0KCkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNsZWFyRXZlbnRGb3JtKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoZUJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiVXBkYXRlXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJChcIiNldmVudElkXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgIGV2ZW50RGF0YU1hbmFnZXIuZWRpdEV2ZW50KHBhcnNlSW50KGlkKSwgbmV3RXZlbnQpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGV2ZW50TGlzdC5saXN0KCkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNsZWFyRXZlbnRGb3JtKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNhdmVFdmVudCIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBldmVudERhdGFNYW5hZ2VyID0ge1xyXG5cclxuICAgIGZldGNoRXZlbnRzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4gICAgICAgICAgICAudGhlbihSZXNwb25zZSA9PiBSZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWApXHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICB9KS50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBnZXRFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgICAgIH0sXHJcbiAgICBlZGl0RXZlbnQ6IChldmVudElkLCBldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXZlbnRcIiwgZXZlbnQpXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSkudGhlbihldmVudCA9PiBldmVudC5qc29uKCkpXHJcbiAgICAgIH0sXHJcbiAgICBzYXZlRXZlbnQ6IChuZXdFdmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFdmVudClcclxuICAgICAgICB9KS50aGVuKGV2ZW50ID0+IGV2ZW50Lmpzb24oKSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RGF0YU1hbmFnZXIiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50Q2FyZFwiXHJcbmltcG9ydCBmb3JtSFRNTCBmcm9tIFwiLi9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybVwiXHJcbmltcG9ydCBzYXZlRXZlbnQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdGVuZXJcIlxyXG5pbXBvcnQgZXZlbnRBY3Rpb24gZnJvbSBcIi4vZXZlbnRzL2NhcmRFdmVudExpc3RlbmVyXCI7XHJcblxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IHBvc3QgPSAkKFwiI2V2ZW50c19pbnB1dFwiKVxyXG5cclxuXHJcbmV2ZW50TGlzdC5saXN0KClcclxuXHJcbnBvc3QuaW5uZXJIVE1MICs9IGZvcm1IVE1MKClcclxuXHJcblxyXG5cclxuXHJcbi8vIGV2ZW50QWN0aW9uXHJcbnNhdmVFdmVudCgpXHJcbmV2ZW50QWN0aW9uKClcclxuIl19
