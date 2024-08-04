const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const pool = require("./db");

//initialize
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // google client id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // google client secret
      // the callback url added while creating the Google auth app on the console
      callbackURL: "/api/auth/callback",
      scope: ["profile", "email"],
    },

    // returns the authenticated email profile
    async function (request, accessToken, refreshToken, profile, done) {
      try {
      //   const now = new Date();

      //   const expiresIn = new Date(
      //       now.getTime() + refreshToken.expires_in * 1000
      //     ),
      //     tokenType = refreshToken.token_type,
      //     idToken = refreshToken.id_token,
      //     email = profile._json.email;
      //   const userCheckRes = await pool.query(
      //     "SELECT * FROM user_session WHERE email = $1",
      //     [email]
      //   );

      //   if (userCheckRes.rows.length > 0) {
      //     await pool.query(
      //       "UPDATE user SET expires_in = $1, token_type = $2, id_token = $3 WHERE email = $4 RETURNING *;",
      //       [expiresIn, tokenType, idToken, email]
      //     );
      //   } else {
      //     await pool.query(
      //       "INSERT INTO user_session (expires_in, token_type, id_token, email) VALUES ($1, $2, $3, $4) RETURNING *",
      //       [expiresIn, tokenType, idToken, email]
      //     );
      //   }
        return done(null, profile);
      } catch (err) {
        console.error(err.message);
        return done(err);
      }
    }
  )
);

// function to serialize a user/profile object into the session
passport.serializeUser(function (user, done) {
  console.log("serializeUser user >> ", user);
  done(null, user);
});

// function to deserialize a user/profile object into the session
passport.deserializeUser(function (user, done) {
  console.log("deserializeUser user >> ", user);

  done(null, user);
});

module.exports = passport;
