const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Login Failed" });
});

router.get("/login/success", (req, res) => {
  console.log("USER >> ",{user:req.user});
  if (req.user) {
    console.log("WORKED");

    res
      .status(200)
      .json({ error: false, message: "Successful login", user: req.user });
  } else {
    console.log("GOT INTO ERROR");

    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/", passport.authenticate("google", ["email", "profile"]));

// Call back route
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect(process.env.CLIENT_URL);
  });

  module.exports=router;
