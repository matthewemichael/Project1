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

        html += "<div class='vidThumb'>";
        html += "<img src=" + thumbnail + ">";
        html += '<span class="play-video" data-url="http://www.youtube.com/embed/'+vidId+'?autoplay=1" onclick="playVideo(this)">Play Video</span></div>';
    }); 
    
    $('#search-results').html(html);
}

//play video
function playVideo(element){
    var vidurl = $(element).data('url');
    console.log(vidurl);
    $("#player").html('<iframe type="text/html" width="640" height="390" src="'+vidurl+'" frameborder="0"></iframe>');
}