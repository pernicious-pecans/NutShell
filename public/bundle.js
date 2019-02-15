(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const $ = document.querySelector.bind(document);

const clearEventForm = () => {
  $("#eventName").value = "", $("#userId").value = "", $("#eventLocation").value = "", $("#eventDate").value = "";
};

var _default = clearEventForm;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const eventCard = event => {
  return `
   <h2> ${event.eventName}<h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>
    <button id='delete--event--${event.id}'>Delete ${event.eventName} </button>
    <button id='edit--event--${event.id}'>Delete ${event.eventName} </button>

    `;
};

var _default = eventCard;
exports.default = _default;

},{}],3:[function(require,module,exports){
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
                <input id="eventId" name="eventId" type="hidden"></input>
                <input id="userId" name="userId" type="hidden"></input>

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

},{}],4:[function(require,module,exports){
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
      parsedEvents.forEach(event => {
        spot.innerHTML += (0, _eventCard.default)(event);
      });
    });
  }
};
var _default = eventList; //then change the list to show only those items related to the user id that is in session

exports.default = _default;

},{"./eventCard":2,"./evtDataMgr":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

var _eventList = _interopRequireDefault(require("./eventList"));

var _emptyEventFields = _interopRequireDefault(require("./emptyEventFields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);

const saveEvent = () => {
  const theButton = $("#eventFormAction");
  theButton.addEventListener("click", () => {
    const newEvent = {
      userId: $("#userId").value,
      eventName: $("#eventName").value,
      eventDate: $("#eventDate").value,
      eventLocation: $("#eventLocation").value
    };

    if (theButton.textContent.startsWith("Save")) {
      console.log("new event:", newEvent);
      fetch("http://localhost:8088/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      }).then(_emptyEventFields.default);
    } else if (theButton.textContent.startsWith("Update")) {
      fetch(`http://localhost:8088/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      }).then(_emptyEventFields.default);
    }
  });
};

var _default = saveEvent;
exports.default = _default;

},{"./emptyEventFields":1,"./eventList":4,"./evtDataMgr":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const $ = document.querySelector.bind(document);
const eventDataManager = {
  fetchEvents: () => {
    return fetch("http://localhost:8088/events").then(Response => Response.json()).then(parsedEvents => {
      console.log(parsedEvents);
      return parsedEvents;
    });
  },
  deleteEvent: eventId => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "DELETE"
    });
  },
  getEvent: eventId => {
    return fetch(`http://localhost:8088/events/${eventId}`).then(events => events.json()).then(parsedEvent => {
      return parsedEvent;
    });
  },
  editEvent: (eventId, event) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
  },
  saveEvent: newEvent => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    });
  }
};
var _default = eventDataManager;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

var _evtDataMgr = _interopRequireDefault(require("./events/evtDataMgr"));

var _eventList = _interopRequireDefault(require("./events/eventList"));

var _eventCard = _interopRequireDefault(require("./events/eventCard"));

var _eventHTMLforForm = _interopRequireDefault(require("./events/eventHTMLforForm"));

var _eventListener = _interopRequireDefault(require("./events/eventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const post = $("#events_input");

_eventList.default.list();

post.innerHTML += (0, _eventHTMLforForm.default)();
(0, _eventListener.default)();

},{"./events/eventCard":2,"./events/eventHTMLforForm":3,"./events/eventList":4,"./events/eventListener":5,"./events/evtDataMgr":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9lbXB0eUV2ZW50RmllbGRzLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRDYXJkLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybS5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldnREYXRhTWdyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBRXhCLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixLQUFoQixHQUFzQixFQUF0QixFQUNBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLEdBQW1CLEVBRG5CLEVBRUEsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0IsS0FBcEIsR0FBMEIsRUFGMUIsRUFHQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLEtBQWhCLEdBQXNCLEVBSHRCO0FBS0osQ0FQRDs7ZUFTZSxjOzs7Ozs7Ozs7OztBQ1hmLE1BQU0sU0FBUyxHQUFJLEtBQUQsSUFDbEI7QUFDSSxTQUFPO1VBQ0QsS0FBSyxDQUFDLFNBQVU7U0FDakIsS0FBSyxDQUFDLGFBQWM7U0FDcEIsS0FBSyxDQUFDLFNBQVU7aUNBQ1EsS0FBSyxDQUFDLEVBQUcsWUFBVyxLQUFLLENBQUMsU0FBVTsrQkFDdEMsS0FBSyxDQUFDLEVBQUcsWUFBVyxLQUFLLENBQUMsU0FBVTs7S0FML0Q7QUFRSCxDQVZEOztlQVllLFM7Ozs7Ozs7Ozs7QUNiZixNQUFNLENBQUMsR0FBRyxRQUFR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QUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFFQSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsZUFBRCxDQUFkOztBQUdBLG1CQUFVLElBQVY7O0FBRUEsSUFBSSxDQUFDLFNBQUwsSUFBa0IsZ0NBQWxCO0FBS0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGNsZWFyRXZlbnRGb3JtID0gKCkgPT4ge1xyXG5cclxuICAgICAkKFwiI2V2ZW50TmFtZVwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjdXNlcklkXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiNldmVudExvY2F0aW9uXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiNldmVudERhdGVcIikudmFsdWU9XCJcIlxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xlYXJFdmVudEZvcm0iLCJcclxuY29uc3QgZXZlbnRDYXJkID0gKGV2ZW50KT0+XHJcbntcclxuICAgIHJldHVybmBcclxuICAgPGgyPiAke2V2ZW50LmV2ZW50TmFtZX08aDI+XHJcbiAgICA8cD4ke2V2ZW50LmV2ZW50TG9jYXRpb259PHA+XHJcbiAgICA8cD4ke2V2ZW50LmV2ZW50RGF0ZX08cD5cclxuICAgIDxidXR0b24gaWQ9J2RlbGV0ZS0tZXZlbnQtLSR7ZXZlbnQuaWR9Jz5EZWxldGUgJHtldmVudC5ldmVudE5hbWV9IDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBpZD0nZWRpdC0tZXZlbnQtLSR7ZXZlbnQuaWR9Jz5EZWxldGUgJHtldmVudC5ldmVudE5hbWV9IDwvYnV0dG9uPlxyXG5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRDYXJkXHJcbiIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG4vKlxyXG4xLiBOYW1lIG9mIGV2ZW50XHJcbjIuIERhdGUgb2YgZXZlbnRcclxuMy4gTG9jYXRpb24gb2YgZXZlbnRcclxuXHJcbioqR2l2ZW4qKiBhIHVzZXIgaGFzIGVudGVyZWQgaW4gYWxsIGRldGFpbHMgb2YgYW4gZXZlbnRcclxuKipXaGVuKiogdGhlIHVzZXIgcGVyZm9ybXMgYSBnZXN0dXJlIHRvIHNhdmUgdGhlIGV2ZW50XHJcbioqVGhlbioqIHRoZSBldmVudCBzaG91bGQgYmUgZGlzcGxheWVkIGluIHRoZSBhcHBsaWNhdGlvbiBpbiB0aGUgYEV2ZW50c2AgY29tcG9uZW50XHJcbiovXHJcblxyXG5jb25zdCBmb3JtSFRNTCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50SWRcIiBuYW1lPVwiZXZlbnRJZFwiIHR5cGU9XCJoaWRkZW5cIj48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwidXNlcklkXCIgbmFtZT1cInVzZXJJZFwiIHR5cGU9XCJoaWRkZW5cIj48L2lucHV0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudE5hbWVcIj4gTmFtZSBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnROYW1lXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudERhdGVcIj4gRGF0ZSBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnREYXRlXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudExvY2F0aW9uXCI+IExvY2F0aW9uIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudExvY2F0aW9uXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImV2ZW50Rm9ybUFjdGlvblwiPlNhdmUgRXZlbnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1IVE1MIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRDYXJkXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5cclxuY29uc3Qgc3BvdCA9ICQoXCIjZXZlbnRzX2Rpc3BsYXlcIilcclxuLy9saXN0IGFsbCBldmVudHNcclxuXHJcbmNvbnN0IGV2ZW50TGlzdCA9IHtcclxuXHJcbiAgICBsaXN0OiAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnREYXRhTWFuYWdlci5mZXRjaEV2ZW50cygpLnRoZW4oXHJcbiAgICAgICAgICAgIChwYXJzZWRFdmVudHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnNlZEV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzcG90LmlubmVySFRNTCArPSBldmVudENhcmQoZXZlbnQpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRMaXN0XHJcbi8vdGhlbiBjaGFuZ2UgdGhlIGxpc3QgdG8gc2hvdyBvbmx5IHRob3NlIGl0ZW1zIHJlbGF0ZWQgdG8gdGhlIHVzZXIgaWQgdGhhdCBpcyBpbiBzZXNzaW9uIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRMaXN0XCJcclxuaW1wb3J0IGNsZWFyRXZlbnRGb3JtIGZyb20gXCIuL2VtcHR5RXZlbnRGaWVsZHNcIlxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcblxyXG5jb25zdCBzYXZlRXZlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0aGVCdXR0b24gPSAkKFwiI2V2ZW50Rm9ybUFjdGlvblwiKVxyXG5cclxuICAgIHRoZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IHtcclxuICAgICAgICAgICAgdXNlcklkOiAkKFwiI3VzZXJJZFwiKS52YWx1ZSxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiAkKFwiI2V2ZW50TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgZXZlbnREYXRlOiAkKFwiI2V2ZW50RGF0ZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgZXZlbnRMb2NhdGlvbjogJChcIiNldmVudExvY2F0aW9uXCIpLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGVCdXR0b24udGV4dENvbnRlbnQuc3RhcnRzV2l0aChcIlNhdmVcIikpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBldmVudDpcIiwgbmV3RXZlbnQpXHJcblxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0V2ZW50KVxyXG5cclxuICAgICAgICAgICAgfSkudGhlbihjbGVhckV2ZW50Rm9ybSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoZUJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiVXBkYXRlXCIpKSB7XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0V2ZW50KVxyXG4gICAgICAgICAgICB9KS50aGVuKGNsZWFyRXZlbnRGb3JtKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBzYXZlRXZlbnQiLCJjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgZXZlbnREYXRhTWFuYWdlciA9IHtcclxuXHJcbiAgICBmZXRjaEV2ZW50czogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIilcclxuICAgICAgICAgICAgLnRoZW4oUmVzcG9uc2UgPT4gUmVzcG9uc2UuanNvbigpKVxyXG5cclxuICAgICAgICAgICAgLnRoZW4ocGFyc2VkRXZlbnRzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZEV2ZW50cylcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRFdmVudHNcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihwYXJzZWRFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkRXZlbnRcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG4gICAgZWRpdEV2ZW50OiAoZXZlbnRJZCwgZXZlbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtldmVudElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNhdmVFdmVudDogKG5ld0V2ZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0V2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudERhdGFNYW5hZ2VyIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZlbnRzL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRMaXN0IGZyb20gXCIuL2V2ZW50cy9ldmVudExpc3RcIlxyXG5pbXBvcnQgZXZlbnRDYXJkIGZyb20gXCIuL2V2ZW50cy9ldmVudENhcmRcIlxyXG5pbXBvcnQgZm9ybUhUTUwgZnJvbSBcIi4vZXZlbnRzL2V2ZW50SFRNTGZvckZvcm1cIlxyXG5pbXBvcnQgc2F2ZUV2ZW50IGZyb20gXCIuL2V2ZW50cy9ldmVudExpc3RlbmVyXCJcclxuXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgcG9zdCA9ICQoXCIjZXZlbnRzX2lucHV0XCIpXHJcblxyXG5cclxuZXZlbnRMaXN0Lmxpc3QoKVxyXG5cclxucG9zdC5pbm5lckhUTUwgKz0gZm9ybUhUTUwoKVxyXG5cclxuXHJcblxyXG5cclxuc2F2ZUV2ZW50KCkiXX0=
