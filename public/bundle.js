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

var _taskForm = _interopRequireDefault(require("./tasks/taskForm"));

var _taskList = _interopRequireDefault(require("./tasks/taskList"));

var _taskListener = _interopRequireDefault(require("./tasks/taskListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
const $ = document.querySelector.bind(document);
const post = $("#events_input");

_eventList.default.list();

post.innerHTML += (0, _eventHTMLforForm.default)();
(0, _taskForm.default)();
(0, _eventListener.default)();

_taskList.default.taskList();

(0, _taskListener.default)();

},{"./events/eventCard":2,"./events/eventHTMLforForm":3,"./events/eventList":4,"./events/eventListener":5,"./events/evtDataMgr":6,"./tasks/taskForm":10,"./tasks/taskList":12,"./tasks/taskListener":13}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const taskCard = task => {
  return `
  <h2> ${task.taskName}<h2>
    <p>${task.taskCompletionDate}<p>
    <button id='delete--task--${task.id}'>Delete ${task.taskName} </button>
    <button id='edit--task--${task.id}'>Delete ${task.taskName} </button>
    <div>
  <input type="checkbox" id="tasks" name="tasks">
  <label for="tasks">Completed</label>
</div>
  `;
};

var _default = taskCard;
exports.default = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const taskDataManager = {
  // Complete Fetch of all tasks
  fetchTasks: () => {
    return fetch("http://localhost:8088/tasks").then(Return => Return.json()).then(parsedTasks => {
      console.log(parsedTasks);
      return parsedTasks;
    });
  },
  // Delete task by ID
  deleteTask: taskId => {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: "DELETE"
    });
  },
  // Get (retrieve) single task by ID
  getTask: taskId => {
    return fetch(`http://localhost:8088/tasks/${taskId}`).then(tasks => tasks.json()).then(parsedTask => {
      return parsedTask;
    });
  },
  // Put updated task back to json by taskID
  editTask: (taskId, task) => {
    return fetch(`http://localhost:8088/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
  },
  // Post a newTask to json and assign an ID
  saveTask: newTask => {
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });
  }
};
var _default = taskDataManager;
exports.default = _default;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskFormHTML = _interopRequireDefault(require("./taskFormHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);
const post = $("#tasks_input");

const taskFunctions = () => {
  post.innerHTML = (0, _taskFormHTML.default)();
};

var _default = taskFunctions;
exports.default = _default;

},{"./taskFormHTML":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const taskFormHTML = () => {
  return `

<section>
    <input id="taskId" name="taskId"></input>
    <input id="userId" name="userId"></input>
</section>

<fieldset>
    <label class="label" for="taskName">Name of Task</label>
    <input id="taskName" type="text"></input>
    </fieldset>
    
    <fieldset>
    <label class="label" for="taskCompleteDate">Complete Date</label>
    <input id="taskCompleteDate" type="text"></input>
    </fieldset>
    
    <fieldset>
    <label class="label" for="taskCheckBox">Completed</label>
    <input id="taskCheckBox" type="checkbox"></input>
</fieldset>

<button id="enterTask">Enter Task</button>
`;
};

var _default = taskFormHTML;
exports.default = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskDataManager = _interopRequireDefault(require("./taskDataManager"));

var _taskCard = _interopRequireDefault(require("./taskCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import
//
// display all tasks
const taskSpot = document.querySelector("#tasks_display");
const taskList = {
  taskList: () => {
    _taskDataManager.default.fetchTasks().then(parsedTasks => {
      taskSpot.innerHTML = "";
      parsedTasks.forEach(task => {
        taskSpot.innerHTML += (0, _taskCard.default)(task);
      });
    });
  } // Export

};
var _default = taskList; //

exports.default = _default;

},{"./taskCard":8,"./taskDataManager":9}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const $ = document.querySelector.bind(document);

const enterTask = () => {
  const taskButton = $("#enterTask");
  taskButton.addEventLister("click", () => {
    const newTask = {
      user: {
        iserId: $("userId").value
      },
      taskName: $("taskName").value,
      taskCompleteDate: $("taskCompleteDate").value
    };

    if (taskButton.textContent.startsWith("Save")) {
      console.log("To Do:", newTask);
      fetch("http://localhost:8088/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      }).then(clearTaskForm);
    } else if (taskButton.textContent.startsWith("Update")) {
      fetch(`http://localhost:8088/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      }).then(clearTaskForm);
    }
  });
};

