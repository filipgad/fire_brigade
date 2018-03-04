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


(function () {

    var container = document.getElementById('container');
    var timer = document.querySelector('.timer');
    var citiesBoard = document.querySelector('.citiesBoard');

    fetch('../db.json').then(function (resp) {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        } else {
            return resp.json();
        }
    }).then(function (data) {
        var cities = data.cities;
        var roads = data.roads;
        var time = data.max_travel_time;

        // Maximum travel time information
        timer.innerHTML = '<h1>Maximum travel time: ' + time + 'min</h1>';

        // Create cities with fire brigade
        cities.forEach(function (city) {
            if (city.fire_brigade === 'true') {
                var newCity = document.createElement('div');
                newCity.classList.add('fireBrigade');
                newCity.dataset.city = city.city;
                newCity.innerHTML = '<h1>Fire brigade in city ' + city.city + '</h1>\n                                            <p>Cities in fire brigade district:</p>';
                citiesBoard.appendChild(newCity);
            }
        });

        // Create cities without fire brigade
        cities.forEach(function (city) {
            if (city.fire_brigade === 'false') {
                var destCity = document.createElement('div');
                destCity.classList.add('destCity');
                destCity.dataset.city = city.city;
                destCity.innerHTML = '<h2>City: ' + city.city + '</h2>';

                // Find road connection between fire brigade and city
                roads.forEach(function (road) {
                    if (road.connection.indexOf(city.city) !== -1) {
                        var timeInfo = document.createElement('p');
                        timeInfo.innerText = 'Time to get here: ' + road.travel_time + 'min';
                        var fireBrigadeCity = document.querySelector('[data-city=' + road.connection[road.connection.indexOf(destCity.dataset.city) === 0 ? 1 : 0] + ']');
                        destCity.appendChild(timeInfo);
                        fireBrigadeCity.appendChild(destCity);

                        // Check if fire brigade could reach get to the city in maximum travel time
                        if (road.travel_time <= time) {
                            destCity.style.backgroundColor = '#86D175';
                        } else {
                            destCity.style.backgroundColor = '#CB8762';
                        }
                    }
                });
            }
        });
    }).catch(function (err) {
        console.error('Error:', err);
    });
})();

/***/ })
/******/ ]);