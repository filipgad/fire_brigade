const container = document.getElementById('container');
const timer = document.createElement("div");
timer.classList.add("timer");
container.appendChild(timer);

fetch('../db.json')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        timer.innerText = "Maximum travel time: " + resp.max_travel_time.max_travel_time;
        resp.cities.forEach( city => {
            if(city.fire_brigade === "true") {
                const newCity = document.createElement("div");
                newCity.classList.add("fire_brigade");
                newCity.dataset.city = city.city;
                newCity.innerText = city.city;
                container.appendChild(newCity);
            } else {
                const newDestCity = document.createElement("div");
                newDestCity.classList.add("destination_city");
                newDestCity.dataset.city = city.city;
                newDestCity.innerText = city.city;
                container.appendChild(newDestCity);
            }
            console.log(city);
        });
        resp.roads.forEach( road => {
            console.log(road);
        });
    });

