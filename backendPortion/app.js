const express = require('express');
const app = express();
const db = require('./db');
const router = express.Router();
const socket = require('socket.io');

const AdminController = require('./routes/admin')
const ApiRouter = require('./routes/api')
const port = process.env.PORT || 3004;

app.use('/admin', AdminController)
app.use('/api', ApiRouter)



// App setup
var server = app.listen(3004, function(){
    console.log('listening for requests on port 3004...');
});

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
// Socket setup
var io = socket(server);

// Listen for new connection and print a message in console 
io.on('connection', (socket) => {

    console.log(`New connection ${socket.id}`)

    // Listening for chat event
    socket.on('chat', function(data){
        //console.log('chat event trigged at server');
        //console.log('need to notify all the clients about this event');
        io.sockets.emit('chat', data);
    });

    // Listening for typing event
    socket.on('typing', function(data){
        //console.log(`Server received ${data} is typing`);
        //console.log('need to inform all the clients about this');
        io.sockets.emit('typing', data);
        //socket.broadcast.emit('typing', data);
    });

});


module.exports = app;