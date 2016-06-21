var MUSIXMATCH_KEY = "db74e53478c2331ea2fb4d24b0c084fc";
//When the generate button is clicked
  //Pass the image to the clarifai API
  //Store the tags
var CLAR_URL = "https://api.clarifai.com/v1/tag/"
function callClarifai(image)
{
 var finalClarUrl = CLAR_URL + "?encoded_data=" + image 
 + "&access_token=35gc7kd0Zt5LkpkGOrXfH0hlBlti1P";
var pictags = {};
$http({
  method: "POST",
  url: finalClarUrl,
}).then(function(response) {
  console.log(response.results.classes);
  pictags = response.results.classes;

});

  track.search?&q_artist=drake&q_lyrics=music%20hack%20day

var URL = "http://api.musixmatch.com/ws/1.1/track.search?apikey=db74e53478c2331ea2fb4d24b0c084fc&q_artist=drake";
  $http({
    method: "GET",
    url: URL,
    params: {
      q_lyrics: tags[0]
    }
  }).then(function(response) {
    $scope.song = reponse.body.tracklist[0];
    console.log(response.data);
  });


//Get the song
//Get the lyrics for the song
var song;
var length = song.length;
var lyrics = [];
var matchScores = [];
var startLine = 0;
//For each character, 
for (var i = 0; i < length; i++) {
  //if the character is capitalized, 
  if (song[i] === song[i].toUpperCase()) {
    //splice the segment into a new line and push it on the array
    lyrics.push(song.slice(startLine, i));
    var startLine = i;
  }
}

//For each line
for (var i = 0; i < lyrics.length; i++) {
  var counter = 0;
  for (var j = 0; j < tags.length; j++) {
    if (lyrics[i].contains(tags[j])) counter++;
  }
  matchScores.push(counter);
}

var maxIndex = 0;
for (var i = 0; i < matchScores.length; i++) {
  if (matchScores[i] > matchScores[maxIndex])
    maxIndex = i;
}

console.log(lyrics[maxIndex]);
