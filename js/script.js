
function getCityCoords(city) {
    let baseURL = "http://api.openweathermap.org/geo/1.0/direct?"
    let key = "&appid=df399c578ec151e1ad2bd5287c70f3b8";
    let query = "q=" + city;

    let queryURL = baseURL + query + key;
    getData(queryURL, 'coords');

}

function getWeather(coords) {
    let baseURL = "https://api.openweathermap.org/data/2.5/forecast?"
    let key = "&appid=df399c578ec151e1ad2bd5287c70f3b8";
    let lat = "lat=" + coords[0].lat;
    let lon = '&lon=' + coords[0].lon;
    let units = '&units=metric'

    let queryURL = baseURL + lat + lon + key + units ;
    getData(queryURL, 'weather');

}

function popPage(data){
    console.log(data);

    //city name / date / temp / wind / humidity
}

function getData(queryURL, type) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (type == 'coords') {
            getWeather(response);
        } else if (type == 'weather')  {
            popPage(response);
        }

    });

}

function saveData(){

}

$("#search").on("click", function (event) {
    event.preventDefault();
    getCityCoords($('#query').val());

});