(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const logOfActivity = [];
const ActivityLogger = {
  add: function (message) {
    logOfActivity.push({
      message: message,
      timeStamp: Date.now()
    });
  },
  view: function () {
    return logOfActivity;
  },
  viewAsHTML: function () {
    const htmlString = logOfActivity.map(logMessage => {
      return `
                    <section>
                        <h2>${logMessage.message}</h2>
                        <div>Timestamp: ${logMessage.timeStamp}</div>
                    </section>
                `;
    }).join("");
    return htmlString;
  }
};
var _default = ActivityLogger;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _activityLogger = _interopRequireDefault(require("./activityLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Steve
    Name: carFactory.js
    Purpose: Produces a new car from a factory
*/
const CarFactory = (make, model) => {
  const newCar = {
    "make": make,
    "model": model,
    "drive": function () {
      console.log(`The ${this.make} ${this.model} goes VRROOOOOOOOOOMMMM!!!!!!!`);
    }
  };

  _activityLogger.default.add(`Created a ${newCar.make} ${newCar.model}`);

  return newCar;
};

var _default = CarFactory;
exports.default = _default;

},{"./activityLogger":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _activityLogger = _interopRequireDefault(require("./activityLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Steve
    Name: garage.js
    Purpose: To store car instances
*/

/*
    This array only exists within the scope of this method.
    Therefore, no other module can access it. However,
    the `garageSupervisor` object your define below allows
    code in other modules to indirectly access it by using
    the methods.
*/
const garage = [];
const GarageManager = {
  store: function (car) {
    garage.push(car);

    _activityLogger.default.add(`${car.make} ${car.model} was added to the garage`);
  },
  retrieve: function (carToFind) {
    return garage.find(car => car.make === carToFind.make && car.model === carToFind.model);
  },

  /*
      The inventory property is the only way for external code to
      read the value of the garage variable. There is no setter
      either. It is a read only property.
  */
  inventory: function () {
    return garage;
  },
  inventoryAsHTML: function () {
    return garage.map(car => `
            <section>
                <h2>${car.make} ${car.model} is in the garage</h2>
            </section>
        `).join("");
  }
};
var _default = GarageManager;
exports.default = _default;

},{"./activityLogger":1}],4:[function(require,module,exports){
"use strict";

var _carFactory = _interopRequireDefault(require("./carFactory"));

var _garage = _interopRequireDefault(require("./garage"));

var _activityLogger = _interopRequireDefault(require("./activityLogger"));

var _printToDOM = _interopRequireDefault(require("./printToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Steve
    Name: main.js
    Purpose: Entry point of our application
*/
// Create two cars using the function you imported
const mustang = (0, _carFactory.default)("Ford", "Mustang");
const accord = (0, _carFactory.default)("Honda", "Accord"); // Drive the cars for a while

console.log(mustang.drive("the grocery store"));
console.log(accord.drive("Indianapolis")); // Park the cars in the garage

_garage.default.store(mustang);

_garage.default.store(accord);

const isAccordThere = _garage.default.retrieve({
  make: "Chevy",
  model: "Tahoe"
});

console.log(isAccordThere);
console.table(_garage.default.inventory());
console.log(_activityLogger.default.view());
(0, _printToDOM.default)(_activityLogger.default.viewAsHTML(), ".logMessages");
(0, _printToDOM.default)(_garage.default.inventoryAsHTML(), ".garageInventory");

},{"./activityLogger":1,"./carFactory":2,"./garage":3,"./printToDOM":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const printToDom = (whatHTMLToPrint, whereToPrintIt) => {
  const itGoesHere = document.querySelector(whereToPrintIt);
  itGoesHere.innerHTML += whatHTMLToPrint;
};

var _default = printToDom;
exports.default = _default;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FjdGl2aXR5TG9nZ2VyLmpzIiwiLi4vc2NyaXB0cy9jYXJGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9nYXJhZ2UuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3ByaW50VG9ET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLGFBQWEsR0FBRyxFQUF0QjtBQUVBLE1BQU0sY0FBYyxHQUFHO0FBQ25CLEVBQUEsR0FBRyxFQUFFLFVBQVUsT0FBVixFQUFtQjtBQUNwQixJQUFBLGFBQWEsQ0FBQyxJQUFkLENBQW1CO0FBQ2YsTUFBQSxPQUFPLEVBQUUsT0FETTtBQUVmLE1BQUEsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFMO0FBRkksS0FBbkI7QUFJSCxHQU5rQjtBQU9uQixFQUFBLElBQUksRUFBRSxZQUFZO0FBQ2QsV0FBTyxhQUFQO0FBQ0gsR0FUa0I7QUFVbkIsRUFBQSxVQUFVLEVBQUUsWUFBWTtBQUNwQixVQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBZCxDQUNkLFVBQUQsSUFBZ0I7QUFDWixhQUFROzs4QkFFTSxVQUFVLENBQUMsT0FBUTswQ0FDUCxVQUFVLENBQUMsU0FBVTs7aUJBSC9DO0FBTUgsS0FSYyxFQVNqQixJQVRpQixDQVNaLEVBVFksQ0FBbkI7QUFXQSxXQUFPLFVBQVA7QUFDSDtBQXZCa0IsQ0FBdkI7ZUEyQmUsYzs7Ozs7Ozs7Ozs7QUM3QmY7Ozs7QUFFQTs7Ozs7QUFLQSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUQsRUFBTyxLQUFQLEtBQWlCO0FBQ2hDLFFBQU0sTUFBTSxHQUFHO0FBQ1gsWUFBUSxJQURHO0FBRVgsYUFBUyxLQUZFO0FBR1gsYUFBUyxZQUFZO0FBQ2pCLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSxPQUFNLEtBQUssSUFBSyxJQUFHLEtBQUssS0FBTSxnQ0FBM0M7QUFDSDtBQUxVLEdBQWY7O0FBT0EsMEJBQWUsR0FBZixDQUFvQixhQUFZLE1BQU0sQ0FBQyxJQUFLLElBQUcsTUFBTSxDQUFDLEtBQU0sRUFBNUQ7O0FBRUEsU0FBTyxNQUFQO0FBQ0gsQ0FYRDs7ZUFhZSxVOzs7Ozs7Ozs7OztBQ3BCZjs7OztBQUdBOzs7Ozs7QUFNQTs7Ozs7OztBQU9BLE1BQU0sTUFBTSxHQUFHLEVBQWY7QUFFQSxNQUFNLGFBQWEsR0FBRztBQUNsQixFQUFBLEtBQUssRUFBRSxVQUFVLEdBQVYsRUFBZTtBQUNsQixJQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksR0FBWjs7QUFDQSw0QkFBZSxHQUFmLENBQW9CLEdBQUUsR0FBRyxDQUFDLElBQUssSUFBRyxHQUFHLENBQUMsS0FBTSwwQkFBNUM7QUFDSCxHQUppQjtBQUtsQixFQUFBLFFBQVEsRUFBRSxVQUFVLFNBQVYsRUFBcUI7QUFDM0IsV0FBTyxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQUcsSUFDbEIsR0FBRyxDQUFDLElBQUosS0FBYSxTQUFTLENBQUMsSUFBdkIsSUFBK0IsR0FBRyxDQUFDLEtBQUosS0FBYyxTQUFTLENBQUMsS0FEcEQsQ0FBUDtBQUVILEdBUmlCOztBQVNsQjs7Ozs7QUFLQSxFQUFBLFNBQVMsRUFBRSxZQUFZO0FBQ25CLFdBQU8sTUFBUDtBQUNILEdBaEJpQjtBQWlCbEIsRUFBQSxlQUFlLEVBQUUsWUFBWTtBQUN6QixXQUFPLE1BQU0sQ0FBQyxHQUFQLENBQVcsR0FBRyxJQUFLOztzQkFFWixHQUFHLENBQUMsSUFBSyxJQUFHLEdBQUcsQ0FBQyxLQUFNOztTQUY3QixFQUlKLElBSkksQ0FJQyxFQUpELENBQVA7QUFLSDtBQXZCaUIsQ0FBdEI7ZUEwQmUsYTs7Ozs7O0FDdkNmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBUkE7Ozs7O0FBVUE7QUFDQSxNQUFNLE9BQU8sR0FBRyx5QkFBVyxNQUFYLEVBQW1CLFNBQW5CLENBQWhCO0FBQ0EsTUFBTSxNQUFNLEdBQUcseUJBQVcsT0FBWCxFQUFvQixRQUFwQixDQUFmLEMsQ0FFQTs7QUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQU8sQ0FBQyxLQUFSLENBQWMsbUJBQWQsQ0FBWjtBQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBTSxDQUFDLEtBQVAsQ0FBYSxjQUFiLENBQVosRSxDQUVBOztBQUNBLGdCQUFjLEtBQWQsQ0FBb0IsT0FBcEI7O0FBQ0EsZ0JBQWMsS0FBZCxDQUFvQixNQUFwQjs7QUFFQSxNQUFNLGFBQWEsR0FBRyxnQkFBYyxRQUFkLENBQXVCO0FBQUMsRUFBQSxJQUFJLEVBQUUsT0FBUDtBQUFnQixFQUFBLEtBQUssRUFBRTtBQUF2QixDQUF2QixDQUF0Qjs7QUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLGFBQVo7QUFHQSxPQUFPLENBQUMsS0FBUixDQUFjLGdCQUFjLFNBQWQsRUFBZDtBQUdBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQWUsSUFBZixFQUFaO0FBRUEseUJBQVcsd0JBQWUsVUFBZixFQUFYLEVBQXdDLGNBQXhDO0FBQ0EseUJBQVcsZ0JBQWMsZUFBZCxFQUFYLEVBQTRDLGtCQUE1Qzs7Ozs7Ozs7OztBQy9CQSxNQUFNLFVBQVUsR0FBRyxDQUFDLGVBQUQsRUFBa0IsY0FBbEIsS0FBcUM7QUFDcEQsUUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkI7QUFFQSxFQUFBLFVBQVUsQ0FBQyxTQUFYLElBQXdCLGVBQXhCO0FBQ0gsQ0FKRDs7ZUFNZSxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgbG9nT2ZBY3Rpdml0eSA9IFtdXG5cbmNvbnN0IEFjdGl2aXR5TG9nZ2VyID0ge1xuICAgIGFkZDogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgbG9nT2ZBY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lU3RhbXA6IERhdGUubm93KClcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHZpZXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGxvZ09mQWN0aXZpdHlcbiAgICB9LFxuICAgIHZpZXdBc0hUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgaHRtbFN0cmluZyA9IGxvZ09mQWN0aXZpdHkubWFwKFxuICAgICAgICAgICAgKGxvZ01lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj4ke2xvZ01lc3NhZ2UubWVzc2FnZX08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5UaW1lc3RhbXA6ICR7bG9nTWVzc2FnZS50aW1lU3RhbXB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICB9XG4gICAgICAgICkuam9pbihcIlwiKVxuXG4gICAgICAgIHJldHVybiBodG1sU3RyaW5nXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5TG9nZ2VyXG4iLCJpbXBvcnQgQWN0aXZpdHlMb2dnZXIgZnJvbSBcIi4vYWN0aXZpdHlMb2dnZXJcIlxuXG4vKlxuICAgIEF1dGhvcjogU3RldmVcbiAgICBOYW1lOiBjYXJGYWN0b3J5LmpzXG4gICAgUHVycG9zZTogUHJvZHVjZXMgYSBuZXcgY2FyIGZyb20gYSBmYWN0b3J5XG4qL1xuY29uc3QgQ2FyRmFjdG9yeSA9IChtYWtlLCBtb2RlbCkgPT4ge1xuICAgIGNvbnN0IG5ld0NhciA9IHtcbiAgICAgICAgXCJtYWtlXCI6IG1ha2UsXG4gICAgICAgIFwibW9kZWxcIjogbW9kZWwsXG4gICAgICAgIFwiZHJpdmVcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZSAke3RoaXMubWFrZX0gJHt0aGlzLm1vZGVsfSBnb2VzIFZSUk9PT09PT09PT09NTU1NISEhISEhIWApXG4gICAgICAgIH1cbiAgICB9XG4gICAgQWN0aXZpdHlMb2dnZXIuYWRkKGBDcmVhdGVkIGEgJHtuZXdDYXIubWFrZX0gJHtuZXdDYXIubW9kZWx9YClcblxuICAgIHJldHVybiBuZXdDYXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyRmFjdG9yeSIsImltcG9ydCBBY3Rpdml0eUxvZ2dlciBmcm9tIFwiLi9hY3Rpdml0eUxvZ2dlclwiXG5cblxuLypcbiAgICBBdXRob3I6IFN0ZXZlXG4gICAgTmFtZTogZ2FyYWdlLmpzXG4gICAgUHVycG9zZTogVG8gc3RvcmUgY2FyIGluc3RhbmNlc1xuKi9cblxuLypcbiAgICBUaGlzIGFycmF5IG9ubHkgZXhpc3RzIHdpdGhpbiB0aGUgc2NvcGUgb2YgdGhpcyBtZXRob2QuXG4gICAgVGhlcmVmb3JlLCBubyBvdGhlciBtb2R1bGUgY2FuIGFjY2VzcyBpdC4gSG93ZXZlcixcbiAgICB0aGUgYGdhcmFnZVN1cGVydmlzb3JgIG9iamVjdCB5b3VyIGRlZmluZSBiZWxvdyBhbGxvd3NcbiAgICBjb2RlIGluIG90aGVyIG1vZHVsZXMgdG8gaW5kaXJlY3RseSBhY2Nlc3MgaXQgYnkgdXNpbmdcbiAgICB0aGUgbWV0aG9kcy5cbiovXG5jb25zdCBnYXJhZ2UgPSBbXVxuXG5jb25zdCBHYXJhZ2VNYW5hZ2VyID0ge1xuICAgIHN0b3JlOiBmdW5jdGlvbiAoY2FyKSB7XG4gICAgICAgIGdhcmFnZS5wdXNoKGNhcilcbiAgICAgICAgQWN0aXZpdHlMb2dnZXIuYWRkKGAke2Nhci5tYWtlfSAke2Nhci5tb2RlbH0gd2FzIGFkZGVkIHRvIHRoZSBnYXJhZ2VgKVxuICAgIH0sXG4gICAgcmV0cmlldmU6IGZ1bmN0aW9uIChjYXJUb0ZpbmQpIHtcbiAgICAgICAgcmV0dXJuIGdhcmFnZS5maW5kKGNhciA9PlxuICAgICAgICAgICAgY2FyLm1ha2UgPT09IGNhclRvRmluZC5tYWtlICYmIGNhci5tb2RlbCA9PT0gY2FyVG9GaW5kLm1vZGVsKVxuICAgIH0sXG4gICAgLypcbiAgICAgICAgVGhlIGludmVudG9yeSBwcm9wZXJ0eSBpcyB0aGUgb25seSB3YXkgZm9yIGV4dGVybmFsIGNvZGUgdG9cbiAgICAgICAgcmVhZCB0aGUgdmFsdWUgb2YgdGhlIGdhcmFnZSB2YXJpYWJsZS4gVGhlcmUgaXMgbm8gc2V0dGVyXG4gICAgICAgIGVpdGhlci4gSXQgaXMgYSByZWFkIG9ubHkgcHJvcGVydHkuXG4gICAgKi9cbiAgICBpbnZlbnRvcnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdhcmFnZVxuICAgIH0sXG4gICAgaW52ZW50b3J5QXNIVE1MOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnYXJhZ2UubWFwKGNhciA9PiBgXG4gICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aDI+JHtjYXIubWFrZX0gJHtjYXIubW9kZWx9IGlzIGluIHRoZSBnYXJhZ2U8L2gyPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICBgKS5qb2luKFwiXCIpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYXJhZ2VNYW5hZ2VyIiwiLypcbiAgICBBdXRob3I6IFN0ZXZlXG4gICAgTmFtZTogbWFpbi5qc1xuICAgIFB1cnBvc2U6IEVudHJ5IHBvaW50IG9mIG91ciBhcHBsaWNhdGlvblxuKi9cbmltcG9ydCBDYXJGYWN0b3J5IGZyb20gXCIuL2NhckZhY3RvcnlcIlxuaW1wb3J0IEdhcmFnZU1hbmFnZXIgZnJvbSBcIi4vZ2FyYWdlXCJcbmltcG9ydCBBY3Rpdml0eUxvZ2dlciBmcm9tIFwiLi9hY3Rpdml0eUxvZ2dlclwiXG5pbXBvcnQgcHJpbnRUb0RvbSBmcm9tIFwiLi9wcmludFRvRE9NXCJcblxuLy8gQ3JlYXRlIHR3byBjYXJzIHVzaW5nIHRoZSBmdW5jdGlvbiB5b3UgaW1wb3J0ZWRcbmNvbnN0IG11c3RhbmcgPSBDYXJGYWN0b3J5KFwiRm9yZFwiLCBcIk11c3RhbmdcIilcbmNvbnN0IGFjY29yZCA9IENhckZhY3RvcnkoXCJIb25kYVwiLCBcIkFjY29yZFwiKVxuXG4vLyBEcml2ZSB0aGUgY2FycyBmb3IgYSB3aGlsZVxuY29uc29sZS5sb2cobXVzdGFuZy5kcml2ZShcInRoZSBncm9jZXJ5IHN0b3JlXCIpKVxuY29uc29sZS5sb2coYWNjb3JkLmRyaXZlKFwiSW5kaWFuYXBvbGlzXCIpKVxuXG4vLyBQYXJrIHRoZSBjYXJzIGluIHRoZSBnYXJhZ2VcbkdhcmFnZU1hbmFnZXIuc3RvcmUobXVzdGFuZylcbkdhcmFnZU1hbmFnZXIuc3RvcmUoYWNjb3JkKVxuXG5jb25zdCBpc0FjY29yZFRoZXJlID0gR2FyYWdlTWFuYWdlci5yZXRyaWV2ZSh7bWFrZTogXCJDaGV2eVwiLCBtb2RlbDogXCJUYWhvZVwifSlcbmNvbnNvbGUubG9nKGlzQWNjb3JkVGhlcmUpXG5cblxuY29uc29sZS50YWJsZShHYXJhZ2VNYW5hZ2VyLmludmVudG9yeSgpKVxuXG5cbmNvbnNvbGUubG9nKEFjdGl2aXR5TG9nZ2VyLnZpZXcoKSlcblxucHJpbnRUb0RvbShBY3Rpdml0eUxvZ2dlci52aWV3QXNIVE1MKCksIFwiLmxvZ01lc3NhZ2VzXCIpXG5wcmludFRvRG9tKEdhcmFnZU1hbmFnZXIuaW52ZW50b3J5QXNIVE1MKCksIFwiLmdhcmFnZUludmVudG9yeVwiKVxuIiwiXG5jb25zdCBwcmludFRvRG9tID0gKHdoYXRIVE1MVG9QcmludCwgd2hlcmVUb1ByaW50SXQpID0+IHtcbiAgICBjb25zdCBpdEdvZXNIZXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3aGVyZVRvUHJpbnRJdClcblxuICAgIGl0R29lc0hlcmUuaW5uZXJIVE1MICs9IHdoYXRIVE1MVG9QcmludFxufVxuXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRG9tIl19
