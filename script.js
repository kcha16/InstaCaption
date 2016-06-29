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
  var CLAR_URL = "https://api.clarifai.com/v1/tag/";
  var URL = "https://api.musixmatch.com/ws/1.1/track.search?apikey=db74e53478c2331ea2fb4d24b0c084fc";
  var artistQ = "&q_artist=";
  var songURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=db74e53478c2331ea2fb4d24b0c084fc";
  $scope.finalCaption = [];

  $scope.generateCaption = function(image) {
    console.log($scope.artistName);
    artistURL = URL + artistQ + $scope.artistName;
    $scope.finalCaption = [];
    var finalClarUrl = CLAR_URL + "?url=" + $scope.imgURL
    + "&access_token=52AgY8i439YZnFw5oPVfzGyfas1dtv";
    $scope.pictags = {};
    $http({
      method: "GET",
      url: finalClarUrl,
    }).then(function(response) {
      $scope.pictags = response.data.results[0].result.tag.classes;
      console.log($scope.pictags);
      $scope.showTags($scope.pictags);
      $scope.getSongs($scope.pictags);
    });
  }

  //var count = 6;
  var bestMatches = [];
  $scope.getSongs = function(pictags) {
    $scope.lyricsArray = [];
    //for (var i = 0; i < pictags.length; i++) {
    //count--;
    //console.log("passing the following to musixmatch " + tagsParam(pictags));
      $http.jsonp(artistURL, {
        method: 'GET',
        params: {
          q_lyrics: pictags[0], //tagsParam(pictags),
          format: 'jsonp',
          callback: 'JSON_CALLBACK'
        }
      }).then(function(response) {        
        if (response.data.message.body.track_list[0]) {
          //$scope.getLyrics(response.data.message.body.track_list[0].track.track_id);
          $scope.getLyrics(response.data.message.body.track_list);
        }
        else console.log("No matches found");
        /*if (count > 0) {
          $scope.getSongs(pictags.slice(0, count))
        }*/

      });
    //}
  }

  $scope.showTags = function(pictags) {
    $scope.allTags = "Top Tags Found: ";
    for (var i=0; i < 5; i++) {
      $scope.allTags += pictags[i] + ", "
    }
    $scope.allTags += pictags[5];
  }

  var tagsParam = function(pictags) {
    var param = "";
    for (var i = 0; i < pictags.length - 1; i++) {
      if (!pictags[i].includes(" "))
        param += pictags[i] + "%20";
    }

    if(!pictags[pictags.length - 1].includes(" ")) param += pictags[pictags.length - 1];
    return param;
  }
  
  $scope.getLyrics = function(songID) {
    for (var i = 0; i < songID.length; i++) {
      $http.jsonp(songURL, {
        method: "GET",
        params: {
          track_id: songID[i].track.track_id,
          format: 'jsonp',
          callback: 'JSON_CALLBACK'
        }
      }).then(function(response) {
        var allLyrics = (response.data.message.body.lyrics.lyrics_body).split("\n");
        for (var j = 0; j < allLyrics.length; j++) {
          $scope.lyricsArray.push(allLyrics[j]);
          $scope.findBestMatch();
        }
      });
      //if (i === songID.length - 1)
        //console.log($scope.lyricsArray);
    }
  }

  $scope.findBestMatch = function() {
    //Get the song
    //Get the lyrics for the song
    var length = $scope.lyricsArray.length;
    $scope.matchScores = [];
    //console.log($scope.lyricsArray);
    //For each line
    for (var i = 0; i < length; i++) {
      var counter = 0;
      for (var j = 0; j < $scope.pictags.length; j++) {
        var currLine = $scope.lyricsArray[i];
        if (currLine.includes($scope.pictags[j])) counter++;
      }
      $scope.matchScores.push(counter);
    }

    $scope.maxIndex = 0;
    for (var i = 0; i < $scope.matchScores.length; i++) {
      if ($scope.matchScores[i] > $scope.matchScores[$scope.maxIndex])
        $scope.maxIndex = i;
    }

    console.log($scope.matchScores[$scope.maxIndex] + " tags in " + $scope.lyricsArray[$scope.maxIndex]);
    //console.log($scope.matchScores[maxIndex]);
    //console.log($scope.lyricsArray[maxIndex-1], $scope.lyricsArray[maxIndex], $scope.lyricsArray[maxIndex+1]);
    //console.log($scope.matchScores);
    $scope.finalCaption = [$scope.lyricsArray[$scope.maxIndex-1], $scope.lyricsArray[$scope.maxIndex], $scope.lyricsArray[$scope.maxIndex+1]];
    $scope.lightSwitch = true;
  }
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
