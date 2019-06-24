"use strict";

//const bodyParser    = require("body-parser");
const app           = require('express')();
const http          = require('http').Server(app);
const io            = require('socket.io')(http);
                      require('dotenv').config();
const PORT          = process.env.PORT || 8081;
const dataHelpers   = require('./util/data_helpers/data-helpers');
const authRoutes    = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')(dataHelpers);

app.use('/auth', authRoutes);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
/* example create user 
dataHelpers.createUser(
  {token : "f43vr432405", first_name: 'Dri',   last_name:'Dral', email_address:'drum@gmail.com', 'linkedin-link':'https://www.linkedin.com'},
  function(err, user){
    console.log('err', err);
    console.log('user',user);
  }
)
*/

io.on('connection', function(socket){
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