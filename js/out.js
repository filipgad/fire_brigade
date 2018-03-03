/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var container = document.getElementById('container');

var cities = function cities() {
    fetch('../db.json').then(function (resp) {
        return resp.json();
    }).then(function (resp) {
        var cities = resp.cities;
        var roads = resp.roads;
        var time = resp.max_travel_time;

        var timer = document.createElement("div");
        timer.classList.add("timer");
        timer.innerText = "Maximum travel time is: " + time;
        container.appendChild(timer);

        cities.forEach(function (city) {
            if (city.fire_brigade === "true") {
                var new_city = document.createElement("div");
                new_city.classList.add("fire_brigade");
                new_city.dataset.city = city.city;
                new_city.innerText = city.city;
                container.appendChild(new_city);
            }
        });

        cities.forEach(function (city) {
            if (city.fire_brigade === "false") {
                var dest_city = document.createElement("div");
                dest_city.classList.add("dest_city");
                dest_city.dataset.city = city.city;
                dest_city.innerText = city.city;
                roads.forEach(function (road) {
                    if (road.connection[1] == city.city) {
                        dest_city.innerText = 'City name: ' + city.city + ', time to get here: ' + road.travel_time;
                        var new_city = document.querySelector('[data-city=' + road.connection[0] + ']');
                        new_city.appendChild(dest_city);
                        if (road.travel_time <= time) {
                            dest_city.style.border = "1px solid green";
                        } else {
                            dest_city.style.border = "1px solid red";
                        }
                    }
                });
            }
        });
    });
};

cities();

/***/ })
/******/ ]);