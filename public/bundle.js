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
    <p>${event.eventDate}<p>`;
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
    if (theButton.textContent.startsWith("Save")) {
      const newEvent = {
        eventName: $("#eventName").value,
        userId: $("#userId").value,
        eventLocation: $("#eventLocation").value,
        eventDate: $("#eventDate").value
      };

      _evtDataMgr.default.saveEvent(newEvent);
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
      Headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
  },
  saveEvent: event => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      Headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9lbXB0eUV2ZW50RmllbGRzLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRDYXJkLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybS5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldnREYXRhTWdyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBRXhCLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixLQUFoQixHQUFzQixFQUF0QixFQUNBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLEdBQW1CLEVBRG5CLEVBRUEsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0IsS0FBcEIsR0FBMEIsRUFGMUIsRUFHQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLEtBQWhCLEdBQXNCLEVBSHRCO0FBS0osQ0FQRDs7ZUFTZSxjOzs7Ozs7Ozs7OztBQ1hmLE1BQU0sU0FBUyxHQUFJLEtBQUQsSUFDbEI7QUFDSSxTQUFPO1VBQ0QsS0FBSyxDQUFDLFNBQVU7U0FDakIsS0FBSyxDQUFDLGFBQWM7U0FDcEIsS0FBSyxDQUFDLFNBQVUsS0FIckI7QUFJSCxDQU5EOztlQVFlLFM7Ozs7Ozs7Ozs7QUNUZixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUE7Ozs7Ozs7Ozs7QUFVQSxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBRWYs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LFNBQUwsQ0FBZSxLQUFmO0FBTDhDLEtBQTVDLENBQVo7QUFPSCxHQWhDb0I7QUFpQ3JCLEVBQUEsU0FBUyxFQUFHLEtBQUQsSUFBVztBQUNsQixXQUFPLEtBQUssQ0FBQyw4QkFBRCxFQUFpQztBQUN6QyxNQUFBLE1BQU0sRUFBRSxNQURpQztBQUV6QyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRmdDO0FBS3pDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtBQUxtQyxLQUFqQyxDQUFaO0FBT0g7QUF6Q29CLENBQXpCO2VBNENlLGdCOzs7Ozs7QUM5Q2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGVBQUQsQ0FBZDs7QUFHQSxtQkFBVSxJQUFWOztBQUVBLElBQUksQ0FBQyxTQUFMLElBQWtCLGdDQUFsQjtBQUtBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBjbGVhckV2ZW50Rm9ybSA9ICgpID0+IHtcclxuXHJcbiAgICAgJChcIiNldmVudE5hbWVcIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI3VzZXJJZFwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnRMb2NhdGlvblwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlPVwiXCJcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsZWFyRXZlbnRGb3JtIiwiXHJcbmNvbnN0IGV2ZW50Q2FyZCA9IChldmVudCk9PlxyXG57XHJcbiAgICByZXR1cm5gXHJcbiAgIDxoMj4gJHtldmVudC5ldmVudE5hbWV9PGgyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudENhcmRcclxuIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbi8qXHJcbjEuIE5hbWUgb2YgZXZlbnRcclxuMi4gRGF0ZSBvZiBldmVudFxyXG4zLiBMb2NhdGlvbiBvZiBldmVudFxyXG5cclxuKipHaXZlbioqIGEgdXNlciBoYXMgZW50ZXJlZCBpbiBhbGwgZGV0YWlscyBvZiBhbiBldmVudFxyXG4qKldoZW4qKiB0aGUgdXNlciBwZXJmb3JtcyBhIGdlc3R1cmUgdG8gc2F2ZSB0aGUgZXZlbnRcclxuKipUaGVuKiogdGhlIGV2ZW50IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGFwcGxpY2F0aW9uIGluIHRoZSBgRXZlbnRzYCBjb21wb25lbnRcclxuKi9cclxuXHJcbmNvbnN0IGZvcm1IVE1MID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnRJZFwiIG5hbWU9XCJldmVudElkXCIgdHlwZT1cImhpZGRlblwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VySWRcIiBuYW1lPVwidXNlcklkXCIgdHlwZT1cImhpZGRlblwiPjwvaW5wdXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TmFtZVwiPiBOYW1lIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudE5hbWVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50RGF0ZVwiPiBEYXRlIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudERhdGVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TG9jYXRpb25cIj4gTG9jYXRpb24gb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50TG9jYXRpb25cIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiZXZlbnRGb3JtQWN0aW9uXCI+U2F2ZSBFdmVudDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybUhUTUwiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50Q2FyZCBmcm9tIFwiLi9ldmVudENhcmRcIlxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcblxyXG5jb25zdCBzcG90ID0gJChcIiNldmVudHNfZGlzcGxheVwiKVxyXG4vL2xpc3QgYWxsIGV2ZW50c1xyXG5cclxuY29uc3QgZXZlbnRMaXN0ID0ge1xyXG5cclxuICAgIGxpc3Q6ICgpID0+IHtcclxuICAgICAgICBldmVudERhdGFNYW5hZ2VyLmZldGNoRXZlbnRzKCkudGhlbihcclxuICAgICAgICAgICAgKHBhcnNlZEV2ZW50cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VkRXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwb3QuaW5uZXJIVE1MICs9IGV2ZW50Q2FyZChldmVudClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudExpc3RcclxuLy90aGVuIGNoYW5nZSB0aGUgbGlzdCB0byBzaG93IG9ubHkgdGhvc2UgaXRlbXMgcmVsYXRlZCB0byB0aGUgdXNlciBpZCB0aGF0IGlzIGluIHNlc3Npb24iLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudExpc3RcIlxyXG5pbXBvcnQgY2xlYXJFdmVudEZvcm0gZnJvbSBcIi4vZW1wdHlFdmVudEZpZWxkc1wiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNhdmVFdmVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRoZUJ1dHRvbiA9ICQoXCIjZXZlbnRGb3JtQWN0aW9uXCIpXHJcblxyXG4gICAgdGhlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICh0aGVCdXR0b24udGV4dENvbnRlbnQuc3RhcnRzV2l0aChcIlNhdmVcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAkKFwiI2V2ZW50TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogJChcIiN1c2VySWRcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBldmVudExvY2F0aW9uOiAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBldmVudERhdGU6ICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5zYXZlRXZlbnQobmV3RXZlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2F2ZUV2ZW50IiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGV2ZW50RGF0YU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZmV0Y2hFdmVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJzZWRFdmVudHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkRXZlbnRzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0RXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihldmVudHMgPT4gZXZlbnRzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4ocGFyc2VkRXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEV2ZW50XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuICAgIGVkaXRFdmVudDogKGV2ZW50SWQsIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgSGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzYXZlRXZlbnQ6IChldmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBIZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnREYXRhTWFuYWdlciIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudHMvZXZlbnRMaXN0XCJcclxuaW1wb3J0IGV2ZW50Q2FyZCBmcm9tIFwiLi9ldmVudHMvZXZlbnRDYXJkXCJcclxuaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtXCJcclxuaW1wb3J0IHNhdmVFdmVudCBmcm9tIFwiLi9ldmVudHMvZXZlbnRMaXN0ZW5lclwiXHJcblxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IHBvc3QgPSAkKFwiI2V2ZW50c19pbnB1dFwiKVxyXG5cclxuXHJcbmV2ZW50TGlzdC5saXN0KClcclxuXHJcbnBvc3QuaW5uZXJIVE1MICs9IGZvcm1IVE1MKClcclxuXHJcblxyXG5cclxuXHJcbnNhdmVFdmVudCgpIl19
