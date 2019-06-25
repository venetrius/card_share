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
const eventHandlers = require('./socket/events');


app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  for (var key in eventHandlers) {
    socket.on(key, eventHandlers[key]);
  }
});

const server = http.listen(PORT, () => {
  console.log("Server is listening on port " + (PORT));
});

// it is used by Mocha
module.exports = server;