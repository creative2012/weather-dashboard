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
function getWeather(coords) {
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
function popWeatherResult(dataSet, type) {
    $('#forcast-title').fadeTo(1000, 1);
    if (type == 'current') {
        //clear results
        today.html('');
        //populate page
        var fade = populatePage(dataSet, type, null);
        fade.fadeTo(1000, 1);
    } else {
        //clear results
        forcast.html('');
        var fiveDay = 0;
        const day = moment().add(1, 'days');
        for (i = 0; i < 40; i++) {
            //populate page
            data = dataSet.list[i];
            let date = moment(data.dt_txt).format('ddd Do MMMM YYYY');
            if (date == day.format('ddd Do MMMM YYYY')) {
                let fade = populatePage(dataSet, type, i);
                fade.fadeTo(1000, 1);
                fiveDay++;
                day.add(1, 'days');
            }
        }
        if (fiveDay != 5) {
            console.log('on no :' + fiveDay);
        }
    }
}
//function to populate html
function populatePage(dataSet, type, i) {

    var data;
    var heading;
    var target;
    var className;
    //check if current weather or forcast
    if (type == 'current') {
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
    //get icon image and alt
    let iconcode = data.weather[0].icon;
    let alt = data.weather[0].main;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    //get weather data
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    //check if current weather or forcast
    if (type == 'current') {
        heading = `<h2 class="city">${city}<span> ${moment().format('ddd Do MMMM YYYY')}</span><img src="${iconurl}"  alt="${alt}"></h2>`;
    } else {
        heading = `<div class="date">${moment(date).format('ddd Do')} </br> <img src="${iconurl}"  alt="${alt}"></div>`;
    }
    //create elelemtent and set attributes and inner html
    let weatherElement = $('<div>');
    weatherElement.attr('class', className);
    weatherElement.html(`
    ${heading}
    <div class="temp">Temp: ${temp} °C</div>
    <div class="wind">Wind: ${wind} m/s</div>
    <div class="humidity">Humidity: ${humidity}%</div>
    `);
    //add to page
    target.append(weatherElement);
    return weatherElement;

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

//function to save calender event
function saveToLocalStorage(city) {

    //check if data in local storage and return it if so
    var data = checkLocalStorage();
    //if data exists, push new item
    if (data != false) {
        //check ifsearch already in history
        if (!data.includes(city)) {
            data.push(city);
            addHistory(city);
        } else {
            return;
        }
    } else {
        //if no data create new array
        data = [city];
        addHistory(city);
    }
    //save to local storage
    localStorage.setItem('search', JSON.stringify(data));

}
//function to check local storage data
function checkLocalStorage() {
    //check if calender data available for current day
    let data = JSON.parse(localStorage.getItem('search'));
    //if data available add to array and return
    if (data != null) {
        let search = [];
        for (i = 0; i < data.length; i++) {
            search.push(data[i]);
        };
        return search;
    } else {
        //if no data in local storage
        return false;
    }
}
//function to populate buttons from storage
function populateFromLocalStorage(data) {

    if (data != null) {
        for (i = 0; i < data.length; i++) {
            let newBtn = `<button type="submit" class="clickEvent" data-city="${data[i]}">${data[i]}</button>`
            $('#search-history').append(newBtn);
        };

    }

}
//function to add history button on new search query
function addHistory(city) {
    let newBtn = `<button type="submit" class="clickEvent" data-city="${city}">${city}</button>`
    $('#search-history').append(newBtn);

}
//function to initiate page on load
function init() {
    let data = checkLocalStorage();
    if (data != null) {
        populateFromLocalStorage(data);
    }
}



//click listener for search button
$("#search").on("click", function (event) {
    event.preventDefault();
    let city = $('#query').val();
    if (city != '') {
        getCityCoords(city);
        saveToLocalStorage(city);
    }

    $('#query').val('');


});
$("#search-history").on("click", function (event) {
    event.preventDefault();
    if (event.target.classList.contains('clickEvent')) {
        let city = $(event.target).data('city');
        getCityCoords(city);
    }


});

init();