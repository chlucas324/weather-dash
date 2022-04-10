// define variables
var key = "ef65ac2984fd01f84d27ea3510b43589";
var today = new Date();
var cityFormEl = document.querySelector("location-form");
var cityNameInputEl = document.querySelector("city");
var currentWeatherEl = document.querySelector("#current-weather");
var currentWeatherCardEl = document.querySelector("#current-weather-card");
var fiveDayForecastCardEl = document.querySelector("#five-day-forecast-card");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-body");
var weatherStatusEl = document.querySelector("weather-status");
var searchHistoryEl = document.querySelector("#search-history"); 
var searchHistoryButtonsEl = document.querySelector("#search-history-buttons");
var searchHistoryCardEl = document.querySelector("#history");
var searchHistoryArray = [];

var formSubmitHandler = function(event) {
    event.preventDefault();
// get city name from input form
var cityName = cityNameInputEl.value.trim();

//save city name in local storage and add search history buttons
// if (cityName) {
//     searchHistoryArray.push(cityName)
// }
// else {
//     alert("Please enter a city.");
// }
// }

//retrive information from openweather map api
var getWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ef65ac2984fd01f84d27ea3510b43589";

// make fetch request to retrive latitude and longitude
fetch (apiUrl)
    .then(function(locationResponse) {
        return locationResponse.json();
    })    
    .then(function(locationResponse) {

//define variables for latitude and longitude
        console.log(locationResponse)
        var latitude = locationResponse.coord.lat;
        var longitude = locationResponse.coord.lon;

//define variables for current city name, date, weather icon
var city = locationResponse.name;
var date = (today.getMonth() +1) + '/' + today.getDate() + '/' + today.getFullYear();
var currentIcon = locationResponse.weather[0].icon;
var currentIconLink = "<img src='http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";

// clear current weather container for new info
currentWeatherEl.textContent = "";
fiveDayForecastEl.textContent = "";

// update header to show city, date, weather icon
weatherStatusEl.innerHTML = city + " (" + date + ") " + currentIconLink;

// show current weather card
        currentWeatherCardEl.classList.remove("hidden");
        fiveDayForecastCardEl.classList.remove("hidden");

//fetch request to use long/lat in openweather map
    return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=ef65ac2984fd01f84d27ea3510b43589');
    })
    .then(function(response) {
        return response.json();
    })
    .then (function(response) {
        console.log(response);
        // response data for display
        displayWeather(response);
    });
};

// weather display on dashboard
var displayWeather = function(weather) {
    // has api returned data?
    if (weather.length === 0) {
        weatherBoxEl.textContent = "No data found.";
        return;
    }
    //temperature element
    var temperature = document.createElement('p');
    temperature.id = "temperature";
    temperature.innerHTML = "<strong>Temperature:</strong> " + weather.current.temp.toFixed(1) + "°F";
    currentWeatherEl.appendChild(temperature);

    //humidity element
    var humidity = document.createElement('p');
    humidity.id = "humidity";
    humidity.innerHTML = "<strong>Humidity:</strong> " + weather.current.humidity + "%";
    currentWeatherEl.appendChild(humidity);

    //wind element
    var windSpeed = document.createElement('p');
    windSpeed.id = "wind-speed";
    windSpeed.innerHTML = "<strong>Wind:</strong> " + weather.current.wind_speed.toFixed(1) + "mph";
    currentWeatherEl.appendChild(wind);

    //uvi element
    var uvi = document.createElement('p');
    var uviValue = weather.current.uvi.toFixed(1);
    uvi.id = "uv-index";
    if (uviValue >= 0) {
        uvi.className = "uvi-green"
    }
    if (uviValue >= 3) {
        uvi.className = "uvi-yellow"
    }
    if (uviValue >= 8) {
        uvi.className = "uvi-red"
    }
    uvi.innerHTML= "<strong>UV Index:</strong><span>" + uviValue + "</span>";
    currentWeatherEl.appendChild(uvi);
}