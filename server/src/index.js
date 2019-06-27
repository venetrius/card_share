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
const getEventHandlers = require('./socket/events');
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
// make io avialable in other file in request scope
app.set('io', io);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  if(socket.handshake.session.type === 'attendee'){
    // register attendee in model -> ability send real time notifications
    model.register(socket.handshake.session[0].id, socket.id);
  } 
  let eventHandlers = getEventHandlers(io, model)
  for (var key in eventHandlers) {
    socket.on(key, eventHandlers[key]);
  }
  socket.on('disconnect', function () {
    model.deleteConnection(socket.id);
  })
});

const server = http.listen(PORT, () => {
  console.log("Server is listening on port " + (PORT));
});

// it is used by Mocha
module.exports = server;