var express = require('express')
var mongoose = require('mongoose')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')
var router = express.Router();

//set up middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

//makes connection to the database server
mongoose.connect('mongodb://localhost:27017/gameEntries',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to MonogoDB Database. Lookin' nice bro")
}).catch(function(err){
    console.log(err)
})

//Load in database templates
require('./models/Game');
var Game = mongoose.model('game')

//Basic code for saving an entry
/*
var Game = mongoose.model('Game',{nameofgame:String})

var game = new Game({nameofgame:"Skyrim 2"})
game.save().then(function(){
    console.log("Game Saved...")
})
*/

//example of a POST route
app.post('/saveGame',function(req,res){
    console.log('Request Made');
    console.log(req.body);

    new Game(req.body).save().then(function(){
        res.redirect('gamelist.html');
    })
})

//get the data for da list
app.get('/getData', function(req,res){
    Game.find({}).then(function(game){
        res.json({game})
    })
})

//post route to delete game entry
app.post('/deleteGame', function(req,res){
    console.log('Game Deleted. Bye bye', req.body._id)
    Game.findByIdAndDelete(req.body._id).exec()
    res.redirect('gamelist.html')
})

app.use(express.static(__dirname+"/views"))
app.listen(3000, function(){
    console.log("Listening on Port 3000. Nice job dude")
})