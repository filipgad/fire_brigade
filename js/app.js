( () => {

    const container = document.getElementById('container');
    const timer = document.querySelector('.timer');
    const citiesBoard = document.querySelector('.citiesBoard');

    fetch('../db.json')
        .then( resp => {
            if(!resp.ok) {
                throw new Error(resp.statusText);
            } else {
                return resp.json();
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
                if(city.fire_brigade === 'true') {
                    const newCity = document.createElement('div');
                    newCity.classList.add('fireBrigade');
                    newCity.dataset.city = city.city;
                    newCity.innerHTML = `<h1>Fire brigade in city ${city.city}</h1>
                                            <p>Cities in fire brigade district:</p>`;
                    citiesBoard.appendChild(newCity);
                } 
            });

            // Create cities without fire brigade
            cities.forEach( city => {
                if(city.fire_brigade === 'false') {
                    const destCity = document.createElement('div');
                    destCity.classList.add('destCity');
                    destCity.dataset.city = city.city;
                    destCity.innerHTML = `<h2>City: ${city.city}</h2>`;

                    // Find road connection between fire brigade and city
                    roads.forEach( road => {
                        if(road.connection.indexOf(city.city) !== -1) {
                            const timeInfo = document.createElement('p');
                            timeInfo.innerText = `Time to get here: ${road.travel_time}min`;
                            const fireBrigadeCity = document.querySelector(`[data-city=${road.connection[road.connection.indexOf(destCity.dataset.city) === 0 ? 1 : 0]}]`);
                            destCity.appendChild(timeInfo);
                            fireBrigadeCity.appendChild(destCity);

                            // Check if fire brigade could reach get to the city in maximum travel time
                            if(road.travel_time <= time) {
                                destCity.style.backgroundColor = '#86D175'; 
                            } else {
                                destCity.style.backgroundColor = '#CB8762';
                            }
                        }
                    });
                }
            });
        })
        .catch( err => {
            console.error('Error:', err); 
        });
})();
