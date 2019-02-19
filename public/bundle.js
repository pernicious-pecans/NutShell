(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

const $ = document.querySelector.bind(document);
const eventDataManager = {
  fetchEvents: () => {
    return fetch("http://localhost:8088/users").then(Response => Response.json()).then(parsedEvents => {
      console.log(parsedEvents);
      return parsedEvents;
    });
  }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFFQSxNQUFNLGdCQUFnQixHQUFHO0FBRXJCLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDZixXQUFPLEtBQUssQ0FBQyw2QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLEVBR0YsSUFIRSxDQUdHLFlBQVksSUFBSTtBQUNsQixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWjtBQUNBLGFBQU8sWUFBUDtBQUNILEtBTkUsQ0FBUDtBQU9IO0FBVm9CLENBQXpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IGV2ZW50RGF0YU1hbmFnZXIgPSB7XHJcblxyXG4gICAgZmV0Y2hFdmVudHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuICAgICAgICAgICAgLnRoZW4oUmVzcG9uc2UgPT4gUmVzcG9uc2UuanNvbigpKVxyXG5cclxuICAgICAgICAgICAgLnRoZW4ocGFyc2VkRXZlbnRzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZEV2ZW50cylcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRFdmVudHNcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufSJdfQ==
