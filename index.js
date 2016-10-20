var express = require("express")
var exphbs = require("express-handlebars")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/guestbook")
// nodemon

var app = express()

var Artist = require("./models/artist.js")

app.use(express.static("public")) // calling in stylesheet

app.use( bodyParser.urlencoded({extended: true})) // used for forms

app.engine('handlebars', exphbs({defaultLayout: 'main'}) )
app.set('view engine', 'handlebars')

// Create Initial Routes
app.get('/', function( request, response ) {
  response.render("home") 
})

app.get("/addArtist", function( request, response ) {
  response.render("addArtist") 
})

app.post("/addArtist", function( request, response ) {
	// console.log( request.body )

	var newArtist = new Artist({ // ?????
		artist: "", // String
		picture: "", // String
		details: [], // Array
		songs: [] // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
	})

	$.ajax({
	    type: "GET",
	    url: buildURL(request.body.artist), // this pulls correct API url: https://api.spotify.com/v1/search?q=britney%20spears&type=artist
	    success: function (data) {
	      // Update the model
	      newArtist.artist = data.items.name;   // data.artists??? .items.name; 
	      newArtist.picture = data.items[0].images[0].url;
	      newArtist.details = data.items 
	      // newArtist.songs = ...
	    }
  	}); // close ajax

				// ...Thinking Too Far Ahead...
				// var newArtist = new Artist({ // ?????
				// 	artist: "", // String
				// 	picture: "", // String
				// 	details: [], // Array
				// 	songs: [] // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
				// })

				// for (i=1; i<=4; i++) {
				// 	if (request.body["song" + i] !== "") {
				// 		newArtist.songs.push(request.body["song" + i])
				// 	}
				// 	if (request.body["detailName" + i] !== "") {
				// 		newArtist.details.push( {request.body["detailName" + 1]: request.body["detailDescription" + i]} ) // how to push in an object
				// 	}
				// }

	console.log(newArtist)
	// newArtist.save()
	// response.redirect("/") // back to index
})

function buildURL(artistName) {
	var aName = artistName.replace(" ", "%20")
	var baseURL = "https://api.spotify.com/v1/search?q="
	baseURL += aName
	baseURL += "&type=artist"

	return baseURL;
}

// Tell Which Port
app.listen(3000, function(){
	console.log("TUNR lab up and running...")
})