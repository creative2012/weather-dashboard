const key = "&appid=df399c578ec151e1ad2bd5287c70f3b8";

//function to get city coordinates from city name
function getCityCoords(city) {
    let baseURL = "http://api.openweathermap.org/geo/1.0/direct?"
    let query = "q=" + city;

    let queryURL = baseURL + query + key;
    getData(queryURL, 'coords');

}

//function to get weather data from coordinates
function getWeather(coords) {
    let baseURL = "https://api.openweathermap.org/data/2.5/forecast?"
    let lat = "lat=" + coords.lat;
    let lon = '&lon=' + coords.lon;
    let units = '&units=metric'

    let queryURL = baseURL + lat + lon + key + units ;
    getData(queryURL, 'weather');

}

//function to add data to page
function popWeatherResult(data, target, className){
    console.log(data);

    let iconDataLocation = data.list[0].weather[0];
    let weatherDataLocation = data.list[0];
    //get city name and date
    let city = data.city.name
    let date = weatherDataLocation.dt_txt;
    //get icon image and alt
    let iconcode = iconDataLocation.icon;
    let alt = iconDataLocation.main;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    //get weather data
    let temp = weatherDataLocation.main.temp;
    let wind = weatherDataLocation.wind.speed;
    let humidity = weatherDataLocation.main.humidity;

    var weatherElement = $('<div>');
    weatherElement.attr('class', className);
    var heading = '';
    if(className == 'main-data'){
        heading = `<h2 class="city">${city}<span> ${moment(date).format('MMMM Do YYYY')}</span><img src="${iconurl}"  alt="${alt}"></h2>`
    } else {
        heading = `<div class="date">21.01.2023 </div>`
    }
    weatherElement.html(`
        ${heading}
        <div class="temp">Temp: ${temp}</div>
        <div class="wind">Wind: ${wind}</div>
        <div class="humidity">Humidity: ${humidity}</div>
    `);
    target.append(weatherElement);
}

//function to call ajax request
function getData(queryURL, type) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (type == 'coords') {
            getWeather(response[0]);

        } else if (type == 'weather')  {
            let target = $('#weather-view');
            let className = 'main-data';
            popWeatherResult(response, target,className );
        }

    });

}

//function to save data
function saveData(){

}

//click listener for search button
$("#search").on("click", function (event) {
    event.preventDefault();
    getCityCoords($('#query').val());

});