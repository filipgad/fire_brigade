( () => {

    const container = document.getElementById('container');
    const timer = document.createElement("div");
    const cities_board = document.createElement("div");
    timer.classList.add("timer");
    cities_board.classList.add("cities_table");
    container.appendChild(timer);
    container.appendChild(cities_board);

    fetch('../db.json')
        .then( resp => {
            if(resp.ok) {
                return resp.json();
            } else {
                throw new Error('Error!');
            }
        })
        .then( data => {
            const cities = data.cities;
            const roads = data.roads;
            const time = data.max_travel_time;

            // Maximum travel time information
            timer.innerHTML = `<h1>Maximum travel time: ${time}min</h1>`;

            // Create cities with fire brigade
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

            // Create cities without fire brigade
            cities.forEach( city => {
                if(city.fire_brigade === "false") {
                    const dest_city = document.createElement("div");
                    dest_city.classList.add("dest_city");
                    dest_city.dataset.city = city.city;
                    dest_city.innerHTML = `<h2>City: ${city.city}</h2>`;

                    // Find road connection between fire brigade and city
                    roads.forEach( road => {
                        if(road.connection.indexOf(city.city) !== -1) {
                            const time_info = document.createElement("p");
                            time_info.innerText = `Time to get here: ${road.travel_time}min`;
                            const fire_brigade_city = document.querySelector(`[data-city=${road.connection[road.connection.indexOf(dest_city.dataset.city) === 0 ? 1 : 0]}]`);
                            dest_city.appendChild(time_info);
                            fire_brigade_city.appendChild(dest_city);

                            // Check if fire brigade could reach get to the city in maximum travel time
                            if(road.travel_time <= time) {
                                dest_city.style.backgroundColor = "#86D175"; 
                            } else {
                                dest_city.style.backgroundColor = "#CB8762";
                            }
                        }
                    });
                }
            });
        })
        .catch( err => {
            console.log('Error!', err); 
        });
})();
