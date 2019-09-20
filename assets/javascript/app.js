searchTerm = $('#query').val();
        getRequest(searchTerm);
        onWeather(searchTerm);
        
$(document).ready(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        searchTerm = $('#query').val();
        getRequest(searchTerm);
        onWeather(searchTerm);
        moveMapToBerlin(map);

    });

});
var coordss = "";
var latCords = 36.16;
var lonCords = -86.77;

//-----------------YouTube---------------//
//youtube api request
function getRequest(searchTerm) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'AIzaSyAMACXViqRIg-JUBahLgXauOQBkBKM63Ik',
        q: searchTerm + "travel",
        maxResults: 10

    };

    $.getJSON(url, params, showResults);
}

// display youtube search results
function showResults(results) {
    var html = "";
    var entries = results.items;
    console.log(results)

    $.each(entries, function (index, value) {
        var title = value.snippet.title;
        var thumbnail = value.snippet.thumbnails.default.url;
        var vidId = value.id.videoId

        html += "<div class='vidThumb'>";
        html += "<img src=" + thumbnail + ">";
        html += '<span class="play-video animated " data-url="https://www.youtube.com/embed/' + vidId + '?autoplay=1" onclick="playVideo(this)">Play Video</span></div>';
    });

    $('#search-results').html(html);
}

//play youtube video
function playVideo(element) {
    var vidurl = $(element).data('url');
    console.log(vidurl);
    $("#player").html('<iframe type="text/html" width="640" height="390" src="' + vidurl + '" frameborder="0"></iframe>');
    $("#player").prepend('<p><button class="btn btn-primary close-video">Close Video</button></p>');
}

function clearContent() {
    $("#player").empty();
}

$(document).on("click", ".close-video", clearContent)

// __________________________________________________________________

// Makes the to-do list 

function renderTodos(list) {

    // empties out the html
    $("#to-dos-listed").empty();

    // render our todos to the page
    for (var i = 0; i < list.length; i++) {
        // Var holds "<p>" tag 
        var toDoItem = $("<h4>");

        toDoItem.append()
        // List is in text form  
        toDoItem.text(list[i]);
        
        // Creates the button
        var closeButton = $("<button>");

        // Creates new attribute
        closeButton.attr("data-to-do", i);

        // Creates new class
        closeButton.addClass("checkbox");

        toDoItem = toDoItem.prepend(closeButton);

        // Add the button and to do item to the to-dos div
        $("#to-dos-listed").append(toDoItem);
    }
}

$("#add-list-item").on("click", function (event) {
    event.preventDefault();
    if ($('#list').val().trim() == "") {
        return false;
    } else {
    // Get the to-do "value" from the textbox and store it as a variable
    var toDoIdea = $("#list").val().trim();
        console.log(toDoIdea);

    list.push(toDoIdea);

    renderTodos(list);

    // Save the to-dos into localstorage
    localStorage.setItem("toDoList", JSON.stringify(list));

    // Clear the textbox when user has submitted their data
    $("#list").val("");
}});

// When a user clicks a check box then delete teh data
$(document).on("click", ".checkbox", function () {

    // Get the number of the button from its data attribute and hold in a variable called toDoNumber.
    var toDoNumber = $(this).attr("data-to-do");

    // Deletes the item when checked
    list.splice(toDoNumber, 1);

    // Update the todos on the page
    renderTodos(list);

    // Save the todos into localstorage using JSON
    localStorage.setItem("toDoList", JSON.stringify(list));
});

// Load the todos from localstorage
var list = JSON.parse(localStorage.getItem("toDoList"));

// Checks to see if the todolist exists in localStorage and is an array currently 
// If not, set a local list variable to an empty array 
// Otherwise list is our current list of todos
if (!Array.isArray(list)) {
    list = [];
}

// Render our todos when page loads
renderTodos(list);

function onWeather() {
    var searchWeather = $('#query').val();
    // this is where weather App Ajax call goes
    var APIKey = "bf0e222c472584b5d4726ba1c728ad06";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchWeather + ",Burundi&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object

            console.log(response);
            // this section is where we store longitue and latitude in varaibles from the weather app so we can use in the maps app
            var lonCords = response.coord.lon;
            var latCords = response.coord.lat;

var iconcode=response.weather[0].icon;
// console.log(weathericon);
// var weatherurl="http://openweathermap.org/img/wn/" +weathericon+ ".png"
// console.log(weatherurl);
// weathericonurlname= $("<img>");
// $(".iconic")attr("src", weatherurl);
// var iconcode = a.weather[0].icon;
// After it you should concatenate this var iconcode with the url that contains the icons, like:

        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
// Finally just change src attribute in the DOM by doing this:

        $('#wicon').attr('src', iconurl);


            // Transfer content to HTML
            $(".city").html("<h4>" + response.name + "</h4>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temp: " + response.main.temp);

            // Log the data in the console as well
            console.log("Wind: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
            map.setCenter({ lat: latCords, lng: lonCords });
            // console.log("lat:"+latCords+",lng:"+lonCords);
        });
};
// this is where we store the api Key for the here Maps
var apikey = '8-jdDwscP_LhVyGQhWuG0z0ZjdUVl-LGrhfeQjIeOzY';
function moveMapToBerlin(map) {
    console.log(latCords);
    map.setCenter({ lat: latCords, lng: lonCords });
    map.setZoom(14);
}
/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
    apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
    center: { lat: latCords, lng: lonCords },
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1

});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
    moveMapToBerlin(map);
}
