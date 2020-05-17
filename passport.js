// Imports for the Passport libraries and User, which contains the password authentication code.
import User from './user.js';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

// Expose various aspect of the Passport in order to make use of its code.
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// First, configure Passport to use the Local Strategy for authentication.
passport.use(new LocalStrategy({
    usernameField: "userName",
    passwordField: "userPassword"
},
// In addition to providing the above JSON object telling which fields are for authentication, you have to provide a function that will actually handle the authentication process.
async function(username, password, callback) {
    // Check the User's password and username
    try {
        let theUserDocs = await User.read({ userName: username });
        let theUserDoc = theUserDocs[0];
        let authresult = await User.authenticate(password, theUserDoc);
        // authresult will be true or false: True if username and password are good, false if not.
        if (authresult) {
            // Login is good!
            // Call the next middle callback and pass it the object representing the logged in Person.
            return callback(null, theUserDoc, { message: "The Person logged in successfully!" });
        }
        else {
            // Login failed!
            return callback(null, false, { message: "Incorrect username and password." });
        }
    }
    catch (err) {
        console.log(err);
        (err) => callback(err);
    }
}
));

// Config Passport to verify any generated JWTs
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ThisNeedsToBeAStrongPasswordPleaseChange' 
},
// Provide a function that will verify any JWT
function(JWT, callback) {
    // Do any additional checking here in this function, if needed.
    //Other Checks?
    return callback(null, JWT);
}
));