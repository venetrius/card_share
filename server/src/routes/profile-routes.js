const router = require('express').Router();
const passport = require('passport');


const authCheck = (req, res, next) => {
    if(!req.user){
        res.send(req.user) //redirect('/auth/linkedin');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in, this is your profile - ' + req.user.username);
});

module.exports = router;