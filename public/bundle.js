(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventCard = event => {
  return `
   <h2> ${event.eventName}<h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>`;
};

var _default = eventCard;
exports.default = _default;

},{"./evtDataMgr":6}],2:[function(require,module,exports){
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
  seeForm: () => {
    post.innerHTML = (0, _eventHTMLforForm.default)();
  };
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

},{"./eventForm":2,"./evtDataMgr":6}],4:[function(require,module,exports){
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

},{"./eventCard":1,"./evtDataMgr":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evtDataMgr = _interopRequireDefault(require("./evtDataMgr"));

var _eventList = _interopRequireDefault(require("./eventList"));

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

      _evtDataMgr.default.saveEvent(newEvent).then(() => {
        //empty form fields
        // repupulate eventList()
        console.log("it listened.");
      });
    }
  });
};

var _default = saveEvent;
exports.default = _default;

},{"./eventList":4,"./evtDataMgr":6}],6:[function(require,module,exports){
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

},{"./events/eventCard":1,"./events/eventHTMLforForm":3,"./events/eventList":4,"./events/eventListener":5,"./events/evtDataMgr":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudENhcmQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEZvcm0uanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRMaXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2dERhdGFNZ3IuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFFQSxNQUFNLFNBQVMsR0FBSSxLQUFELElBQ2xCO0FBQ0ksU0FBTztVQUNELEtBQUssQ0FBQyxTQUFVO1NBQ2pCLEtBQUssQ0FBQyxhQUFjO1NBQ3BCLEtBQUssQ0FBQyxTQUFVLEtBSHJCO0FBSUgsQ0FORDs7ZUFRZSxTOzs7Ozs7Ozs7OztBQ1ZmOzs7O0FBR0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUNBLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxlQUFELENBQWQ7O0FBRUEsTUFBTSxhQUFhLEdBQUcsTUFBTTtBQUV4QixFQUFBLE9BQU8sRUFBRSxNQUFNO0FBQ1YsSUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixnQ0FBakI7QUFFSixHQUhRO0FBSVosQ0FORDs7ZUFPZSxhOzs7Ozs7Ozs7OztBQ2JmOztBQUNBOzs7O0FBQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjtBQUVBOzs7Ozs7Ozs7O0FBVUEsTUFBTSxRQUFRLEdBQUcsTUFBTTtBQUVmLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FBUjtBQXVCSCxDQXpCTDs7ZUEyQmUsUTs7Ozs7Ozs7Ozs7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RSxJQUFJLENBQUMsU0FBTCxDQUFlLEtBQWY7QUFMOEMsS0FBNUMsQ0FBWjtBQU9ILEdBaENvQjtBQWlDckIsRUFBQSxTQUFTLEVBQUcsS0FBRCxJQUFXO0FBQ2xCLFdBQU8sS0FBSyxDQUFDLDhCQUFELEVBQWlDO0FBQ3pDLE1BQUEsTUFBTSxFQUFFLE1BRGlDO0FBRXpDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGZ0M7QUFLekMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTG1DLEtBQWpDLENBQVo7QUFPSDtBQXpDb0IsQ0FBekI7ZUE0Q2UsZ0I7Ozs7OztBQzlDZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFFQSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsZUFBRCxDQUFkOztBQUdBLG1CQUFVLElBQVY7O0FBRUEsSUFBSSxDQUFDLFNBQUwsSUFBa0IsZ0NBQWxCO0FBS0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldnREYXRhTWdyXCJcclxuXHJcbmNvbnN0IGV2ZW50Q2FyZCA9IChldmVudCk9PlxyXG57XHJcbiAgICByZXR1cm5gXHJcbiAgIDxoMj4gJHtldmVudC5ldmVudE5hbWV9PGgyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudENhcmRcclxuIiwiaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50SFRNTGZvckZvcm1cIlxyXG5cclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcbmNvbnN0IHBvc3QgPSAkKFwiI2V2ZW50c19pbnB1dFwiKVxyXG5cclxuY29uc3QgZm9ybUZ1bmN0aW9ucyA9ICgpID0+IHtcclxuXHJcbiAgICBzZWVGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgIHBvc3QuaW5uZXJIVE1MID0gZm9ybUhUTUwoKVxyXG5cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBmb3JtRnVuY3Rpb25zXHJcbiIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZm9ybUZ1bmN0aW9ucyBmcm9tIFwiLi9ldmVudEZvcm1cIlxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuLypcclxuMS4gTmFtZSBvZiBldmVudFxyXG4yLiBEYXRlIG9mIGV2ZW50XHJcbjMuIExvY2F0aW9uIG9mIGV2ZW50XHJcblxyXG4qKkdpdmVuKiogYSB1c2VyIGhhcyBlbnRlcmVkIGluIGFsbCBkZXRhaWxzIG9mIGFuIGV2ZW50XHJcbioqV2hlbioqIHRoZSB1c2VyIHBlcmZvcm1zIGEgZ2VzdHVyZSB0byBzYXZlIHRoZSBldmVudFxyXG4qKlRoZW4qKiB0aGUgZXZlbnQgc2hvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYXBwbGljYXRpb24gaW4gdGhlIGBFdmVudHNgIGNvbXBvbmVudFxyXG4qL1xyXG5cclxuY29uc3QgZm9ybUhUTUwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudElkXCIgbmFtZT1cImV2ZW50SWRcIiB0eXBlPVwiaGlkZGVuXCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJJZFwiIG5hbWU9XCJ1c2VySWRcIiB0eXBlPVwiaGlkZGVuXCI+PC9pbnB1dD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnROYW1lXCI+IE5hbWUgb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50TmFtZVwiIHR5cGU9XCJ0ZXh0XCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnREYXRlXCI+IERhdGUgb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50RGF0ZVwiIHR5cGU9XCJ0ZXh0XCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnRMb2NhdGlvblwiPiBMb2NhdGlvbiBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnRMb2NhdGlvblwiIHR5cGU9XCJ0ZXh0XCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJldmVudEZvcm1BY3Rpb25cIj5TYXZlIEV2ZW50PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtSFRNTCIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRDYXJkIGZyb20gXCIuL2V2ZW50Q2FyZFwiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNwb3QgPSAkKFwiI2V2ZW50c19kaXNwbGF5XCIpXHJcbi8vbGlzdCBhbGwgZXZlbnRzXHJcblxyXG5jb25zdCBldmVudExpc3QgPSB7XHJcblxyXG4gICAgbGlzdDogKCkgPT4ge1xyXG4gICAgICAgIGV2ZW50RGF0YU1hbmFnZXIuZmV0Y2hFdmVudHMoKS50aGVuKFxyXG4gICAgICAgICAgICAocGFyc2VkRXZlbnRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWRFdmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BvdC5pbm5lckhUTUwgKz0gZXZlbnRDYXJkKGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50TGlzdFxyXG4vL3RoZW4gY2hhbmdlIHRoZSBsaXN0IHRvIHNob3cgb25seSB0aG9zZSBpdGVtcyByZWxhdGVkIHRvIHRoZSB1c2VyIGlkIHRoYXQgaXMgaW4gc2Vzc2lvbiIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRMaXN0IGZyb20gXCIuL2V2ZW50TGlzdFwiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNhdmVFdmVudCA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCB0aGVCdXR0b24gPSAkKFwiI2V2ZW50Rm9ybUFjdGlvblwiKVxyXG4gICAgdGhlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmKHRoZUJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiU2F2ZVwiKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAkKFwiI2V2ZW50TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogJChcIiN1c2VySWRcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBldmVudExvY2F0aW9uOiAkKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBldmVudERhdGU6ICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnREYXRhTWFuYWdlci5zYXZlRXZlbnQobmV3RXZlbnQpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgLy9lbXB0eSBmb3JtIGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcHVwdWxhdGUgZXZlbnRMaXN0KClcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IGxpc3RlbmVkLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNhdmVFdmVudCIsImNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBldmVudERhdGFNYW5hZ2VyID0ge1xyXG5cclxuICAgIGZldGNoRXZlbnRzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4gICAgICAgICAgICAudGhlbihSZXNwb25zZSA9PiBSZXNwb25zZS5qc29uKCkpXHJcblxyXG4gICAgICAgICAgICAudGhlbihwYXJzZWRFdmVudHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VkRXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEV2ZW50c1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUV2ZW50OiAoZXZlbnRJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdldEV2ZW50OiAoZXZlbnRJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YClcclxuICAgICAgICAgICAgLnRoZW4oZXZlbnRzID0+IGV2ZW50cy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRFdmVudFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBlZGl0RXZlbnQ6IChldmVudElkLCBldmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50cy8ke2V2ZW50SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIEhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZUV2ZW50OiAoZXZlbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgSGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RGF0YU1hbmFnZXIiLCJpbXBvcnQgZXZlbnREYXRhTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvZXZ0RGF0YU1nclwiXHJcbmltcG9ydCBldmVudExpc3QgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBldmVudENhcmQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50Q2FyZFwiXHJcbmltcG9ydCBmb3JtSFRNTCBmcm9tIFwiLi9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybVwiXHJcbmltcG9ydCBzYXZlRXZlbnQgZnJvbSBcIi4vZXZlbnRzL2V2ZW50TGlzdGVuZXJcIlxyXG5cclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBwb3N0ID0gJChcIiNldmVudHNfaW5wdXRcIilcclxuXHJcblxyXG5ldmVudExpc3QubGlzdCgpXHJcblxyXG5wb3N0LmlubmVySFRNTCArPSBmb3JtSFRNTCgpXHJcblxyXG5cclxuXHJcblxyXG5zYXZlRXZlbnQoKSJdfQ==
