const router = require('express').Router();
const passport = require('passport');


// auth with google+
router.get('/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {
    res.send('you reached the redirect URI');
});

module.exports = router;
