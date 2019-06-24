const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config();

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

const setUpLinkedinPassport = function(dataHelpers){
    passport.use(
        new LinkedInStrategy({
            // options for google strategy
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: 'http://127.0.0.1:8081/auth/linkedin/callback'
        }, (accessToken, refreshToken, profile, done) => {
            // passport callback function
            console.log('passport callback function fired:');
            console.log(profile);
            userProfile = createUserProfile(profile);
            dataHelpers.createUser(
                userProfile,
                function(err, user){
                  console.log('err', err);
                  console.log('user',user);
                }
            );
        })
    );
}

module.exports = setUpLinkedinPassport;