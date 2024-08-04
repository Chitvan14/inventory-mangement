require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const partiesRoutes = require("./routes/parties");
const inventoryRoutes = require("./routes/inventory");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

const corsOptions = {
  origin: [/\.localhost:3000$/, 'http://localhost:3000'],
  credentials: true, // Enable set cookie
};

app.use(cors(corsOptions));

app.use(cookieSession({
  name: 'session',
  keys: ["trdxutkvu"],
  cookie: {
    domain: 'chitvangarg14.localhost', // Set cookie to be available to all subdomains
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false, // Set to true if using HTTPS
    sameSite: 'None', // Ensure cookies are sent with cross-site requests
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/inventory", inventoryRoutes);
app.use("/api/parties", partiesRoutes);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
