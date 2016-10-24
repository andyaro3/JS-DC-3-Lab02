// BACK END

var express = require("express")
var exphbs = require("express-handlebars")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var Handlebars = require("handlebars") // needed for img URL within HTML ???
mongoose.connect("mongodb://localhost:27017/guestbook")
// nodemon

var app = express()

var Artist = require("./models/artist.js")
var Song = require("./models/song.js")

app.use(express.static("public")) // calling in stylesheet

app.use( bodyParser.urlencoded({extended: true})) // used for forms

app.engine('handlebars', exphbs({defaultLayout: 'main'}) )
app.set('view engine', 'handlebars')

// Create Initial Routes
app.get("/", function( request, response ) {
  Artist.find({}, function (err, data) { // data = post.find({})
		response.render("home", {artists: data}) 
	})	
})

app.get("/songs", function( request, response ) {
  Song.find({}, function (err, data) { // data = post.find({})
		response.render("songs", {songs: data}) 
	})	
})

app.get("/addArtist", function( request, response ) {
  response.render("addArtist") 
})

app.get("/addSong", function( request, response ) {
  response.render("artistInfo") 
})

app.get("/artist/:id", function( request, response ) {
  Artist.findById( request.params.id, function( err, data ){
    response.render( "artistInfo", { artistData: data } )
  })
})

app.get("/artist/:id/edit", function( request, response ) {
  Artist.findById( request.params.id, function( err, data ){
    response.render( "artistEdit", { artistData: data } )
  })
})

app.get("/song/:id", function( request, response ) {
  Song.findById( request.params.id, function( err, data ){
    response.render( "songInfo", { songData: data } )
  })
})

app.post("/artist/:id/edit", function( request, response ) {
  Artist.findById(request.body.id, function( err, data ) {
    data.picture = request.body.picture
    data.genres = request.body.genres

    data.save()

    response.redirect("/artists/" + artist.spotifyID )
  })
})

// app.post("/artists",  // ATTEMPT 2

// 	// Artist
// 	Artist, 

// 	function( request, response ) {
// 	console.log("saved new artist")
// })

app.post("/songs", function( request, response ) {
	var newSong = new Song({
		title: request.body.title,
		artist: request.body.artist,
		spotifyID: request.body.spotifyID,
		length: request.body.length,
		album: request.body.album
	})

	newSong.save()
	// push into artist?
	// console.log("body: " + JSON.stringify(request.body))
	// console.log("newArtist: " + newArtist)
	// response.redirect("/"); // only allowed one RESPONSE action
});

app.post("/artists", function( request, response ) { // ATTEMPT 3
	var newArtist = new Artist({
		artist: request.body.artist,
		picture: request.body.picture,
		spotifyID: request.body.spotifyId,
		genres: request.body.genres,
		songs: request.body.songs
	})
	// response.send(request.body);
	// console.log("artist saved!");
	newArtist.save()
	console.log("body: " + JSON.stringify(request.body))
	console.log("newArtist: " + newArtist)
	// response.redirect("/"); // only allowed one RESPONSE action
});

// Handlebars.registerHelper("Image", function(url) {
//   var url = Handlebars.escapeExpression(url)

//   return new Handlebars.SafeString(
//     "<img src='" + url + "'>"
//   );
// });

// app.post("/addArtist", function( request, response ) { /// ATTEMPT 1
// 	// console.log( request.body )

// 	// var newArtist = new Artist({ // ?????
// 	// 	artist: "", // String
// 	// 	picture: "", // String
// 	// 	details: [], // Array
// 	// 	songs: [] // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
// 	// })

// 	// $.ajax({
// 	//     type: "GET",
// 	//     url: buildURL(request.body.artist), // this pulls correct API url: https://api.spotify.com/v1/search?q=britney%20spears&type=artist
// 	//     success: function (data) {
// 	//       // Update the model
// 	//       newArtist.artist = data.items.name;   // data.artists??? .items.name; 
// 	//       newArtist.picture = data.items[0].images[0].url;
// 	//       newArtist.details = data.items 
// 	//       // newArtist.songs = ...
// 	//     }
//  //  	}); // close ajax

// 				// ...Thinking Too Far Ahead...
// 				// var newArtist = new Artist({ // ?????
// 				// 	artist: "", // String
// 				// 	picture: "", // String
// 				// 	details: [], // Array
// 				// 	songs: [] // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
// 				// })

// 				// for (i=1; i<=4; i++) {
// 				// 	if (request.body["song" + i] !== "") {
// 				// 		newArtist.songs.push(request.body["song" + i])
// 				// 	}
// 				// 	if (request.body["detailName" + i] !== "") {
// 				// 		newArtist.details.push( {request.body["detailName" + 1]: request.body["detailDescription" + i]} ) // how to push in an object
// 				// 	}
// 				// }

// 	console.log(newArtist)
// 	// newArtist.save()
// 	// response.redirect("/") // back to index
// })

// function buildURL(artistName) {
// 	var aName = artistName.replace(" ", "%20")
// 	var baseURL = "https://api.spotify.com/v1/search?q="
// 	baseURL += aName
// 	baseURL += "&type=artist"

// 	return baseURL;
// }

// Tell Which Port
app.listen(3000, function(){
	console.log("TUNR lab up and running...")
})