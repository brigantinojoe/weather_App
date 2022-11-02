var apiKey = "82273e2ffbfbb5621069d2976422e5ca";
var searchButton = document.querySelector(".search-button");
var forecastEl = document.querySelector(".forecast-row").children;
var city = "San Diego";
var forecastArray = [];
// Query Select Elements

// Five day forecast: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// Found going here: https://openweathermap.org/forecast5#name5

var forecast = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(result => {
        var cityName = result.city.name;
        for (let i = 0; i < result.list.length; i++) {
            const element = result.list[i].dt_txt;
            var hour = moment(element, "YYYY-MM-DD hh:mm:ss").format("HH");
            if (hour === "12") {
                var windSpeed = `Wind: ${result.list[i].wind.speed} MPH`;
                var temp = `Temp: ${result.list[i].main.temp} \u2109`;
                var icon = result.list[i].weather[0].icon;
                var humidity = `Humidity: ${result.list[i].main.humidity}%`;
                var date = moment(result.list[i].dt_txt, "YYYY-MM-DD hh:mm:ss").format("MM/DD/YY");
                forecastArray.push([date, icon, temp, windSpeed, humidity]);
            }
        }
        forecastLoop();
    }
    )
    .catch(error => console.log('error', error));

// Find lat/lon by zip code: http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}
// May use city name for current weather: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// May use lat/long cor current weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Use search information to create URL parameters. Use these to search the API.

// Fetch API. Create a separate function so the original search button and
// local storage buttons can run through the function

// Use local storage array to dynamically create buttons after the search button is clicked.

var forecastLoop = function () {
    for (let x = 0; x < forecastEl.length; x++) {
        for (let y = 0; y < forecastArray.length; y++) {
            var El = forecastEl[x].children[y];
            var text = forecastArray[x][y];
            console.log(El);
            if (y === 1) {
                El.setAttribute("src", `http://openweathermap.org/img/w/${text}.png`);
            }
            else{El.textContent = text;}
        }
    }
}