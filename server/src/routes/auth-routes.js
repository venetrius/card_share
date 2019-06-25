const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  console.log(req.user);
  res.send(req.user);
});

// auth with google+
router.get('/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/callback', passport.authenticate('linkedin', { session: true }), (req, res) => {

 
  res.send(req.session, req.user, req.params) //redirect('/auth/linkedin');
});

module.exports = router;
