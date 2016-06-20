var app = angular.module("CaptionApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "index.html"
  })
});

app.controller("MainCtrl", function($scope, $http) {
  //When the generate button is clicked
    //Pass the image to the clarifai API
    //Store the tags

    //Call the Kanye API for an album to get all the songs
    $http({
      method: "GET",
      url: "http://www.kanyerest.xyz/api/album/the_life_of_pablo",
    }).then(function(response) {
      console.log(response.data);
    });


    //Store the lyrics for each song
    //Split the lyrics of each song into individual lines
    //For each line
      //Increment a counter for each appearance of a tag 
    //Return the line with the most tags
  });


//image upload function
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#blah')
      .attr('src', e.target.result)
      .width(450)
      .height(350);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
