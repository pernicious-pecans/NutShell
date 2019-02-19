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
        $("#eventId").value = event.id, $("#userId").value = event.userId, $("#eventDate").value = event.eventDate, $("#eventLocation").value = event.eventLocation, $("#eventName").value = event.eventName, $("#eventFormAction").textContent = "Update Event";
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

},{"./eventList":6,"./eventListener":7,"./evtDataMgr":8}],2:[function(require,module,exports){
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

var _eventHTMLforForm = _interopRequireDefault(require("./eventHTMLforForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const post = $("#events_input");

const formFunctions = () => {
  post.innerHTML = (0, _eventHTMLforForm.default)();
};

var _default = formFunctions;
exports.default = _default;

},{"./eventHTMLforForm":5}],5:[function(require,module,exports){
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
                <input  id="userId" name="userId"></input>

            <fieldset>
                <label class="label" for="eventName"> Name of Event </label>
                <input id="eventName" type="text" required></input>
            </fieldset>

            <fieldset>
                <label class="label" for="eventDate"> Date of Event </label>
                <input min="2019-02-18" id="eventDate" type="date" required pattern=""[0-9]{2}-[0-9]{2}-[0-9]{4} ></input>
            </fieldset>

            <fieldset>
                <label class="label" for="eventLocation"> Location of Event </label>
                <input id="eventLocation" type="text" required></input>
            </fieldset>

            <button id="eventFormAction">Save Event</button>
            </section>
        `;
};

var _default = formHTML;
exports.default = _default;

},{}],6:[function(require,module,exports){
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

},{"./eventCard":3,"./evtDataMgr":8}],7:[function(require,module,exports){
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
      user: {
        userId: $("#userId").value
      },
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

},{"./cardEventListener":1,"./emptyEventFields":2,"./eventList":6,"./evtDataMgr":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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

},{}],9:[function(require,module,exports){
"use strict";

var _evtDataMgr = _interopRequireDefault(require("./events/evtDataMgr"));

var _eventList = _interopRequireDefault(require("./events/eventList"));

var _eventCard = _interopRequireDefault(require("./events/eventCard"));

var _eventHTMLforForm = _interopRequireDefault(require("./events/eventHTMLforForm"));

var _eventListener = _interopRequireDefault(require("./events/eventListener"));

var _cardEventListener = _interopRequireDefault(require("./events/cardEventListener"));

var _eventForm = _interopRequireDefault(require("./events/eventForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const post = $("#events_input");

_eventList.default.list();

(0, _eventForm.default)(); // eventAction

(0, _eventListener.default)();
(0, _cardEventListener.default)();

},{"./events/cardEventListener":1,"./events/eventCard":3,"./events/eventForm":4,"./events/eventHTMLforForm":5,"./events/eventList":6,"./events/eventListener":7,"./events/evtDataMgr":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jYXJkRXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VtcHR5RXZlbnRGaWVsZHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudENhcmQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEZvcm0uanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2dERhdGFNZ3IuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGlCQUFELENBQWxCOztBQUVBLE1BQU0sV0FBVyxHQUFHLE1BQU07QUFFMUI7QUFBQzs7QUFDK0M7QUFDNUMsRUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBTTtBQUdyQyxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixVQUFoQixDQUEyQixNQUEzQixDQUFKLEVBQXdDO0FBSXBDLFVBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBRCxDQUFwQjs7QUFFQSwwQkFBaUIsUUFBakIsQ0FBMEIsS0FBMUIsRUFBaUMsSUFBakMsQ0FDSyxLQUFELElBQVc7QUFDRixRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxL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LCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCI7XHJcbmltcG9ydCBzYXZlRXZlbnQgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRMaXN0XCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBsaXN0QXJlYSA9ICQoXCIjZXZlbnRzX2Rpc3BsYXlcIilcclxuXHJcbmNvbnN0IGV2ZW50QWN0aW9uID0gKCkgPT4ge1xyXG5cclxuey8qIDxhcnRpY2xlIGlkPVwiZXZlbnRzX2lucHV0XCI+IDwvYXJ0aWNsZT5cclxuICAgIDxhcnRpY2xlIGlkPVwiZXZlbnRzX2Rpc3BsYXlcIj4gPC9hcnRpY2xlPiAqL31cclxuICAgIGxpc3RBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJFZGl0XCIpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0aGVJZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKVxyXG5cclxuICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5nZXRFdmVudCh0aGVJZCkudGhlbihcclxuICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNldmVudElkXCIpLnZhbHVlID0gZXZlbnQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXNlcklkXCIpLnZhbHVlID0gZXZlbnQudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2V2ZW50RGF0ZVwiKS52YWx1ZSA9IGV2ZW50LmV2ZW50RGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNldmVudExvY2F0aW9uXCIpLnZhbHVlID0gZXZlbnQuZXZlbnRMb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNldmVudE5hbWVcIikudmFsdWUgPSBldmVudC5ldmVudE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjZXZlbnRGb3JtQWN0aW9uXCIpLnRleHRDb250ZW50ID0gXCJVcGRhdGUgRXZlbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHNhdmVFdmVudCgpKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBldmVudExpc3QpXHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiRGVsZXRlXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW4gdGhlIGRlbGV0ZSBidXR0b25cIilcclxuICAgICAgICAgICAgbGV0IGlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pXHJcbiAgICAgICAgICAgIGV2ZW50RGF0YU1hbmFnZXIuZGVsZXRlRXZlbnQoaWQpXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT5cclxuICAgICAgICAgICAgICAgICQoXCIjZXZlbnRzX2Rpc3BsYXlcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICApLnRoZW4oKCkgPT4gZXZlbnRMaXN0Lmxpc3QoKSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEFjdGlvbiIsIlxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgY2xlYXJFdmVudEZvcm0gPSAoKSA9PiB7XHJcblxyXG4gICAgICQoXCIjZXZlbnROYW1lXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiN1c2VySWRcIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI2V2ZW50SWRcIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI2V2ZW50RGF0ZVwiKS52YWx1ZT1cIlwiXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckV2ZW50Rm9ybSIsIlxyXG5jb25zdCBldmVudENhcmQgPSAoZXZlbnQpPT5cclxue1xyXG4gICAgcmV0dXJuYFxyXG4gICAgPHNlY3Rpb24+XHJcbiAgIDxoMj4ke2V2ZW50LmV2ZW50TmFtZX08L2gyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZXZlbnQtY2FyZC0tYnV0dG9uXCIgaWQ9J0VkaXQtLSR7ZXZlbnQuaWR9Jz5FZGl0ICR7ZXZlbnQuZXZlbnROYW1lfSBFdmVudCA8L2J1dHRvbj5cclxuICAgIDxicj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJldmVudC1jYXJkLS1idXR0b25cIiBpZD0nRGVsZXRlLS0ke2V2ZW50LmlkfSc+RGVsZXRlICR7ZXZlbnQuZXZlbnROYW1lfSBFdmVudDwvYnV0dG9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudENhcmRcclxuIiwiaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50SFRNTGZvckZvcm1cIlxyXG5cclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcbmNvbnN0IHBvc3QgPSAkKFwiI2V2ZW50c19pbnB1dFwiKVxyXG5cclxuY29uc3QgZm9ybUZ1bmN0aW9ucyA9ICgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICBwb3N0LmlubmVySFRNTCA9IGZvcm1IVE1MKClcclxuXHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1GdW5jdGlvbnNcclxuIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbi8qXHJcbjEuIE5hbWUgb2YgZXZlbnRcclxuMi4gRGF0ZSBvZiBldmVudFxyXG4zLiBMb2NhdGlvbiBvZiBldmVudFxyXG5cclxuKipHaXZlbioqIGEgdXNlciBoYXMgZW50ZXJlZCBpbiBhbGwgZGV0YWlscyBvZiBhbiBldmVudFxyXG4qKldoZW4qKiB0aGUgdXNlciBwZXJmb3JtcyBhIGdlc3R1cmUgdG8gc2F2ZSB0aGUgZXZlbnRcclxuKipUaGVuKiogdGhlIGV2ZW50IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGFwcGxpY2F0aW9uIGluIHRoZSBgRXZlbnRzYCBjb21wb25lbnRcclxuKi9cclxuXHJcbmNvbnN0IGZvcm1IVE1MID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnRJZFwiIG5hbWU9XCJldmVudElkXCIgPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgIGlkPVwidXNlcklkXCIgbmFtZT1cInVzZXJJZFwiPjwvaW5wdXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TmFtZVwiPiBOYW1lIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudE5hbWVcIiB0eXBlPVwidGV4dFwiIHJlcXVpcmVkPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50RGF0ZVwiPiBEYXRlIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgbWluPVwiMjAxOS0wMi0xOFwiIGlkPVwiZXZlbnREYXRlXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZCBwYXR0ZXJuPVwiXCJbMC05XXsyfS1bMC05XXsyfS1bMC05XXs0fSA+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnRMb2NhdGlvblwiPiBMb2NhdGlvbiBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnRMb2NhdGlvblwiIHR5cGU9XCJ0ZXh0XCIgcmVxdWlyZWQ+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJldmVudEZvcm1BY3Rpb25cIj5TYXZlIEV2ZW50PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtSFRNTCIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRDYXJkIGZyb20gXCIuL2V2ZW50Q2FyZFwiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNwb3QgPSAkKFwiI2V2ZW50c19kaXNwbGF5XCIpXHJcbi8vbGlzdCBhbGwgZXZlbnRzXHJcblxyXG5jb25zdCBldmVudExpc3QgPSB7XHJcblxyXG4gICAgbGlzdDogKCkgPT4ge1xyXG4gICAgICAgIGV2ZW50RGF0YU1hbmFnZXIuZmV0Y2hFdmVudHMoKS50aGVuKFxyXG4gICAgICAgICAgICAocGFyc2VkRXZlbnRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzcG90LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWRFdmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BvdC5pbm5lckhUTUwgKz0gZXZlbnRDYXJkKGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRMaXN0XHJcbi8vdGhlbiBjaGFuZ2UgdGhlIGxpc3QgdG8gc2hvdyBvbmx5IHRob3NlIGl0ZW1zIHJlbGF0ZWQgdG8gdGhlIHVzZXIgaWQgdGhhdCBpcyBpbiBzZXNzaW9uIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRMaXN0XCJcclxuaW1wb3J0IGNsZWFyRXZlbnRGb3JtIGZyb20gXCIuL2VtcHR5RXZlbnRGaWVsZHNcIlxyXG5pbXBvcnQgZXZlbnRBY3Rpb24gZnJvbSBcIi4vY2FyZEV2ZW50TGlzdGVuZXJcIlxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcblxyXG5jb25zdCBzYXZlRXZlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0aGVCdXR0b24gPSAkKFwiI2V2ZW50Rm9ybUFjdGlvblwiKVxyXG5cclxuICAgIHRoZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IHtcclxuICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiAkKFwiI3VzZXJJZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudE5hbWU6ICQoXCIjZXZlbnROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudERhdGU6ICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudExvY2F0aW9uOiAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGVCdXR0b24udGV4dENvbnRlbnQuc3RhcnRzV2l0aChcIlNhdmVcIikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXcgZXZlbnQ6XCIsIG5ld0V2ZW50KVxyXG4gICAgICAgICAgICBldmVudERhdGFNYW5hZ2VyLnNhdmVFdmVudChuZXdFdmVudClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gZXZlbnRMaXN0Lmxpc3QoKSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gY2xlYXJFdmVudEZvcm0oKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhlQnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoXCJVcGRhdGVcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSAkKFwiI2V2ZW50SWRcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5lZGl0RXZlbnQocGFyc2VJbnQoaWQpLCBuZXdFdmVudClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gZXZlbnRMaXN0Lmxpc3QoKSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gY2xlYXJFdmVudEZvcm0oKSlcclxuICAgICAgICAgICAgLnRoZW4oKCk9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUFjdGlvblwiKS50ZXh0Q29udGVudCA9IFwiU2F2ZSBFdmVudFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNhdmVFdmVudCIsIlxyXG5jb25zdCBldmVudERhdGFNYW5hZ2VyID0ge1xyXG5cclxuICAgIGZldGNoRXZlbnRzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4gICAgICAgICAgICAudGhlbihSZXNwb25zZSA9PiBSZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWApXHJcblxyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICB9KS50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBnZXRFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgICAgIH0sXHJcbiAgICBlZGl0RXZlbnQ6IChldmVudElkLCBldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXZlbnRcIiwgZXZlbnQpXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSkudGhlbihldmVudCA9PiBldmVudC5qc29uKCkpXHJcbiAgICAgIH0sXHJcbiAgICBzYXZlRXZlbnQ6IChuZXdFdmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFdmVudClcclxuICAgICAgICB9KS50aGVuKGV2ZW50ID0+IGV2ZW50Lmpzb24oKSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RGF0YU1hbmFnZXIiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50Q2FyZFwiXHJcbmltcG9ydCBmb3JtSFRNTCBmcm9tIFwiLi9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybVwiXHJcbmltcG9ydCBzYXZlRXZlbnQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdGVuZXJcIlxyXG5pbXBvcnQgZXZlbnRBY3Rpb24gZnJvbSBcIi4vZXZlbnRzL2NhcmRFdmVudExpc3RlbmVyXCI7XHJcbmltcG9ydCBmb3JtRnVuY3Rpb25zIGZyb20gXCIuL2V2ZW50cy9ldmVudEZvcm1cIjtcclxuXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgcG9zdCA9ICQoXCIjZXZlbnRzX2lucHV0XCIpXHJcblxyXG5cclxuZXZlbnRMaXN0Lmxpc3QoKVxyXG5cclxuZm9ybUZ1bmN0aW9ucygpXHJcblxyXG5cclxuXHJcbi8vIGV2ZW50QWN0aW9uXHJcbnNhdmVFdmVudCgpXHJcbmV2ZW50QWN0aW9uKClcclxuIl19
