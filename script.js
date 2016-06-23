var app = angular.module("CaptionApp", ["ngRoute"]);
var firebaseRef = "https://instacaption-ad842.firebaseio.com";
var MUSIXMATCH_KEY = "db74e53478c2331ea2fb4d24b0c084fc";

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
  var URL = "https://api.musixmatch.com/ws/1.1/track.search?apikey=db74e53478c2331ea2fb4d24b0c084fc"
  var artistQ = "&q_artist=drake";
  var artistURL = URL + artistQ;
  // var imgURL = "http://res.cloudinary.com/thefader/image/upload/s--rYwbwMNa--/w_1440,c_limit,q_jpegmini/Fader_Drake_Peckmezian_high_res_v3-2015-08-31_010_auffnh.jpg";
  $scope.generateCaption = function(image) {
    var finalClarUrl = CLAR_URL + "?url=" + $scope.imgURL
    + "&access_token=OTB6exTZ3uGdwxtkJ294dwnKsT6CLG";
    $scope.pictags = {};
    $http({
      method: "GET",
      url: finalClarUrl,
    }).then(function(response) {
      $scope.pictags = response.data.results[0].result.tag.classes;
      console.log($scope.pictags);
      $scope.getSongs($scope.pictags);
    });
  }

  $scope.getSongs = function(pictags) {
    $http.jsonp(artistURL, {
      method: 'GET',
      params: {
        q_lyrics: pictags[0],
        format: 'jsonp',
        callback: 'JSON_CALLBACK'
      }
    }).then(function(response) {
      // $scope.song = reponse.body.tracklist[0];
      console.log(response);
    });
  }
  // $scope.generateCaption();

});




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
