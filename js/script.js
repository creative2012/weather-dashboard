const key = "&appid=df399c578ec151e1ad2bd5287c70f3b8";
var first = true;
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

    let queryURL = baseURL + lat + lon + key + units;
    getData(queryURL, 'weather');

}

//function to add data to page
function popWeatherResult(dataSet) {
    let city = dataSet.city.name
    for (i = 0; i < 6; i++) {
        data = dataSet.list[i];
        //get main data sources
        let iconDataLocation = data.weather[0];
        let weatherDataLocation = data;
        let date = weatherDataLocation.dt_txt;
        //get icon image and alt
        let iconcode = iconDataLocation.icon;
        let alt = iconDataLocation.main;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        //get weather data
        let temp = weatherDataLocation.main.temp;
        let wind = weatherDataLocation.wind.speed;
        let humidity = weatherDataLocation.main.humidity;
        //check if item to display is today if so set variables
        var heading = `<div class="date">${moment(date).format('l')} </div>`;
        var target = $('#weather-forcast');
        var className = 'forcast-data';
        if (first) {
            heading = `<h2 class="city">${city}<span> ${moment(date).format('MMMM Do YYYY')}</span><img src="${iconurl}"  alt="${alt}"></h2>`;
            target = $('#weather-view');
            className = 'main-data';
            first = false;
        } else {

        }
        //create elelemtent and set attributes and inner html
        let weatherElement = $('<div>');
        weatherElement.attr('class', className);
        weatherElement.html(`
        ${heading}
        <div class="temp">Temp: ${temp}</div>
        <div class="wind">Wind: ${wind}</div>
        <div class="humidity">Humidity: ${humidity}</div>
        `);
        //add to page
        target.append(weatherElement);


    };
    first = true;
}

//function to call ajax request
function getData(queryURL, type) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (type == 'coords') {
            getWeather(response[0]);

        } else if (type == 'weather') {

            popWeatherResult(response);

        }

    });

}

//function to save data
function saveData() {

}

//click listener for search button
$("#search").on("click", function (event) {
    event.preventDefault();
    getCityCoords($('#query').val());

});