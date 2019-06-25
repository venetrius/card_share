const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config(); 

let dataHelpers = null;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => 
  {
    dataHelpers.getUserById(id, (user) => done(null, user))
  } 
);

const createUserProfile = function(profile){
    const userProfile = {
        token : profile.id,
        first_name: profile.name.givenName,
        last_name:'Dral',
        email_address:'drum@gmail.com',
        'linkedin-link':'https://www.linkedin.com'
    }
    return userProfile;
}

const setUpLinkedinPassport = function (dataHelpersParam) {
  dataHelpers = dataHelpersParam;
  passport.use(
    new LinkedInStrategy({
      // options for google strategy
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:8081/auth/linkedin/callback'
    }, (accessToken, refreshToken, profile, done) => {
      // passport callback function
      dataHelpers.getUserByToken(
        profile.id,
        function (error, user) {
          if (user) {
            done(null, user);
          } else {
            const userProfile = createUserProfile(profile);
            dataHelpers.createUser(
              userProfile,
              function (err, user) {
                console.log('user', user);
                done(null, user);
              }
            );
          }
        }
      )
    })
  );
}

module.exports = setUpLinkedinPassport;