var redis = require('redis').createClient()
var twig = require('twig')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var sessionHandler = require('express-session')
var sessionStore = require('connect-redis')(sessionHandler)

http.listen(9487)

app.use(sessionHandler({
	store: new sessionStore({
		client: redis
	}),
	secret: 'dQr8IqFCoIWGXBJi6HVqZins4899Rg2osW9b',
	ttl: 3800,
	resave: true, //We do this because Redis does not have a touch function and we don't want the session to die.
	saveUninitialized: false
}))

app.get('/' , function (req , res){
	res.render('index.twig');
})

io.on('connection', function(socket) {
	socket.on('chat_message', function(msg){
		io.emit('chat_message' , msg)
	})
})
