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
    <section>
   <h2>${event.eventName}</h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>
    <button id='delete--event--${event.id}'>Edit <strong>${event.eventName}</strong> Event </button>
    <button id='edit--event--${event.id}'>Delete <strong> ${event.eventName}</strong> Event</button>
    </section>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9lbXB0eUV2ZW50RmllbGRzLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRDYXJkLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybS5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldnREYXRhTWdyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBRXhCLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixLQUFoQixHQUFzQixFQUF0QixFQUNBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLEdBQW1CLEVBRG5CLEVBRUEsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0IsS0FBcEIsR0FBMEIsRUFGMUIsRUFHQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLEtBQWhCLEdBQXNCLEVBSHRCO0FBS0osQ0FQRDs7ZUFTZSxjOzs7Ozs7Ozs7OztBQ1hmLE1BQU0sU0FBUyxHQUFJLEtBQUQsSUFDbEI7QUFDSSxTQUFPOztTQUVGLEtBQUssQ0FBQyxTQUFVO1NBQ2hCLEtBQUssQ0FBQyxhQUFjO1NBQ3BCLEtBQUssQ0FBQyxTQUFVO2lDQUNRLEtBQUssQ0FBQyxFQUFHLGtCQUFpQixLQUFLLENBQUMsU0FBVTsrQkFDNUMsS0FBSyxDQUFDLEVBQUcscUJBQW9CLEtBQUssQ0FBQyxTQUFVOztLQU54RTtBQVNILENBWEQ7O2VBYWUsUzs7Ozs7Ozs7OztBQ2RmLE1BQU0sQ0FBQyxHQUFH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QUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUVBLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxlQUFELENBQWQ7O0FBR0EsbUJBQVUsSUFBVjs7QUFFQSxJQUFJLENBQUMsU0FBTCxJQUFrQixnQ0FBbEI7QUFLQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgY2xlYXJFdmVudEZvcm0gPSAoKSA9PiB7XHJcblxyXG4gICAgICQoXCIjZXZlbnROYW1lXCIpLnZhbHVlPVwiXCIsXHJcbiAgICAgJChcIiN1c2VySWRcIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI2V2ZW50RGF0ZVwiKS52YWx1ZT1cIlwiXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckV2ZW50Rm9ybSIsIlxyXG5jb25zdCBldmVudENhcmQgPSAoZXZlbnQpPT5cclxue1xyXG4gICAgcmV0dXJuYFxyXG4gICAgPHNlY3Rpb24+XHJcbiAgIDxoMj4ke2V2ZW50LmV2ZW50TmFtZX08L2gyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+XHJcbiAgICA8YnV0dG9uIGlkPSdkZWxldGUtLWV2ZW50LS0ke2V2ZW50LmlkfSc+RWRpdCA8c3Ryb25nPiR7ZXZlbnQuZXZlbnROYW1lfTwvc3Ryb25nPiBFdmVudCA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gaWQ9J2VkaXQtLWV2ZW50LS0ke2V2ZW50LmlkfSc+RGVsZXRlIDxzdHJvbmc+ICR7ZXZlbnQuZXZlbnROYW1lfTwvc3Ryb25nPiBFdmVudDwvYnV0dG9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudENhcmRcclxuIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbi8qXHJcbjEuIE5hbWUgb2YgZXZlbnRcclxuMi4gRGF0ZSBvZiBldmVudFxyXG4zLiBMb2NhdGlvbiBvZiBldmVudFxyXG5cclxuKipHaXZlbioqIGEgdXNlciBoYXMgZW50ZXJlZCBpbiBhbGwgZGV0YWlscyBvZiBhbiBldmVudFxyXG4qKldoZW4qKiB0aGUgdXNlciBwZXJmb3JtcyBhIGdlc3R1cmUgdG8gc2F2ZSB0aGUgZXZlbnRcclxuKipUaGVuKiogdGhlIGV2ZW50IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGFwcGxpY2F0aW9uIGluIHRoZSBgRXZlbnRzYCBjb21wb25lbnRcclxuKi9cclxuXHJcbmNvbnN0IGZvcm1IVE1MID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnRJZFwiIG5hbWU9XCJldmVudElkXCIgdHlwZT1cImhpZGRlblwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VySWRcIiBuYW1lPVwidXNlcklkXCIgdHlwZT1cImhpZGRlblwiPjwvaW5wdXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TmFtZVwiPiBOYW1lIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudE5hbWVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50RGF0ZVwiPiBEYXRlIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudERhdGVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImV2ZW50TG9jYXRpb25cIj4gTG9jYXRpb24gb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50TG9jYXRpb25cIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiZXZlbnRGb3JtQWN0aW9uXCI+U2F2ZSBFdmVudDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybUhUTUwiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50Q2FyZCBmcm9tIFwiLi9ldmVudENhcmRcIlxyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcblxyXG5jb25zdCBzcG90ID0gJChcIiNldmVudHNfZGlzcGxheVwiKVxyXG4vL2xpc3QgYWxsIGV2ZW50c1xyXG5cclxuY29uc3QgZXZlbnRMaXN0ID0ge1xyXG5cclxuICAgIGxpc3Q6ICgpID0+IHtcclxuICAgICAgICBldmVudERhdGFNYW5hZ2VyLmZldGNoRXZlbnRzKCkudGhlbihcclxuICAgICAgICAgICAgKHBhcnNlZEV2ZW50cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VkRXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwb3QuaW5uZXJIVE1MICs9IGV2ZW50Q2FyZChldmVudClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudExpc3RcclxuLy90aGVuIGNoYW5nZSB0aGUgbGlzdCB0byBzaG93IG9ubHkgdGhvc2UgaXRlbXMgcmVsYXRlZCB0byB0aGUgdXNlciBpZCB0aGF0IGlzIGluIHNlc3Npb24iLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudExpc3RcIlxyXG5pbXBvcnQgY2xlYXJFdmVudEZvcm0gZnJvbSBcIi4vZW1wdHlFdmVudEZpZWxkc1wiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNhdmVFdmVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRoZUJ1dHRvbiA9ICQoXCIjZXZlbnRGb3JtQWN0aW9uXCIpXHJcblxyXG4gICAgdGhlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xyXG4gICAgICAgICAgICB1c2VySWQ6ICQoXCIjdXNlcklkXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6ICQoXCIjZXZlbnROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudERhdGU6ICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICBldmVudExvY2F0aW9uOiAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoZUJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiU2F2ZVwiKSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IGV2ZW50OlwiLCBuZXdFdmVudClcclxuXHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RXZlbnQpXHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKGNsZWFyRXZlbnRGb3JtKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhlQnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoXCJVcGRhdGVcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RXZlbnQpXHJcbiAgICAgICAgICAgIH0pLnRoZW4oY2xlYXJFdmVudEZvcm0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNhdmVFdmVudCIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBldmVudERhdGFNYW5hZ2VyID0ge1xyXG5cclxuICAgIGZldGNoRXZlbnRzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4gICAgICAgICAgICAudGhlbihSZXNwb25zZSA9PiBSZXNwb25zZS5qc29uKCkpXHJcblxyXG4gICAgICAgICAgICAudGhlbihwYXJzZWRFdmVudHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VkRXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEV2ZW50c1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUV2ZW50OiAoZXZlbnRJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdldEV2ZW50OiAoZXZlbnRJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZXZlbnRzID0+IGV2ZW50cy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRFdmVudFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBlZGl0RXZlbnQ6IChldmVudElkLCBldmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZUV2ZW50OiAobmV3RXZlbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RGF0YU1hbmFnZXIiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50Q2FyZFwiXHJcbmltcG9ydCBmb3JtSFRNTCBmcm9tIFwiLi9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybVwiXHJcbmltcG9ydCBzYXZlRXZlbnQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdGVuZXJcIlxyXG5cclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBwb3N0ID0gJChcIiNldmVudHNfaW5wdXRcIilcclxuXHJcblxyXG5ldmVudExpc3QubGlzdCgpXHJcblxyXG5wb3N0LmlubmVySFRNTCArPSBmb3JtSFRNTCgpXHJcblxyXG5cclxuXHJcblxyXG5zYXZlRXZlbnQoKSJdfQ==
