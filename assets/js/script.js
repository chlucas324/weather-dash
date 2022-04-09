// variable selects form 
var locationEl = document.querySelector("#location");
// variable selects input
var cityInputEl = document.getElementById("city");
// variable selects container for search history
var cityContainerEl = document.querySelector("#city-container");
// variable selects city searched
var locationSearchEl = document.querySelector("#location-search-term");
var citySearch = cityInputEl.value.trim();


var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var citySearch = cityInputEl.value.trim();

    if (citySearch) {
    weatherDisplay(citySearch)     
    } else {
        alert ("Please enter a city.");
    }
};


var weatherDisplay = function(citySearch) {

    //format the api url
    var key = "ef65ac2984fd01f84d27ea3510b43589";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&appid=' + key;  
    
    //make a get request to url
    fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            createWeather(data, citySearch);
        });
    }else {
        alert("Unable to display weather");
    }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
  };
    // window.onload = function() {
    // weatherDisplay( 6167865 );
//   }

  // take weather data as a parameter and insert it into div elements
//   function createWeather(data) {
//       var celcius = Math.round(parseFloat(data.main.temp)-273.15);
//     //   var fahrenheit = Math.round((parseFloat(data.main.temp)-273.15)*1);

//       document.getElementById("icon").innerHTML = data[i].weather.icon;
//       document.getElementById("temp").innerHTML = celcius + "&deg;";
//       document.getElementById("wind").innerHTML = data[i].wind.speed;
//       document.getElementById("humidity").innerHTML = data[i].main.humdity;
//       document.getElementById("uvi").innerHTML = data[i].current.uvi;

//   }

  locationEl.addEventListener("submit", formSubmitHandler);
  