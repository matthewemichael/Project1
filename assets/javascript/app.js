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
        var vidId = value.id.videoId

        html += "<p>" + title + "</p>";
        html += "<a href='https://www.youtube.com/watch?v=" + vidId + "' target='blank'><img src='" + thumbnail + "'></a>";
    }); 
    
    $('#search-results').html(html);
}