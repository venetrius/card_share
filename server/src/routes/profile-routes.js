const router = require('express').Router();
const passport = require('passport');


const authCheck = (req, res, next) => {
    if(!req.session || !req.session.id){
      res.redirect('/auth/linkedin');
    } else {
      next();
    }
};

router.get('/', authCheck, (req, res) => {
  res.send('you are logged in, this is your profile - ' + req.session.first_name);
});

module.exports = router;