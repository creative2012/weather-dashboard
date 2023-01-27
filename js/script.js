$("#search").on("click", function (event) {
    event.preventDefault();
    getCityCoords();

});

// function getWeather(coords){
//     var baseURL = "https://api.openweathermap.org/data/2.5/forecast?"
//     var key ="&api-key=df399c578ec151e1ad2bd5287c70f3b8";
//     var lat = "q=" + coords[0].lat;
//     var lon = ''+ coords[0].lon;
//     var name = coords[0].name;
//     console.log(coords);
//     var queryURL = baseURL + query + key;
//     getData(queryURL, type)
   

// }
function getCityCoords(){
    var baseURL = "http://api.openweathermap.org/geo/1.0/direct?"
    var key ="&appid=df399c578ec151e1ad2bd5287c70f3b8";
    var query = "q=";

    query += $('#query').val();

    var queryURL = baseURL + query + key;
    getData(queryURL, 'coords')
        
    
}

function getData(queryURL, type){

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        if(type == 'coords'){
            getWeather(response);
        } else {

        }
       
        });

}