$(document.body).on("click", ".btn-primary", function() {
    
  var subject = $(this).attr("animal-type");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(queryURL);
      console.log(response);
      for (var i = 0; i < results.length; i++) {

        var subjectDiv = $("<div class='new'>");

        var p = $("<p>").text("Rating: " + results[i].rating);
        
        var subjectImage = $("<img>");
        subjectImage.attr("src", results[i].images.fixed_height.url);
        subjectImage.attr("primary", results[i].images.fixed_height.url);
        subjectImage.attr("alternate", results[i].images.fixed_height_still.url);
        subjectImage.attr("data-state", "animate");

        subjectDiv.append(subjectImage);
        subjectDiv.append(p);
        $("#gifs").prepend(subjectDiv);
      };
    });
});

$(".btn-secondary").on("click", function() {
  $("#gifs").html("");
});

$(document.body).on("click", "img", function() {
  var state = $(this).attr("data-state");
  if (state == "animate") {
    $(this).attr("src", $(this).attr("alternate"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("primary"));
    $(this).attr("data-state", "animate");
  }
});

$("#add-subject").on("click", function(event) {
  if ($("#subject").val() == "") {
    return false
  } else {
    event.preventDefault();
    var subjectTask = $("#subject").val().trim();
    var newButton = $("<button>");

    newButton.attr("animal-type", $("#subject").val().trim());
    newButton.addClass("btn btn-primary");
    newButton.append(subjectTask);

    $("#button-div").append(" ");
    $("#button-div").append(newButton);
    $("#subject").val("");
  };
});     
