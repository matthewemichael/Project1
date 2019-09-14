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

// __________________________________________________________________

// Makes the to-do list 

function renderTodos(list) {
    
    // empties out the html
    $("#to-dos-listed").empty(); 

    // render our todos to the page
    for (var i = 0; i < list.length; i++) {
        // Var holds "<p>" tag 
        var toDoItem = $("<p>");

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

$("#add-list-item").on("click", function(event) {
    event.preventDefault();

    // Get the to-do "value" from the textbox and store it as a variable
    var toDoIdea = $("#list").val().trim();


    list.push(toDoIdea);

    renderTodos(list);

    // Save the to-dos into localstorage
    localStorage.setItem("toDoList", JSON.stringify(list));

    // Clear the textbox when user has submitted their data
    $("#list").val("");
});

// When a user clicks a check box then delete teh data
$(document).on("click", ".checkbox", function() {

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

