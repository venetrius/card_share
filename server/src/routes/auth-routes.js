const router = require('express').Router();
const passport = require('passport');

const addSocketIdtoSession = (req, res, next) => {
  console.log('socketIdAs paRam : ', req.query.socketId)
  req.session.socketId = req.query.socketId
  next()
}

router.get('/', function(req, res) {
  res.send(req.user);
});

router.get('/linkedin', addSocketIdtoSession, passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/callback', passport.authenticate('linkedin', { session: true }), (req, res) => {
  const io = req.app.get('io')
  req.session.user.id = req.user.id;
  io.in(req.session.socketId).emit('user', JSON.stringify(req.user));
  res.send(onSucsess);
});

const onSucsess = 
  ` <!DOCTYPE html>
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>My Welcome</h1>
          <p>You can close now this page</p>
          <script language="javascript" type="text/javascript">
            close();
          </script>
      </body>
    </html> `

module.exports = router;
