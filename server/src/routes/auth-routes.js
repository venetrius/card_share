const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.send(req.user);
});

router.get('/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/callback', passport.authenticate('linkedin', { session: true }), (req, res) => {
  req.session = req.user;
  res.send(req.session, req.user, req.params);
});

module.exports = router;
