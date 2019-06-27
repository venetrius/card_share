const router = require('express').Router();
const passport = require('passport');
const dataHelpers = require('../util/data_helpers/data-helpers');

/**********************
 *   Helper Functions
 **********************/
const getAttendeeProfile = function(user, event_id){
  attendee = JSON.parse(JSON.stringify(user))
  delete attendee.id;
  delete attendee.token;
  delete attendee.created_at;
  attendee.user_id = user.id;
  attendee.event_id = event_id;
  return attendee;
}


const addParamstoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  req.session.eventId = req.query.eventId;
  next()
}

/**********************
 *   Routes
 **********************/

router.get('/', function(req, res) {
  res.send(req.user);
});

router.get('/linkedin', addParamstoSession, passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/callback', passport.authenticate('linkedin', { session: true }), (req, res) => {
  const io = req.app.get('io')
  if(req.session.eventId){
    const attendeeProfile =  getAttendeeProfile(req.user, req.session.eventId)
    dataHelpers.findOrCreateAttendee(req.user.id, req.session.eventId, attendeeProfile,
      function(err, attendee){
        if(err){
           console.log(err);
           res.send('some error, please try again later');
         }else{
           //TODO user to attendee
           io.in(req.session.socketId).emit('user', JSON.stringify({attendee : attendee[0], userId : req.user.id}));
           req.session = req.user;
           res.send(onSucsess);
         }
      }
    );
  }else{
    io.in(req.session.socketId).emit('user', JSON.stringify(req.user));
    req.session = req.user;
    res.send(onSucsess);
  }
});

const onSucsess = 
  ` <!DOCTYPE html>
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>Welcome</h1>
          <p>You can close now this page</p>
          <script language="javascript" type="text/javascript">
            close();
          </script>
      </body>
    </html> `

module.exports = router;
