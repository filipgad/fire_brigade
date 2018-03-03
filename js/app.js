const container = document.getElementById('container');

const cities = () => {
    fetch('../db.json')
        .then(resp => resp.json())
        .then(resp => {
            const cities = resp.cities;
            const roads = resp.roads;
            const time = resp.max_travel_time;
            
            const timer = document.createElement("div");
            timer.classList.add("timer");
            timer.innerText = `Maximum travel time is: ${time}`;
            container.appendChild(timer);

            cities.forEach( city => {
                if(city.fire_brigade === "true") {
                    const new_city = document.createElement("div");
                    new_city.classList.add("fire_brigade");
                    new_city.dataset.city = city.city;
                    new_city.innerText = city.city;
                    container.appendChild(new_city);
                } 
            });

            cities.forEach( city => {
                if(city.fire_brigade === "false") {
                    const dest_city = document.createElement("div");
                    dest_city.classList.add("dest_city");
                    dest_city.dataset.city = city.city;
                    dest_city.innerText = city.city;
                    roads.forEach( road => {
                        if(road.connection[1] == city.city) {
                            dest_city.innerText = `City name: ${city.city}, time to get here: ${road.travel_time}`;
                            const new_city = document.querySelector(`[data-city=${road.connection[0]}]`);
                            new_city.appendChild(dest_city);
                            if(road.travel_time <= time) {
                                dest_city.style.border = "1px solid green";
                            } else {
                                dest_city.style.border = "1px solid red";
                            }
                        }

                    })
                }
            })
        });
}

cities();
