
var soccerAthletes = ["paul pogba", "lionel messi", "ronaldo"];

$(document).ready(function() {
    for (var i = 0; i < soccerAthletes.length; i++) {
        $("#athlete-buttons").append("<button type='button' onclick='searchGif(\"" + soccerAthletes[i] + "\")' class='btn btn-primary' value=' " + soccerAthletes[i] + "'> " + soccerAthletes[i] + " </button>");
    }
});

function athleteButtonClicked() {
    var userInput = $('#athlete-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#athlete-input').val();

    if (userInput) {
        $('#athlete-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(topic) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + topic + ' &api_key=eFLnWjuMiL1rokywNMj7ZbBMegoid1Sx',
            type: 'GET',
        }).done((response)=>
        {
            showGif(response);
        })
}

function showGif(response) {
    $('#athletes').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage img-fluid">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#athletes').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}