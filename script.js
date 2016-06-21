var app = angular.module("CaptionApp", ["ngRoute"]);
var firebaseRef = "https://instacaption-ad842.firebaseio.com";

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "index.html"
  })
});

app.controller("MainCtrl", function($scope, $http) {


  //When the generate button is clicked
  //Take stored URl link (ng-model imgURL) and put it into Clarifai
    //Pass the image to the clarifai API
    //Store the tags
var CLAR_URL = "https://api.clarifai.com/v1/tag/"

$scope.generateCaption = function(image) {
 var finalClarUrl = CLAR_URL + "?url=" +  $scope.imgURL
 + "&access_token=35gc7kd0Zt5LkpkGOrXfH0hlBlti1P";
var pictags = {};
$http({
  method: "GET",
  url: finalClarUrl,
}).then(function(response) {
  console.log("yes");
  pictags = response.data.results[0].result.tag.classes;
  // pictags = response.results.classes;

});
};


});

    //Call the Kanye API for an album to get all the songs
    // $http({
    //   method: "GET",
    //   url: "http://www.kanyerest.xyz/api/album/the_life_of_pablo",
    // }).then(function(response) {
    //   console.log(response.data);
    // });


    //Store the lyrics for each song
    //Split the lyrics of each song into individual lines
    //For each line
      //Increment a counter for each appearance of a tag 
    //Return the line with the most tags

//image upload function

// var imagesRef = firebase.database().ref().child("images");
// var images = $firebaseArray(imagesRef);
// var newImage = ""
// function readURL (input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       console.log(e);
//     // newImage = e.target.result;
//     //  images.$add(newImage);
//     //  $scope.newImage = "";
//       $('#blah')
//       .attr('src', e.target.result)
//       .width(450)
//       .height(350);
//     };
//     reader.readAsDataURL(input.files[0]);
//   };
// }



