const container = document.getElementById('container');
const roads_list = document.createElement("ul");
container.appendChild(roads_list);


const timer = (time) => {
    const timer = document.createElement("div");
    timer.classList.add("timer");
    timer.innerText = "Maximum travel time is: " + time;
    container.appendChild(timer);
}

const fire_brigade = (city) => {
    const fire_brigade = document.createElement("div");
    fire_brigade.classList.add("fire_brigade");
    fire_brigade.innerText = city + " - city with fire brigade";
    container.appendChild(fire_brigade);
}

const dest_city = (city) => {
    const dest_city = document.createElement("div");
    dest_city.classList.add("dest_city");
    dest_city.innerText = city + " - city without fire brigade";
    container.appendChild(dest_city);
}

const roads = (road) => {
    const road_elem = document.createElement("li");
    road_elem.classList.add("road");
    road_elem.innerText = "Droga łączy miasto " + road.connection[0] + " z miastem " + road.connection[1] + ". Czas przejazdu wynosi: " + road.travel_time;
    roads_list.appendChild(road_elem);
}

fetch('../db.json')
    .then(resp => resp.json())
    .then(resp => {
        timer(resp.max_travel_time.max_travel_time);
        resp.cities.forEach( city => {
            if(city.fire_brigade === "true") {
                fire_brigade(city.city);
            } else {
                dest_city(city.city);
            }
        });
        resp.roads.forEach( road => { 
            roads(road);
        });
    });

