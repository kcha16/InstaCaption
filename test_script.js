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