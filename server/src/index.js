"use strict";

//const bodyParser    = require("body-parser");
const app           = require('express')();
const http          = require('http').Server(app);
const io            = require('socket.io')(http);
                      require('dotenv').config();
const cookieSession = require('cookie-session');
const PORT          = process.env.PORT || 8081;
const dataHelpers   = require('./util/data_helpers/data-helpers');
const passport      = require('passport');
const passportSetup = require('./config/passport-setup')(dataHelpers);

const authRoutes    = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const sharedsession = require("express-socket.io-session");
const session       = cookieSession({
                        maxAge: 24 * 60 * 60 * 1000,
                        keys: [process.env.COOKIE_KEY]
                      })
const model         = require('./model/model');
console.log('model', model);
app.use(session);
io.use(sharedsession(session, {autoSave: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  model.register(socket.handshake.session.id, socket.id);
  console.log(model)
  socket.on('get_user', function(id){
    dataHelpers.getUserById(id,function(err, profile){
      let message;
      if(err){
        message = 'error please try again later';
      }else{
        message = JSON.stringify(profile);
      }
      socket.emit('message', message);
    });
  });
  socket.on('disconnect', function () {
    console.log('Got disconnect!');
    model.deleteConnection(socket.id);
  })

});

const server = http.listen(PORT, () => {
  console.log("Server is listening on port " + (PORT));
});

// it is used by Mocha
module.exports = server;