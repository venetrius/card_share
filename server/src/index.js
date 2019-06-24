"use strict";

//const bodyParser    = require("body-parser");
const app           = require('express')();
const http          = require('http').Server(app);
const io            = require('socket.io')(http);
                      require('dotenv').config();
const PORT          = process.env.PORT || 8000;
const dataHelpers   = require('./util/data_helpers/data-helpers');



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connected');
  socket.on('get_user', function(id)
  {
    dataHelpers.getUserById(id,function(err, profile){
      let message;
      if(err){
        message = 'error please try again later';
      }else{
        message = JSON.stringify(profile);
      }
      socket.emit('message', message);
    });
    //io.emit('hello', 'can you hear me?', 1, 2, 'abc' + id);
  }
);
});

const server = http.listen(PORT, () => {
  console.log("Server is listening on port " + (PORT));
});

// it is used by Mocha
module.exports = server;