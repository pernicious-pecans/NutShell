(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
  post.innerHTML = _eventHTMLforForm.default;
};

var _default = formFunctions;
exports.default = _default;

},{"./eventHTMLforForm":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

var _eventForm = _interopRequireDefault(require("./eventForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

},{"./eventForm":2,"./evtDataMgr":5}],4:[function(require,module,exports){
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

},{"./eventCard":1,"./evtDataMgr":5}],5:[function(require,module,exports){
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
    return fetch(`http://localhost:8088/events"/${eventId}`, {
      method: "DELETE"
    });
  },
  getEvent: eventId => {
    return fetch(`http://localhost:8088/events"/${eventId}`).then(events => events.json()).then(parsedEvent => {
      return parsedEvent;
    });
  },
  editEvent: (eventId, event) => {
    return fetch(`http://localhost:8088/events"/${eventId}`, {
      method: "PUT",
      Headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
  }
};
var _default = eventDataManager;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

var _evtDataMgr = _interopRequireDefault(require("./events/evtDataMgr"));

var _eventList = _interopRequireDefault(require("./events/eventList"));

var _eventCard = _interopRequireDefault(require("./events/eventCard"));

var _eventForm = _interopRequireDefault(require("./events/eventForm"));

var _eventHTMLforForm = _interopRequireDefault(require("./events/eventHTMLforForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const post = $("#events_input");

_eventList.default.list();

post.innerHTML += (0, _eventHTMLforForm.default)();

},{"./events/eventCard":1,"./events/eventForm":2,"./events/eventHTMLforForm":3,"./events/eventList":4,"./events/evtDataMgr":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudENhcmQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEZvcm0uanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZ0RGF0YU1nci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNDQSxNQUFNLFNBQVMsR0FBSSxLQUFELElBQ2xCO0FBQ0ksU0FBTztVQUNELEtBQUssQ0FBQyxTQUFVO1NBQ2pCLEtBQUssQ0FBQyxhQUFjO1NBQ3BCLEtBQUssQ0FBQyxTQUFVLEtBSHJCO0FBSUgsQ0FORDs7ZUFRZSxTOzs7Ozs7Ozs7OztBQ1RmOzs7O0FBR0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUNBLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxlQUFELENBQWQ7O0FBRUEsTUFBTSxhQUFhLEdBQUcsTUFBTTtBQUU1QixFQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLHlCQUFqQjtBQUVDLENBSkQ7O2VBTWUsYTs7Ozs7Ozs7Ozs7QUNaZjs7QUFDQTs7OztBQUNBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFFQTs7Ozs7Ozs7OztBQVVBLE1BQU0sUUFBUSxHQUFHLE1BQU07QUFFZixTQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBQVI7QUF1QkgsQ0F6Qkw7O2VBMkJlLFE7Ozs7Ozs7Ozs7O0FDekNmOztBQUNBOzs7O0FBRUEsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUdBLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxpQkFBRCxDQUFkLEMsQ0FDQTs7QUFFQSxNQUFNLFNBQVMsR0FBRztBQUVkLEVBQUEsSUFBSSxFQUFFLE1BQU07QUFDUix3QkFBaUIsV0FBakIsR0FBK0IsSUFBL0IsQ0FDSyxZQUFELElBQWtCO0FBQ2QsTUFBQSxZQUFZLENBQUMsT0FBYixDQUFxQixLQUFLLElBQUk7QUFDMUIsUUFBQSxJQUFJLENBQUMsU0FBTCxJQUFrQix3QkFBVSxLQUFWLENBQWxCO0FBQ0gsT0FGRDtBQUdILEtBTEw7QUFPSDtBQVZhLENBQWxCO2VBYWUsUyxFQUNmOzs7Ozs7Ozs7OztBQ3ZCQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsTUFBTSxnQkFBZ0IsR0FBRztBQUVyQixFQUFBLFdBQVcsRUFBRSxNQUFNO0FBQ2YsV0FBTyxLQUFLLENBQUMsOEJBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixFQUdGLElBSEUsQ0FHRyxZQUFZLElBQUk7QUFDbEIsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVo7QUFDQSxhQUFPLFlBQVA7QUFDSCxLQU5FLENBQVA7QUFPSCxHQVZvQjtBQVdyQixFQUFBLFdBQVcsRUFBRyxPQUFELElBQWE7QUFDdEIsV0FBTyxLQUFLLENBQUUsaUNBQWdDLE9BQVEsRUFBMUMsRUFBNkM7QUFDckQsTUFBQSxNQUFNLEVBQUU7QUFENkMsS0FBN0MsQ0FBWjtBQUdILEdBZm9CO0FBZ0JyQixFQUFBLFFBQVEsRUFBRyxPQUFELElBQWE7QUFDbkIsV0FBTyxLQUFLLENBQUUsaUNBQWdDLE9BQVEsRUFBMUMsQ0FBTCxDQUNGLElBREUsQ0FDRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQVAsRUFEYixFQUVGLElBRkUsQ0FFRyxXQUFXLElBQUk7QUFDakIsYUFBTyxXQUFQO0FBQ0gsS0FKRSxDQUFQO0FBTUgsR0F2Qm9CO0FBd0JyQixFQUFBLFNBQVMsRUFBRSxDQUFDLE9BQUQsRUFBVSxLQUFWLEtBQW9CO0FBQzNCLFdBQU8sS0FBSyxDQUFFLGlDQUFnQyxPQUFRLEVBQTFDLEVBQTZDO0FBQ3JELE1BQUEsTUFBTSxFQUFFLEtBRDZDO0FBRXJELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGNEM7QUFLckQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTCtDLEtBQTdDLENBQVo7QUFPSDtBQWhDb0IsQ0FBekI7ZUFtQ2UsZ0I7Ozs7OztBQ3JDZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFJQSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsZUFBRCxDQUFkOztBQUdBLG1CQUFVLElBQVY7O0FBR0EsSUFBSSxDQUFDLFNBQUwsSUFBa0IsZ0NBQWxCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmNvbnN0IGV2ZW50Q2FyZCA9IChldmVudCk9PlxyXG57XHJcbiAgICByZXR1cm5gXHJcbiAgIDxoMj4gJHtldmVudC5ldmVudE5hbWV9PGgyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudENhcmRcclxuIiwiaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50SFRNTGZvckZvcm1cIlxyXG5cclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcbmNvbnN0IHBvc3QgPSAkKFwiI2V2ZW50c19pbnB1dFwiKVxyXG5cclxuY29uc3QgZm9ybUZ1bmN0aW9ucyA9ICgpID0+IHtcclxuXHJcbnBvc3QuaW5uZXJIVE1MID0gZm9ybUhUTUxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1GdW5jdGlvbnNcclxuIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBmb3JtRnVuY3Rpb25zIGZyb20gXCIuL2V2ZW50Rm9ybVwiXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG4vKlxyXG4xLiBOYW1lIG9mIGV2ZW50XHJcbjIuIERhdGUgb2YgZXZlbnRcclxuMy4gTG9jYXRpb24gb2YgZXZlbnRcclxuXHJcbioqR2l2ZW4qKiBhIHVzZXIgaGFzIGVudGVyZWQgaW4gYWxsIGRldGFpbHMgb2YgYW4gZXZlbnRcclxuKipXaGVuKiogdGhlIHVzZXIgcGVyZm9ybXMgYSBnZXN0dXJlIHRvIHNhdmUgdGhlIGV2ZW50XHJcbioqVGhlbioqIHRoZSBldmVudCBzaG91bGQgYmUgZGlzcGxheWVkIGluIHRoZSBhcHBsaWNhdGlvbiBpbiB0aGUgYEV2ZW50c2AgY29tcG9uZW50XHJcbiovXHJcblxyXG5jb25zdCBmb3JtSFRNTCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50SWRcIiBuYW1lPVwiZXZlbnRJZFwiIHR5cGU9XCJoaWRkZW5cIj48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwidXNlcklkXCIgbmFtZT1cInVzZXJJZFwiIHR5cGU9XCJoaWRkZW5cIj48L2lucHV0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudE5hbWVcIj4gTmFtZSBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnROYW1lXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudERhdGVcIj4gRGF0ZSBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnREYXRlXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJldmVudExvY2F0aW9uXCI+IExvY2F0aW9uIG9mIEV2ZW50IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudExvY2F0aW9uXCIgdHlwZT1cInRleHRcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImV2ZW50Rm9ybUFjdGlvblwiPlNhdmUgRXZlbnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1IVE1MIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRDYXJkXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5cclxuY29uc3Qgc3BvdCA9ICQoXCIjZXZlbnRzX2Rpc3BsYXlcIilcclxuLy9saXN0IGFsbCBldmVudHNcclxuXHJcbmNvbnN0IGV2ZW50TGlzdCA9IHtcclxuXHJcbiAgICBsaXN0OiAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnREYXRhTWFuYWdlci5mZXRjaEV2ZW50cygpLnRoZW4oXHJcbiAgICAgICAgICAgIChwYXJzZWRFdmVudHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnNlZEV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzcG90LmlubmVySFRNTCArPSBldmVudENhcmQoZXZlbnQpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRMaXN0XHJcbi8vdGhlbiBjaGFuZ2UgdGhlIGxpc3QgdG8gc2hvdyBvbmx5IHRob3NlIGl0ZW1zIHJlbGF0ZWQgdG8gdGhlIHVzZXIgaWQgdGhhdCBpcyBpbiBzZXNzaW9uIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGV2ZW50RGF0YU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZmV0Y2hFdmVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJzZWRFdmVudHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkRXZlbnRzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIvJHtldmVudElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIi8ke2V2ZW50SWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZXZlbnRzID0+IGV2ZW50cy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRFdmVudFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBlZGl0RXZlbnQ6IChldmVudElkLCBldmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgSGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RGF0YU1hbmFnZXIiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50Q2FyZFwiXHJcbmltcG9ydCBmb3JtRnVuY3Rpb25zIGZyb20gXCIuL2V2ZW50cy9ldmVudEZvcm1cIjtcclxuaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5cclxuXHJcbmNvbnN0IHBvc3QgPSAkKFwiI2V2ZW50c19pbnB1dFwiKVxyXG5cclxuXHJcbmV2ZW50TGlzdC5saXN0KClcclxuXHJcblxyXG5wb3N0LmlubmVySFRNTCArPSBmb3JtSFRNTCgpIl19
