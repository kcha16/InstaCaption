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
  var artistQ = "&q_artist=drake";
  var songURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=db74e53478c2331ea2fb4d24b0c084fc";
  var artistURL = URL + artistQ;
  // var imgURL = "http://res.cloudinary.com/thefader/image/upload/s--rYwbwMNa--/w_1440,c_limit,q_jpegmini/Fader_Drake_Peckmezian_high_res_v3-2015-08-31_010_auffnh.jpg";
  $scope.generateCaption = function(image) {
    var finalClarUrl = CLAR_URL + "?url=" + $scope.imgURL
    + "&access_token=hym2EFZmjn2Mj9I8uksfs8VUa4hI1Q";
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

  //var count = 6;

  $scope.getSongs = function(pictags) {
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
      console.log(response.data.message.body.track_list[0]);
      $scope.getLyrics(response.data.message.body.track_list[0].track.track_id);
      /*
      if (response.data.message.body.track_list[0]) {
        $scope.getLyrics(response.data.message.body.track_list[0].track.track_id);
      }
      else if (count > 0) {
        $scope.getSongs(pictags.slice(0, count))
      }*/
    });
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
    $http.jsonp(songURL, {
      method: "GET",
      params: {
        track_id: songID,
        format: 'jsonp',
        callback: 'JSON_CALLBACK'
      }
    }).then(function(response) {
      var allLyrics = response.data.message.body.lyrics.lyrics_body;
      $scope.lyricsArray = allLyrics.split("\n");
      $scope.findBestMatch();
    });
  }

  $scope.findBestMatch = function() {
    //Get the song
    //Get the lyrics for the song
    var length = $scope.lyricsArray.length;
    $scope.matchScores = [];

    //For each line
    for (var i = 0; i < length; i++) {
      var counter = 0;
      for (var j = 0; j < $scope.pictags.length; j++) {
        var currLine = $scope.lyricsArray[i];
        if (currLine.includes($scope.pictags[j])) counter++;
      }
      $scope.matchScores.push(counter);
    }

    var maxIndex = 0;
    for (var i = 0; i < $scope.matchScores.length; i++) {
      if ($scope.matchScores[i] > $scope.matchScores[maxIndex])
        maxIndex = i;
    }

    console.log($scope.matchScores);
    console.log($scope.lyricsArray);
    console.log($scope.lyricsArray[maxIndex-2]);
    console.log($scope.lyricsArray[maxIndex-1]);
    console.log($scope.lyricsArray[maxIndex]);
    console.log($scope.lyricsArray[maxIndex+1]);
    console.log($scope.lyricsArray[maxIndex+2]);

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
