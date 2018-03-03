const container = document.getElementById('container');
const timer = document.createElement("div");
const cities_board = document.createElement("div");
timer.classList.add("timer");
cities_board.classList.add("cities_table");
container.appendChild(timer);
container.appendChild(cities_board);

( () => {
    fetch('../db.json')
        .then(resp => resp.json())
        .then(resp => {
            const cities = resp.cities;
            const roads = resp.roads;
            const time = resp.max_travel_time;

            timer.innerHTML = `<h1>Maximum travel time: ${time}min</h1>`;

            cities.forEach( city => {
                if(city.fire_brigade === "true") {
                    const new_city = document.createElement("div");
                    new_city.classList.add("fire_brigade");
                    new_city.dataset.city = city.city;
                    new_city.innerHTML = `<h1>Fire brigade in city ${city.city}</h1>
                                            <p>Cities in fire brigade district:</p>`;
                    cities_board.appendChild(new_city);
                } 
            });

            cities.forEach( city => {
                if(city.fire_brigade === "false") {
                    const dest_city = document.createElement("div");
                    dest_city.classList.add("dest_city");
                    dest_city.dataset.city = city.city;
                    dest_city.innerHTML = `<h2>City: ${city.city}</h2>`;
                    roads.forEach( road => {
                        if(road.connection.indexOf(city.city) !== -1) {
                            const time_info = document.createElement("p");
                            time_info.innerText = `Time to get here: ${road.travel_time}min`;
                            const fire_brigade_city = document.querySelector(`[data-city=${road.connection[road.connection.indexOf(dest_city.dataset.city) == 0 ? 1 : 0]}]`);
                            dest_city.appendChild(time_info);
                            fire_brigade_city.appendChild(dest_city);
                            if(road.travel_time <= time) {
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
