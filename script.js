var animalTopics = ["alpaca", "whale", "bird", "tiger", "elephant", "swan", "turkey", "lion", "giraffe", "rhino"];
var currentGif;
var stillGif;
var animateGif;
var stopGif;

//function to make buttons
function makeButtons (){
	$("#animalButton").empty();

	for (var i = 0; i < animalTopics.length; i++)  {
		var createButton = $("<button>").text(animalTopics[i]).addClass("createButton").attr({'data-name':animalTopics[i]});
		$("#animalButton").append(createButton);
	}

	$(".createButton").on("click", function() {
		$(".animals").empty();

		var currentAnimal = $(this).data("name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentAnimal + "&limit=10&api_key=dc6zaTOxFJmzC";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(queryURL);


			currentGif = response.data;
			$().each(currentGif, function() {
				animateGif = response.data.image_original_url;
				pauseGif = response.data.image.original_still_url;

				var currentRating = response.data.rating;

				var rating = $("<h4>").html("Rated: " + currentRating).addClass("rating");

				stillGif = $("<img>").attr("data-animated", animateGif).attr("data-paused", pauseGif).attr("src", pauseGif).addClass("animateOnClick");
				var showGif = $("<button>").append(rating, stillGif);
				$(".animals").append(showGif);
			});

		});
	});
}

$(document).on("click", function(){
	$(this).attr("src", $(this).data('animated'));
});

$("#addNewAnimal").on("click", function(){
	var newAnimal = $("#animal-input").val().trim();
	animalTopics.push(newAnimal);
	makeButtons();
	return false;
});

makeButtons();



//event.preventDefault();