var _default = enterTask;
exports.default = _default;

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9lbXB0eUV2ZW50RmllbGRzLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRDYXJkLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRIVE1MZm9yRm9ybS5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldnREYXRhTWdyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy90YXNrcy90YXNrQ2FyZC5qcyIsIi4uL3NjcmlwdHMvdGFza3MvdGFza0RhdGFNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy90YXNrcy90YXNrRm9ybS5qcyIsIi4uL3NjcmlwdHMvdGFza3MvdGFza0Zvcm1IVE1MLmpzIiwiLi4vc2NyaXB0cy90YXNrcy90YXNrTGlzdC5qcyIsIi4uL3NjcmlwdHMvdGFza3MvdGFza0xpc3RlbmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBVjs7QUFFQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBRXhCLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixLQUFoQixHQUFzQixFQUF0QixFQUNBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLEdBQW1CLEVBRG5CLEVBRUEsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0IsS0FBcEIsR0FBMEIsRUFGMUIsRUFHQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLEtBQWhCLEdBQXNCLEVBSHRCO0FBS0osQ0FQRDs7ZUFTZSxjOzs7Ozs7Ozs7OztBQ1hmLE1BQU0sU0FBUyxHQUFJLEtBQUQsSUFDbEI7QUFDSSxTQUFPO1VB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UUFBSSxVQUFVLENBQUMsV0FBWCxDQUF1QixVQUF2QixDQUFrQyxNQUFsQyxDQUFKLEVBQStDO0FBQzNDLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLE9BQXRCO0FBQ0EsTUFBQSxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDakMsUUFBQSxNQUFNLEVBQUUsTUFEeUI7QUFFakMsUUFBQSxPQUFPLEVBQUU7QUFDTCwwQkFBZ0I7QUFEWCxTQUZ3QjtBQUtqQyxRQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWY7QUFMMkIsT0FBaEMsQ0FBTCxDQU9HLElBUEgsQ0FPUSxhQVBSO0FBUUgsS0FWRCxNQVdLLElBQUksVUFBVSxDQUFDLFdBQVgsQ0FBdUIsVUFBdkIsQ0FBa0MsUUFBbEMsQ0FBSixFQUFpRDtBQUVsRCxNQUFBLEtBQUssQ0FBRSwrQkFBOEIsRUFBRyxFQUFuQyxFQUFzQztBQUN2QyxRQUFBLE1BQU0sRUFBRSxLQUQrQjtBQUV2QyxRQUFBLE9BQU8sRUFBRTtBQUNMLDBCQUFnQjtBQURYLFNBRjhCO0FBS3ZDLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZjtBQUxpQyxPQUF0QyxDQUFMLENBTUcsSUFOSCxDQU1RLGFBTlI7QUFRSDtBQUVKLEdBaENEO0FBaUNILENBckNEOztlQXNDZSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBjbGVhckV2ZW50Rm9ybSA9ICgpID0+IHtcclxuXHJcbiAgICAgJChcIiNldmVudE5hbWVcIikudmFsdWU9XCJcIixcclxuICAgICAkKFwiI3VzZXJJZFwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnRMb2NhdGlvblwiKS52YWx1ZT1cIlwiLFxyXG4gICAgICQoXCIjZXZlbnREYXRlXCIpLnZhbHVlPVwiXCJcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsZWFyRXZlbnRGb3JtIiwiXHJcbmNvbnN0IGV2ZW50Q2FyZCA9IChldmVudCk9PlxyXG57XHJcbiAgICByZXR1cm5gXHJcbiAgIDxoMj4gJHtldmVudC5ldmVudE5hbWV9PGgyPlxyXG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTxwPlxyXG4gICAgPHA+JHtldmVudC5ldmVudERhdGV9PHA+XHJcbiAgICA8YnV0dG9uIGlkPSdkZWxldGUtLWV2ZW50LS0ke2V2ZW50LmlkfSc+RGVsZXRlICR7ZXZlbnQuZXZlbnROYW1lfSA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gaWQ9J2VkaXQtLWV2ZW50LS0ke2V2ZW50LmlkfSc+RGVsZXRlICR7ZXZlbnQuZXZlbnROYW1lfSA8L2J1dHRvbj5cclxuXHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50Q2FyZFxyXG4iLCJjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuLypcclxuMS4gTmFtZSBvZiBldmVudFxyXG4yLiBEYXRlIG9mIGV2ZW50XHJcbjMuIExvY2F0aW9uIG9mIGV2ZW50XHJcblxyXG4qKkdpdmVuKiogYSB1c2VyIGhhcyBlbnRlcmVkIGluIGFsbCBkZXRhaWxzIG9mIGFuIGV2ZW50XHJcbioqV2hlbioqIHRoZSB1c2VyIHBlcmZvcm1zIGEgZ2VzdHVyZSB0byBzYXZlIHRoZSBldmVudFxyXG4qKlRoZW4qKiB0aGUgZXZlbnQgc2hvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYXBwbGljYXRpb24gaW4gdGhlIGBFdmVudHNgIGNvbXBvbmVudFxyXG4qL1xyXG5cclxuY29uc3QgZm9ybUhUTUwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJldmVudElkXCIgbmFtZT1cImV2ZW50SWRcIiB0eXBlPVwiaGlkZGVuXCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJJZFwiIG5hbWU9XCJ1c2VySWRcIiB0eXBlPVwiaGlkZGVuXCI+PC9pbnB1dD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnROYW1lXCI+IE5hbWUgb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50TmFtZVwiIHR5cGU9XCJ0ZXh0XCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnREYXRlXCI+IERhdGUgb2YgRXZlbnQgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV2ZW50RGF0ZVwiIHR5cGU9XCJ0ZXh0XCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwiZXZlbnRMb2NhdGlvblwiPiBMb2NhdGlvbiBvZiBFdmVudCA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZXZlbnRMb2NhdGlvblwiIHR5cGU9XCJ0ZXh0XCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJldmVudEZvcm1BY3Rpb25cIj5TYXZlIEV2ZW50PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtSFRNTCIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRDYXJkIGZyb20gXCIuL2V2ZW50Q2FyZFwiXHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuXHJcbmNvbnN0IHNwb3QgPSAkKFwiI2V2ZW50c19kaXNwbGF5XCIpXHJcbi8vbGlzdCBhbGwgZXZlbnRzXHJcblxyXG5jb25zdCBldmVudExpc3QgPSB7XHJcblxyXG4gICAgbGlzdDogKCkgPT4ge1xyXG4gICAgICAgIGV2ZW50RGF0YU1hbmFnZXIuZmV0Y2hFdmVudHMoKS50aGVuKFxyXG4gICAgICAgICAgICAocGFyc2VkRXZlbnRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWRFdmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BvdC5pbm5lckhUTUwgKz0gZXZlbnRDYXJkKGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50TGlzdFxyXG4vL3RoZW4gY2hhbmdlIHRoZSBsaXN0IHRvIHNob3cgb25seSB0aG9zZSBpdGVtcyByZWxhdGVkIHRvIHRoZSB1c2VyIGlkIHRoYXQgaXMgaW4gc2Vzc2lvbiIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2dERhdGFNZ3JcIlxyXG5pbXBvcnQgZXZlbnRMaXN0IGZyb20gXCIuL2V2ZW50TGlzdFwiXHJcbmltcG9ydCBjbGVhckV2ZW50Rm9ybSBmcm9tIFwiLi9lbXB0eUV2ZW50RmllbGRzXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5cclxuY29uc3Qgc2F2ZUV2ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGhlQnV0dG9uID0gJChcIiNldmVudEZvcm1BY3Rpb25cIilcclxuXHJcbiAgICB0aGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogJChcIiN1c2VySWRcIikudmFsdWUsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogJChcIiNldmVudE5hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgIGV2ZW50RGF0ZTogJChcIiNldmVudERhdGVcIikudmFsdWUsXHJcbiAgICAgICAgICAgIGV2ZW50TG9jYXRpb246ICQoXCIjZXZlbnRMb2NhdGlvblwiKS52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhlQnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoXCJTYXZlXCIpKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXcgZXZlbnQ6XCIsIG5ld0V2ZW50KVxyXG5cclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFdmVudClcclxuXHJcbiAgICAgICAgICAgIH0pLnRoZW4oY2xlYXJFdmVudEZvcm0pXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGVCdXR0b24udGV4dENvbnRlbnQuc3RhcnRzV2l0aChcIlVwZGF0ZVwiKSkge1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFdmVudClcclxuICAgICAgICAgICAgfSkudGhlbihjbGVhckV2ZW50Rm9ybSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2F2ZUV2ZW50IiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGV2ZW50RGF0YU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZmV0Y2hFdmVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKFJlc3BvbnNlID0+IFJlc3BvbnNlLmpzb24oKSlcclxuXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZEV2ZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJzZWRFdmVudHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkRXZlbnRzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlRXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0RXZlbnQ6IChldmVudElkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihldmVudHMgPT4gZXZlbnRzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4ocGFyc2VkRXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZEV2ZW50XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuICAgIGVkaXRFdmVudDogKGV2ZW50SWQsIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7ZXZlbnRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzYXZlRXZlbnQ6IChuZXdFdmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFdmVudClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnREYXRhTWFuYWdlciIsImltcG9ydCBldmVudERhdGFNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9ldnREYXRhTWdyXCJcclxuaW1wb3J0IGV2ZW50TGlzdCBmcm9tIFwiLi9ldmVudHMvZXZlbnRMaXN0XCJcclxuaW1wb3J0IGV2ZW50Q2FyZCBmcm9tIFwiLi9ldmVudHMvZXZlbnRDYXJkXCJcclxuaW1wb3J0IGZvcm1IVE1MIGZyb20gXCIuL2V2ZW50cy9ldmVudEhUTUxmb3JGb3JtXCJcclxuaW1wb3J0IHNhdmVFdmVudCBmcm9tIFwiLi9ldmVudHMvZXZlbnRMaXN0ZW5lclwiXHJcbi8vXHJcbmltcG9ydCB0YXNrRnVuY3Rpb25zIGZyb20gXCIuL3Rhc2tzL3Rhc2tGb3JtXCJcclxuaW1wb3J0IHRhc2tMaXN0IGZyb20gXCIuL3Rhc2tzL3Rhc2tMaXN0XCJcclxuaW1wb3J0IGVudGVyVGFzayBmcm9tIFwiLi90YXNrcy90YXNrTGlzdGVuZXJcIlxyXG5cclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcblxyXG5jb25zdCBwb3N0ID0gJChcIiNldmVudHNfaW5wdXRcIilcclxuXHJcblxyXG5ldmVudExpc3QubGlzdCgpXHJcblxyXG5wb3N0LmlubmVySFRNTCArPSBmb3JtSFRNTCgpXHJcblxyXG5cclxuXHJcbnRhc2tGdW5jdGlvbnMoKVxyXG5zYXZlRXZlbnQoKVxyXG50YXNrTGlzdC50YXNrTGlzdCAoKVxyXG5lbnRlclRhc2soKSIsImNvbnN0IHRhc2tDYXJkID0gKHRhc2spID0+IHtcclxuICByZXR1cm4gYFxyXG4gIDxoMj4gJHt0YXNrLnRhc2tOYW1lfTxoMj5cclxuICAgIDxwPiR7dGFzay50YXNrQ29tcGxldGlvbkRhdGV9PHA+XHJcbiAgICA8YnV0dG9uIGlkPSdkZWxldGUtLXRhc2stLSR7dGFzay5pZH0nPkRlbGV0ZSAke3Rhc2sudGFza05hbWV9IDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBpZD0nZWRpdC0tdGFzay0tJHt0YXNrLmlkfSc+RGVsZXRlICR7dGFzay50YXNrTmFtZX0gPC9idXR0b24+XHJcbiAgICA8ZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInRhc2tzXCIgbmFtZT1cInRhc2tzXCI+XHJcbiAgPGxhYmVsIGZvcj1cInRhc2tzXCI+Q29tcGxldGVkPC9sYWJlbD5cclxuPC9kaXY+XHJcbiAgYFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tDYXJkIiwiY29uc3QgdGFza0RhdGFNYW5hZ2VyID0ge1xyXG5cclxuICAgIC8vIENvbXBsZXRlIEZldGNoIG9mIGFsbCB0YXNrc1xyXG4gICAgZmV0Y2hUYXNrczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiKVxyXG4gICAgICAgICAgICAudGhlbihSZXR1cm4gPT4gUmV0dXJuLmpzb24oKSlcclxuXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZFRhc2tzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZFRhc2tzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFRhc2tzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8gRGVsZXRlIHRhc2sgYnkgSURcclxuICAgIGRlbGV0ZVRhc2s6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8gR2V0IChyZXRyaWV2ZSkgc2luZ2xlIHRhc2sgYnkgSURcclxuICAgIGdldFRhc2s6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrcy8ke3Rhc2tJZH1gKVxyXG4gICAgICAgICAgICAudGhlbih0YXNrcyA9PiB0YXNrcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZFRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFRhc2tcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG4gICAgLy8gUHV0IHVwZGF0ZWQgdGFzayBiYWNrIHRvIGpzb24gYnkgdGFza0lEXHJcbiAgICBlZGl0VGFzazogKHRhc2tJZCwgdGFzaykgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2svJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRhc2spXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBQb3N0IGEgbmV3VGFzayB0byBqc29uIGFuZCBhc3NpZ24gYW4gSURcclxuICAgIHNhdmVUYXNrOiAobmV3VGFzaykgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1Rhc2spXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tEYXRhTWFuYWdlciIsImltcG9ydCB0YXNrRm9ybUhUTUwgZnJvbSBcIi4vdGFza0Zvcm1IVE1MXCJcclxuXHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXHJcbmNvbnN0IHBvc3QgPSAkKFwiI3Rhc2tzX2lucHV0XCIpXHJcblxyXG5cclxuXHJcbmNvbnN0IHRhc2tGdW5jdGlvbnMgPSAoKSA9PiB7XHJcblxyXG4gICAgcG9zdC5pbm5lckhUTUwgPSB0YXNrRm9ybUhUTUwoKVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza0Z1bmN0aW9ucyIsImNvbnN0IHRhc2tGb3JtSFRNTCA9ICgpID0+IHtcclxuICAgIHJldHVybiBgXHJcblxyXG48c2VjdGlvbj5cclxuICAgIDxpbnB1dCBpZD1cInRhc2tJZFwiIG5hbWU9XCJ0YXNrSWRcIj48L2lucHV0PlxyXG4gICAgPGlucHV0IGlkPVwidXNlcklkXCIgbmFtZT1cInVzZXJJZFwiPjwvaW5wdXQ+XHJcbjwvc2VjdGlvbj5cclxuXHJcbjxmaWVsZHNldD5cclxuICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwidGFza05hbWVcIj5OYW1lIG9mIFRhc2s8L2xhYmVsPlxyXG4gICAgPGlucHV0IGlkPVwidGFza05hbWVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICAgXHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cInRhc2tDb21wbGV0ZURhdGVcIj5Db21wbGV0ZSBEYXRlPC9sYWJlbD5cclxuICAgIDxpbnB1dCBpZD1cInRhc2tDb21wbGV0ZURhdGVcIiB0eXBlPVwidGV4dFwiPjwvaW5wdXQ+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICAgXHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cInRhc2tDaGVja0JveFwiPkNvbXBsZXRlZDwvbGFiZWw+XHJcbiAgICA8aW5wdXQgaWQ9XCJ0YXNrQ2hlY2tCb3hcIiB0eXBlPVwiY2hlY2tib3hcIj48L2lucHV0PlxyXG48L2ZpZWxkc2V0PlxyXG5cclxuPGJ1dHRvbiBpZD1cImVudGVyVGFza1wiPkVudGVyIFRhc2s8L2J1dHRvbj5cclxuYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrRm9ybUhUTUwiLCIvLyBJbXBvcnRcclxuaW1wb3J0IHRhc2tEYXRhTWFuYWdlciBmcm9tIFwiLi90YXNrRGF0YU1hbmFnZXJcIlxyXG5pbXBvcnQgdGFza0NhcmQgZnJvbSBcIi4vdGFza0NhcmRcIlxyXG4vL1xyXG5cclxuLy8gZGlzcGxheSBhbGwgdGFza3NcclxuY29uc3QgdGFza1Nwb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzX2Rpc3BsYXlcIilcclxuXHJcbmNvbnN0IHRhc2tMaXN0ID0gIHtcclxuICAgIHRhc2tMaXN0OiAoKSA9PiB7XHJcbiAgICAgICAgdGFza0RhdGFNYW5hZ2VyLmZldGNoVGFza3MoKS50aGVuKFxyXG4gICAgICAgICAgICAocGFyc2VkVGFza3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhc2tTcG90LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWRUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2tTcG90LmlubmVySFRNTCArPSB0YXNrQ2FyZCh0YXNrKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuLy8gRXhwb3J0XHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tMaXN0XHJcbi8vIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuY29uc3QgZW50ZXJUYXNrID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHRhc2tCdXR0b24gPSAkKFwiI2VudGVyVGFza1wiKVxyXG5cclxuICAgIHRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHtcclxuICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaXNlcklkOiAkKFwidXNlcklkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRhc2tOYW1lOiAkKFwidGFza05hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgIHRhc2tDb21wbGV0ZURhdGU6ICQoXCJ0YXNrQ29tcGxldGVEYXRlXCIpLnZhbHVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFza0J1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiU2F2ZVwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvIERvOlwiLCBuZXdUYXNrKVxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VGFzaylcclxuXHJcbiAgICAgICAgICAgIH0pLnRoZW4oY2xlYXJUYXNrRm9ybSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFza0J1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKFwiVXBkYXRlXCIpKSB7XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VGFzaylcclxuICAgICAgICAgICAgfSkudGhlbihjbGVhclRhc2tGb3JtKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBlbnRlclRhc2siXX0=
