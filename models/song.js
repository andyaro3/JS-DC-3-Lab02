var mongoose = require("mongoose")
var Schema = mongoose.Schema
// run mongod in CMD:  "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"

var songSchema = new Schema( { // can pass in an object with requirements
	title: String, // tracks.items[0].album.name
	artist: String, // tracks.items[0].artists.name
	spotifyID: String, // tracks.items[0].id
	length: Number, // time, duration | tracks.items[0].duration_ms
	album: String, // URL for image | tracks.items[0].album.images[0]

})

var Song = mongoose.model("Song", songSchema) // returns an object
// Song is our MODEL!
module.exports = Song