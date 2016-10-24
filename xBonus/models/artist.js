var mongoose = require("mongoose")
var Schema = mongoose.Schema
// run mongod in CMD:  "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"

var artistSchema = new Schema( { // can pass in an object with requirements
	artist: String,
	picture: String, // path - datatype of object for file??
	spotifyID: String,
	genres: Array,
	songs: Array
})

var Artist = mongoose.model("Artist", artistSchema) // returns an object
// Artist is our MODEL!
module.exports = Artist