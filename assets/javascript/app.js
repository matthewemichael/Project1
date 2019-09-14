$(document).ready(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
    });
});

function getRequest(searchTerm) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
       
        key: 'AIzaSyAMACXViqRIg-JUBahLgXauOQBkBKM63Ik',
        q: searchTerm + "travel"
        
    };
  
    $.getJSON(url, params, showResults);
}

function showResults(results) {
    var html = "";
    var entries = results.items;
    console.log(results)
    
    $.each(entries, function (index, value) {
        var title = value.snippet.title;
        var thumbnail = value.snippet.thumbnails.default.url;
        html += '<p>' + title + '</p>';
        html += '<img src="' + thumbnail + '">';
    }); 
    
    $('#search-results').html(html);
}

// $.ajax({
//     url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCvm25unjAOnBuZOkzfMIP-B5w8Oxq3MJ4&callback=initMap",
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     console.log(JSON.stringify(response))
//   });
  $.getJSON( {
    url  : 'https://maps.googleapis.com/maps/api/geocode/json',
    data : {
        sensor  : false,
        address : address
    },
    success : function( data, textStatus ) {
        console.log( textStatus, data );
    }
} );