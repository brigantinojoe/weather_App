var apiKey = "82273e2ffbfbb5621069d2976422e5ca";
var searchButton = document.querySelector(".search-button");
var forecastEl = document.querySelector(".forecast-row").children;
var city = "San Diego";
// Query Select Elements

// Five day forecast: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// Found going here: https://openweathermap.org/forecast5#name5

var fetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(result => {
            var cityName = result.city.name;
            for (let i = 0; i < result.list.length; i++) {
                const element = result.list[i].dt_txt;
                var hour = moment(element, "YYYY-MM-DD hh:mm:ss").format("HH");
                if (hour === "12") {
                    var windSpeed = result.list[i].wind.speed;
                    var temp = result.list[i].main.temp;
                    var icon = result.list[i].weather[0].icon;
                    var humidity = result.list[i].main.humidity;
                    var dt_text = result.list[i].dt_txt;
                    var date = moment(dt_text, "YYYY-MM-DD hh:mm:ss").format("MM/DD/YY");
                    console.log(windSpeed);
                    console.log(temp);
                    console.log(icon);
                    console.log(humidity);
                    console.log(date);
                }
            }
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