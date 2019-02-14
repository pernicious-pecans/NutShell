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

},{"./eventCard":1,"./evtDataMgr":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

var _evtDataMgr = _interopRequireDefault(require("./events/evtDataMgr"));

var _eventList = _interopRequireDefault(require("./events/eventList"));

var _eventCard = _interopRequireDefault(require("./events/eventCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eventDataManager.fetchEvents()
_eventList.default.list();

},{"./events/eventCard":1,"./events/eventList":2,"./events/evtDataMgr":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudENhcmQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudExpc3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldnREYXRhTWdyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0NBLE1BQU0sU0FBUyxHQUFJLEtBQUQsSUFDbEI7QUFDSSxTQUFPO1VBQ0QsS0FBSyxDQUFDLFNBQVU7U0FDakIsS0FBSyxDQUFDLGFBQWM7U0FDcEIsS0FBSyxDQUFDLFNBQVUsS0FIckI7QUFJSCxDQU5EOztlQVFlLFM7Ozs7Ozs7Ozs7O0FDVGY7O0FBQ0E7Ozs7QUFDQSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBR0EsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGlCQUFELENBQWQsQyxDQUNBOztBQUVBLE1BQU0sU0FBUyxHQUFHO0FBRWQsRUFBQSxJQUFJLEVBQUUsTUFBTTtBQUNSLHdCQUFpQixXQUFqQixHQUErQixJQUEvQixDQUNLLFlBQUQsSUFBa0I7QUFDZCxNQUFBLFlBQVksQ0FBQyxPQUFiLENBQXFCLEtBQUssSUFBSTtBQUMxQixRQUFBLElBQUksQ0FBQyxTQUFMLElBQWtCLHdCQUFVLEtBQVYsQ0FBbEI7QUFDSCxPQUZEO0FBR0gsS0FMTDtBQU9IO0FBVmEsQ0FBbEI7ZUFjZSxTLEVBQ2Y7Ozs7Ozs7Ozs7O0FDdkJBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFFQSxNQUFNLGdCQUFnQixHQUFHO0FBRXJCLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDZixXQUFPLEtBQUssQ0FBQyw4QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLEVBR0YsSUFIRSxDQUdHLFlBQVksSUFBSTtBQUNsQixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWjtBQUNBLGFBQU8sWUFBUDtBQUNILEtBTkUsQ0FBUDtBQU9ILEdBVm9CO0FBV3JCLEVBQUEsV0FBVyxFQUFHLE9BQUQsSUFBYTtBQUN0QixXQUFPLEtBQUssQ0FBRSxpQ0FBZ0MsT0FBUSxFQUExQyxFQUE2QztBQUNyRCxNQUFBLE1BQU0sRUFBRTtBQUQ2QyxLQUE3QyxDQUFaO0FBR0gsR0Fmb0I7QUFnQnJCLEVBQUEsUUFBUSxFQUFHLE9BQUQsSUFBYTtBQUNuQixXQUFPLEtBQUssQ0FBRSxpQ0FBZ0MsT0FBUSxFQUExQyxDQUFMLENBQ0YsSUFERSxDQUNHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBUCxFQURiLEVBRUYsSUFGRSxDQUVHLFdBQVcsSUFBSTtBQUNqQixhQUFPLFdBQVA7QUFDSCxLQUpFLENBQVA7QUFNSCxHQXZCb0I7QUF3QnJCLEVBQUEsU0FBUyxFQUFFLENBQUMsT0FBRCxFQUFVLEtBQVYsS0FBb0I7QUFDM0IsV0FBTyxLQUFLLENBQUUsaUNBQWdDLE9BQVEsRUFBMUMsRUFBNkM7QUFDckQsTUFBQSxNQUFNLEVBQUUsS0FENkM7QUFFckQsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUY0QztBQUtyRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLEtBQWY7QUFMK0MsS0FBN0MsQ0FBWjtBQU9IO0FBaENvQixDQUF6QjtlQW1DZSxnQjs7Ozs7O0FDckNmOztBQUNBOztBQUNBOzs7O0FBR0E7QUFDQSxtQkFBVSxJQUFWIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmNvbnN0IGV2ZW50Q2FyZCA9IChldmVudCk9PlxyXG57XHJcbiAgICByZXR1cm5gXHJcbiAgIDxoMj4gJHtldmVudC5ldmVudE5hbWV9PGgyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudENhcmRcclxuIiwiaW1wb3J0IGV2ZW50RGF0YU1hbmFnZXIgZnJvbSBcIi4vZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRDYXJkXCJcclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcblxyXG5jb25zdCBzcG90ID0gJChcIiNldmVudHNfZGlzcGxheVwiKVxyXG4vL2xpc3QgYWxsIGV2ZW50c1xyXG5cclxuY29uc3QgZXZlbnRMaXN0ID0ge1xyXG5cclxuICAgIGxpc3Q6ICgpID0+IHtcclxuICAgICAgICBldmVudERhdGFNYW5hZ2VyLmZldGNoRXZlbnRzKCkudGhlbihcclxuICAgICAgICAgICAgKHBhcnNlZEV2ZW50cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VkRXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwb3QuaW5uZXJIVE1MICs9IGV2ZW50Q2FyZChldmVudClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRMaXN0XHJcbi8vdGhlbiBjaGFuZ2UgdGhlIGxpc3QgdG8gc2hvdyBvbmx5IHRob3NlIGl0ZW1zIHJlbGF0ZWQgdG8gdGhlIHVzZXIgaWQgdGhhdCBpcyBpbiBzZXNzaW9uIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGV2ZW50RGF0YU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZmV0Y2hFdmVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJzZWRFdmVudHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkRXZlbnRzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIvJHtldmVudElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRFdmVudDogKGV2ZW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIi8ke2V2ZW50SWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZXZlbnRzID0+IGV2ZW50cy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRFdmVudFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBlZGl0RXZlbnQ6IChldmVudElkLCBldmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgSGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RGF0YU1hbmFnZXIiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50Q2FyZFwiXHJcblxyXG5cclxuLy8gZXZlbnREYXRhTWFuYWdlci5mZXRjaEV2ZW50cygpXHJcbmV2ZW50TGlzdC5saXN0KClcclxuIl19
