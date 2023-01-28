const key = "&appid=df399c578ec151e1ad2bd5287c70f3b8";
const today = $('#weather-view');
const forcast = $('#weather-forcast');
//function to get city coordinates from city name
function getCityCoords(city) {
    let baseURL = "http://api.openweathermap.org/geo/1.0/direct?"
    let query = "q=" + city;

    let queryURL = baseURL + query + key;
    getData(queryURL, 'coords');

}

//function to get weather data from coordinates
function getWeather(coords){
    current = true;
    let baseURL = "https://api.openweathermap.org/data/2.5/weather?"
    let lat = "lat=" + coords.lat;
    let lon = '&lon=' + coords.lon;
    let units = '&units=metric'

    let queryURL = baseURL + lat + lon + key + units;
    getData(queryURL, 'current');

    baseURL = "https://api.openweathermap.org/data/2.5/forecast?"
    queryURL = baseURL + lat + lon + key + units;
    getData(queryURL, 'forcast');
    

}

//function to add data to page
function popWeatherResult(dataSet,type) {
    if(type == 'current'){
        //clear results
        today.html('');
        populatePage(dataSet, type, null);
    } else {
        console.log(dataSet)
        //clear results
        forcast.html('');
        for (i = 0; i < 40; i = i+ 8) {
            populatePage(dataSet, type, i)
        };
    }
    
}

function populatePage(dataSet, type, i){
    
    var data;
    var heading;
    var target;
    var className;

    if(type == 'current') {
        var city = dataSet.name;
        target = today;
        className = 'main-data';
        data = dataSet
    } else {
        data = dataSet.list[i];
        var date = data.dt_txt;
        target = forcast;
        className = 'forcast-data';
    }

    let iconDataLocation = data.weather[0];
    //get icon image and alt
    let iconcode = iconDataLocation.icon;
    let alt = iconDataLocation.main;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    //get weather data
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    if(type == 'current') {
        heading = `<h2 class="city">${city}<span> ${moment().format('MMMM Do YYYY')}</span><img src="${iconurl}"  alt="${alt}"></h2>`;
    } else {
        heading = `<div class="date">${moment(date).format('l')} </br> <img src="${iconurl}"  alt="${alt}"></div>`;
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
    

}

//function to call ajax request
function getData(queryURL, type) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (type == 'coords') {
            getWeather(response[0]);

        } else {
           
            popWeatherResult(response, type);

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



