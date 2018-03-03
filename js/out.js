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
var timer = document.createElement("div");
var cities_board = document.createElement("div");
timer.classList.add("timer");
cities_board.classList.add("cities_table");
container.appendChild(timer);
container.appendChild(cities_board);

(function () {
    fetch('../db.json').then(function (resp) {
        return resp.json();
    }).then(function (resp) {
        var cities = resp.cities;
        var roads = resp.roads;
        var time = resp.max_travel_time;

        timer.innerHTML = "<h1>Maximum travel time: " + time + "min</h1>";

        cities.forEach(function (city) {
            if (city.fire_brigade === "true") {
                var new_city = document.createElement("div");
                new_city.classList.add("fire_brigade");
                new_city.dataset.city = city.city;
                new_city.innerHTML = "<h1>Fire brigade in city " + city.city + "</h1>\n                                            <p>Cities in fire brigade district:</p>";
                cities_board.appendChild(new_city);
            }
        });

        cities.forEach(function (city) {
            if (city.fire_brigade === "false") {
                var dest_city = document.createElement("div");
                dest_city.classList.add("dest_city");
                dest_city.dataset.city = city.city;
                dest_city.innerHTML = "<h2>City: " + city.city + "</h2>";
                roads.forEach(function (road) {
                    if (road.connection[1] == city.city) {
                        var time_info = document.createElement("p");
                        time_info.innerText = "Time to get here: " + road.travel_time + "min";
                        var new_city = document.querySelector("[data-city=" + road.connection[0] + "]");
                        dest_city.appendChild(time_info);
                        new_city.appendChild(dest_city);
                        if (road.travel_time <= time) {
                            dest_city.style.backgroundColor = "#86D175";
                        } else {
                            dest_city.style.backgroundColor = "#CB8762";
                        }
                    }
                });
            }
        });
    });
})();

/***/ })
/******/ ]);