// define variables
var today = new Date();
var cityFormEl = document.querySelector("#city-form");
var cityNameInputEl = document.querySelector("#cityName");
var currentWeatherEl = document.querySelector('#current-weather');
var currentWeatherCardEl = document.querySelector("#current-weather-card")
var fiveDayCardEl = document.querySelector("#five-day-forecast-card");
var fiveDayEl = document.querySelector("#five-day-forecast-body");
var weatherStatusEl = document.querySelector('#weather-status');
var searchEl = document.querySelector('#search');
var historyButtonsEl = document.querySelector("#history-buttons")
var historyCardEl = document.querySelector("#history")
var trashEl = document.querySelector("#trash")
var searchHistoryArray = []

var formSubmitHandler = function (event) {
    event.preventDefault();

// get city name from input form
var cityName = cityNameInputEl.value.trim();

//save city name in local storage and add search history buttons
if (cityName) {
    searchHistoryArray.push(cityName);
    localStorage.setItem("weatherSearch", JSON.stringify(searchHistoryArray));
    var searchHistoryEl = document.createElement('button');
    searchHistoryEl.className = "btn";
    searchHistoryEl.setAttribute("data-city", cityName)
    searchHistoryEl.innerHTML = cityName;
    historyButtonsEl.appendChild(searchHistoryEl);
    historyCardEl.removeAttribute("style")
    getWeatherInfo(cityName);
    cityNameInputEl.value = "";
}
else {
    alert("Please enter a City name");
}

}


//retrive information from openweather map api
var getWeatherInfo = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ef65ac2984fd01f84d27ea3510b43589";

// make fetch request to retrive latitude and longitude
fetch (apiUrl)
.then(function (cityResponse) {
    return cityResponse.json();
})
.then(function (cityResponse) {
console.log(cityResponse)

//define variables for latitude and longitude
var latitude = cityResponse.coord.lat;
var longitude = cityResponse.coord.lon;

//define variables for current city name, date, weather icon
var city = cityResponse.name;
var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
var weatherIcon = cityResponse.weather[0].icon;
var weatherDescription = cityResponse.weather[0].description;
var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />"

// clear current weather container for new info
currentWeatherEl.textContent = "";
fiveDayEl.textContent = "";

// update header to show city, date, weather icon
weatherStatusEl.innerHTML = city + " (" + date + ") " + weatherIconLink;

// show current weather card
currentWeatherCardEl.classList.remove("hidden");
fiveDayCardEl.classList.remove("hidden");

//fetch request to use long/lat in openweather map
return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=ef65ac2984fd01f84d27ea3510b43589');
})
    .then(function(response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        // response data for display
        displayWeather(response);
    });
};

// weather display on dashboard
var displayWeather = function(weather) {
    // has api returned data?
    if (weather.length === 0) {
        weatherContainerEl.textContent = "No weather data found.";
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
    windSpeed.innerHTML = "<strong>Wind Speed:</strong> " + weather.current.wind_speed.toFixed(1) + " MPH";
    currentWeatherEl.appendChild(windSpeed);

    //uvi element
    var uvIndex = document.createElement('p');
    var uvIndexValue = weather.current.uvi.toFixed(1);
    uvIndex.id = "uv-index";
    if (uvIndexValue >= 0) {
        uvIndex.className = "uv-index-green"
    }
    if (uvIndexValue >= 3) {
        uvIndex.className = "uv-index-yellow"
    }
    if (uvIndexValue >= 8) {
        uvIndex.className = "uv-index-red"
    }
    uvIndex.innerHTML = "<strong>UV Index:</strong> <span>" + uvIndexValue + "</span>";
    currentWeatherEl.appendChild(uvIndex);

// retrieve extended forecast
 var forecastArray = weather.daily;

 //create 5 cards for 5 day forecast
 for (let i = 0; i < forecastArray.length - 3; i++) {
    var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
    var weatherIcon = forecastArray[i].weather[0].icon;
    var weatherDescription = forecastArray[i].weather[0].description;
    var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />"
    var dayEl = document.createElement("div");
    dayEl.className = "day";
    dayEl.innerHTML = "<p><strong>" + date + "</strong></p>" +
        "<p>" + weatherIconLink + "</p>" +
        "<p><strong>Temp:</strong> " + forecastArray[i].temp.day.toFixed(1) + "°F</p>" +
        "<p><strong>Humidity:</strong> " + forecastArray[i].humidity + "%</p>" + "<p><strong>Wind Speed:</strong> " + forecastArray[i].wind_speed + " MPH</p>";

    fiveDayEl.appendChild(dayEl);
}
}

// past weather searches
var loadHistory = function () {
    searchArray = JSON.parse(localStorage.getItem("weatherSearch"));

    if (searchArray) {
        searchHistoryArray = JSON.parse(localStorage.getItem("weatherSearch"));
        for (let i = 0; i < searchArray.length; i++) {
            var searchHistoryEl = document.createElement('button');
            searchHistoryEl.className = "btn";
            searchHistoryEl.setAttribute("data-city", searchArray[i])
            searchHistoryEl.innerHTML = searchArray[i];
            historyButtonsEl.appendChild(searchHistoryEl);
            historyCardEl.removeAttribute("style");
        }

    }
}

// search for weater using search history

var buttonClickHandler = function (event) {
    var cityName = event.target.getAttribute("data-city");
    if (cityName) {
        getWeatherInfo(cityName);
    }
}

//clear history

var clearHistory = function (event) {
    localStorage.removeItem("weatherSearch");
    historyCardEl.setAttribute("style", "display: none");
}

cityFormEl.addEventListener("submit", formSubmitHandler);
historyButtonsEl.addEventListener("click", buttonClickHandler);
trashEl.addEventListener("click", clearHistory);

loadHistory();