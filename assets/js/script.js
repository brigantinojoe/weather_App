var apiKey = "82273e2ffbfbb5621069d2976422e5ca";
var searchButton = document.querySelector(".search-button");
var searchBar = document.querySelector(".search-bar");
var forecastEl = document.querySelector(".forecast-row").children;
var city = "San Diego";
var inputEl = document.querySelector("input");

var mainEl = document.querySelector("main");
var currentEl = mainEl.children[1].children[0].children;
var newButtons = mainEl.children[0];
// Query Select Elements
currentWeather(city);
fivedayForecast(city);

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function currentWeather(city) {

    var current = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82273e2ffbfbb5621069d2976422e5ca&units=imperial`, requestOptions)
        .then(response => response.json())
        .then(result => {
            var cityName = result.name;
            var windSpeed = `Wind: ${result.wind.speed} MPH`;
            var temp = `Temp: ${result.main.temp} \u2109`;
            var icon = result.weather[0].icon;
            var humidity = `Humidity: ${result.main.humidity}%`;
            var date = moment().format("MM/DD/YY");
            var topRow = `${cityName}, ${date} <img src="http://openweathermap.org/img/w/${icon}.png" alt="">`;
            currentEl[0].innerHTML = topRow;
            currentEl[1].textContent = temp;
            currentEl[2].textContent = windSpeed;
            currentEl[3].textContent = humidity;
        })
        .catch(error => console.log('error', error));
}

function fivedayForecast(city) {
    var forecastArray = [];
    var forecast = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(result => {
            var count = 0;
            for (let i = 0; i < result.list.length; i++) {
                const element = result.list[i].dt_txt;
                var hour = moment(element, "YYYY-MM-DD hh:mm:ss").format("HH");
                var tomorrow = moment(element, "YYYY-MM-DD hh:mm:ss").format("DD");
                var today = moment().format("DD");
                // Using the hour to select the data might not be the best. 
                if (hour === "12" && parseInt(today) < parseInt(tomorrow) || i === result.list.length - 1) {
                    if (count === 5) {
                        forecastLoop();
                    } else {
                        var windSpeed = `Wind: ${result.list[i].wind.speed} MPH`;
                        var temp = `Temp: ${result.list[i].main.temp} \u2109`;
                        var icon = result.list[i].weather[0].icon;
                        var humidity = `Humidity: ${result.list[i].main.humidity}%`;
                        var date = moment(result.list[i].dt_txt, "YYYY-MM-DD hh:mm:ss").format("MM/DD/YY");
                        forecastArray.push([date, icon, temp, windSpeed, humidity]);
                    }
                    count += 1;
                }
            }
            forecastLoop(forecastArray);
        }
        )
        .catch(error => console.log('error', error));
}

// May use city name for current weather: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Fetch API. Create a separate function so the original search button and
// local storage buttons can run through the function
// Use local storage array to dynamically create buttons after the search button is clicked.

var forecastLoop = function (forecastArray) {
    for (let x = 0; x < forecastEl.length; x++) {
        for (let y = 0; y < forecastArray.length; y++) {
            var El = forecastEl[x].children[y];
            var text = forecastArray[x][y];
            if (y === 1) {
                El.setAttribute("src", `http://openweathermap.org/img/w/${text}.png`);
            }
            else { El.textContent = text; }
        }
    }
}

var buttonArray = [];
var storageCount = localStorage.length;
var searchEntry = function (event) {
    event.preventDefault();
    if (event.target.textContent !== "Search" && event.target.tagName === "BUTTON") {
        value = event.target.textContent;
        console.log(value);
        currentWeather(value);
        fivedayForecast(value);
    }
    if (event.target.textContent === "Search") {
        var value = inputEl.value.trim();
        if (buttonArray.map(element => {return element.toLowerCase()}).indexOf(`${value.toLowerCase()}`) !== -1) {
            currentWeather(value);
            fivedayForecast(value);
            return;
        }
        buttonArray.push(value);
        newButtons.appendChild(document.createElement("button")).className = `w-100 mt-2 btn btn-info search-button`;
        searchBar.children[0].lastChild.textContent = value;
        localStorage.setItem(`savedButton${storageCount}`, value);
        storageCount += 1;
        console.log(value);
        currentWeather(value);
        fivedayForecast(value);
    }
}

searchBar.addEventListener("click", searchEntry);

for (let t = 0; t < localStorage.length; t++) {
    const element = localStorage.getItem(`savedButton${t}`);
    newButtons.appendChild(document.createElement("button")).className = `w-100 mt-2 btn btn-info search-button`;
    searchBar.children[0].lastChild.textContent = element;
    buttonArray.push(element);
}