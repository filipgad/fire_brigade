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
var roads_list = document.createElement("ul");
container.appendChild(roads_list);

var timer = function timer(time) {
    var timer = document.createElement("div");
    timer.classList.add("timer");
    timer.innerText = "Maximum travel time is: " + time;
    container.appendChild(timer);
};

var fire_brigade = function fire_brigade(city) {
    var fire_brigade = document.createElement("div");
    fire_brigade.classList.add("fire_brigade");
    fire_brigade.innerText = city + " - city with fire brigade";
    container.appendChild(fire_brigade);
};

var dest_city = function dest_city(city) {
    var dest_city = document.createElement("div");
    dest_city.classList.add("dest_city");
    dest_city.innerText = city + " - city without fire brigade";
    container.appendChild(dest_city);
};

var roads = function roads(road) {
    var road_elem = document.createElement("li");
    road_elem.classList.add("road");
    road_elem.innerText = "Droga łączy miasto " + road.connection[0] + " z miastem " + road.connection[1] + ". Czas przejazdu wynosi: " + road.travel_time;
    roads_list.appendChild(road_elem);
};

fetch('../db.json').then(function (resp) {
    return resp.json();
}).then(function (resp) {
    timer(resp.max_travel_time.max_travel_time);
    resp.cities.forEach(function (city) {
        if (city.fire_brigade === "true") {
            fire_brigade(city.city);
        } else {
            dest_city(city.city);
        }
    });
    resp.roads.forEach(function (road) {
        roads(road);
    });
});

/***/ })
/******/ ]);