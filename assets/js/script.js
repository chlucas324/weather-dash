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

locationEl.addEventListener("submit", formSubmitHandler);
  
var weatherDisplay = function(citySearch) {

    //format the api url
    var key = "ef65ac2984fd01f84d27ea3510b43589";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='  + citySearch + '&appid=' + key + '&cnt=6';  
    

    //make a get request to url
    fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    } 
// add city name to card
// var mainDiv = document.getElementById("card-text-city-name");
// var locationName = document.createElement("h2");
// locationName.textContent = citySearch;
// locationName.classList = "city-details col-8 border border-dark";
// mainDiv.append(citySearch);            

let row = document.querySelector(".city-details");


row.innerHTML = response.daily
// .map((day, idx) => {
//     if (idx <= 6) 
    {
        var dt = new Date(day.dt * 1000);// timestamp * 1000
        
        return `<div class="col">
        <div class="card">
        <h3 class="card-text">city ${city.name}</h3>
        <h4 class="card-text">${dt.toDateString()}</h4>
        <img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" class="card-img-top" alt="${day.weather[0].description}"/> 
        <div class="card-body">
            <p class="card-text">Temp: ${main[0].temp}</p>
            <p class="card-text">Humidity: ${main[0].humidity}</p>
            <p class="card-text">Wind: ${wind[0].speed}</p>
            <p class="card-text">UV Index: ${main[0].uvi}</p>
        </div>
        </div>`;
    }   

})
// .join('')
};