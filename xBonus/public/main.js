// FRONT END
console.log("connecting \"main.js\" file from Public folder")

// View
// var template;
// $(document).ready(function() {
//   var templateSource = $('#weather-template').html();
//   template = Handlebars.compile(templateSource);
// });

// function renderWeather() {
//   var weatherHtml = template(weather);
//   $('#weather').html(weatherHtml);
// }

// Controller
$(document).ready(function() {
  // First render
  // renderWeather();

  // Setup Listeners
  $("#newArtistForm").on("submit", function(event) {
    event.preventDefault();

    // Model - might need to be outside?
	var Artist = ({ // ?????
		artist: "", // String
		picture: "", // String
		spotifyId: "", // String
		genres: [], // Array
		songs: [] // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
	})

	console.log( buildURL($('input[name="artist"]').val()) )

	if ( $('input[name="artist"]').val() == "" ) {
		alert("You must enter an artist or band name into the search to add!")
	} else {
	    // Make the request to Spotify API
	    $.ajax({
	      type: "GET",
	      url: buildURL($('input[name="artist"]').val()),
	      success: function (data) {
	      	if ( data.artists.total !== 0 ) {
		        
		        // Update the model
		        Artist.artist = data.artists.items[0].name;
		        Artist.picture = data.artists.items[0].images[0].url;
		        Artist.spotifyId = data.artists.items[0].id;
		        Artist.genres = data.artists.items[0].genres; 

		        // ADD SAVE
		        saveArtist(Artist)
		        console.log("saved")
		  //       $.ajax({
				//     dataType: 'json',
				//     data: $('#formID').serialize(),
				//     type: 'POST',
				//     url: "./start",
				//     success: handleButtonResponse,
				// });
		      
		        // testing
		        // console.log(Artist) 
	    	} else {
		        alert("No artist or band by that name or spelling yet... Please try again!")
		    } // close IF
	        

	        // Rerender the View
	        // renderWeather();

	      } // close success:
	    }) // close $.ajax
	} //close IF ELSE

  }); // close $ #newArtistForm


$("#newSongForm").on("submit", function(event) {
    event.preventDefault();

    // Model 
	var Song = ({ // ?????
		title: "", // String
		artist: "", // String
		spotifyID: "", // String
		length: 0, // Number
		album: "" // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
	})

	console.log( buildURL($('input[name="track"]').val()) )

	if ( $('input[name="track"]').val() == "" ) { // planning on adding in a "check if artist matches" clause
		alert("You must enter a song title into the search to add!")
	} else {
	    // Make the request to Spotify API
	    $.ajax({
	      type: "GET",
	      url: buildURL2($('input[name="track"]').val()),
	      success: function (data) {
	      	if ( data.tracks.total !== 0 ) {
		        
		        // Update the model
		        Song.title = data.tracks.items[0].album.name;
		        Song.artist = data.tracks.items[0].artists.name;
		        Song.spotifyID = data.tracks.items[0].id;
		        Song.length = data.tracks.items[0].duration_ms; 
		        Song.album = tracks.items[0].album.images[0];

		        // ADD SAVE
		        saveSong(Song)
		        console.log("saved song")

	    	} else {
		        alert("No song by that artist or by that name or spelling... Please try again!")
		    } // close IF
	        

	        // Rerender the View
	        // renderWeather();

	      } // close success:
	    }) // close $.ajax
	} //close IF ELSE

  }); // close $ #newSongForm


$("#editArtistForm").on("submit", function(event) {
    event.preventDefault();

    // pull in existing artist
    alert( $('span[name="sID"]').html() )


	// console.log( buildURL($('input[name="artist"]').val()) )

	// if ( $('input[name="artist"]').val() == "" ) {
	// 	alert("You must enter an artist or band name into the search to add!")
	// } else {
	//     // Make the request from DB
	//     $.ajax({
	//       type: "GET",
	//       url: buildURL($('input[name="artist"]').val()),
	//       success: function (data) {
	//       	if ( data.artists.total !== 0 ) {
		        
	// 	        // Update the model
	// 	        Artist.artist = data.artists.items[0].name;
	// 	        Artist.picture = data.artists.items[0].images[0].url;
	// 	        Artist.spotifyId = data.artists.items[0].id;
	// 	        Artist.genres = data.artists.items[0].genres; 

	// 	        // ADD SAVE
	// 	        saveArtist(Artist)
	// 	        console.log("saved")

	//     	} else {
	// 	        alert("No artist or band by that name or spelling yet... Please try again!")
	// 	    } // close IF
	        

	//         // Rerender the View
	//         // renderWeather();

	//       } // close success:
	//     }) // close $.ajax
	// } //close IF ELSE

  }); // close $ #newArtistForm




}); // close document ready




// Resourses
function buildURL(artistName) {
	var aName = artistName.replace(" ", "%20")
	var baseURL = "https://api.spotify.com/v1/search?q="
	baseURL += aName
	baseURL += "&type=artist"

	return baseURL;
}

function buildURL2(songName) {
	var sName = songName.replace(" ", "%20")
	var baseURL = "https://api.spotify.com/v1/search?q="
	baseURL += sName
	baseURL += "&type=track"

	return baseURL;
}

function saveArtist(data) {
	$.ajax({
	    type: "POST",
	    url: "/artists",
	    data: data, 
	    success: data
	});
}

function saveSong(data) {
	$.ajax({
	    type: "POST",
	    url: "/songs",
	    data: data, 
	    success: data
	});
}