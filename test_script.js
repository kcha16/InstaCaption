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