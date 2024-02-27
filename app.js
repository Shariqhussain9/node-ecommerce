const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./connection");
const Auth = require("./routes/Auth");
const ProductRouter = require("./routes/ProductRouter");
const BrandsRouter = require("./routes/BrandsRouter");
const CategoryRouter = require("./routes/CategoryRouter");
const UserRouter = require("./routes/Users");
const cartRouter = require("./routes/CartRouter");
const orderRouter = require("./routes/order");
// const Users = require("./models/userModel");
const Users = require('./models/userModel');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("./config/common");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'SECRET_KEY';
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;

//use to connect DB
connect();

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));
app.use(cors());
app.use(express.json()); //to parse Json req.body

passport.use('local', 
  new LocalStrategy(async function (username, password, done) {
    console.log("Passport local");
    // by default passport uses username
    try {
      const user = await Users.findOne({ email: username });
      console.log(username, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, token); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await Users.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use("/products", ProductRouter.router);
app.use("/brands", BrandsRouter.router);
app.use("/categories", CategoryRouter.router);
app.use("/users", UserRouter.router);
app.use("/auth", Auth.router);
app.use("/cart", cartRouter.router);
app.use("/orders", orderRouter.router);

app.listen(PORT, () => {
  console.log(`Server is started at port #${PORT}`);
});
