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
        photo : profile.photos.length > 0 ? profile.photos[0].value : null,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email_address: profile.emails ? profile.emails[0].value : null,
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
      callbackURL: process.env.CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile']
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
                done(null, user[0]);
              }
            );
          }
        }
      )
    })
  );
}

module.exports = setUpLinkedinPassport;