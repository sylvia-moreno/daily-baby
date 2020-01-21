require('dotenv').config();

const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const passport           = require('passport');
const LocalStrategy      = require('passport-local').Strategy;
const User               = require('./models/user');
const bcrypt             = require('bcrypt');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const mongoose           = require('mongoose');
const flash              = require('connect-flash');
const hbs                = require('hbs')

mongoose.connect('mongodb://localhost:27017/daily-b');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: '"our-passport-local-strategy-app',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
  ;
});

passport.use(new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
  },
  (...args) => {
    const [req,,, done] = args;

    const {email, password} = req.body;

    User.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Le nom d'utilisateur n'est pas correcte." });
        }
          
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Le nom d'utilisateur n'est pas correcte." });
        }
    
        done(null, user);
      })
      .catch(err => done(err))
    ;
  }
));

const index = require('./routes/index');
const authRoutes = require('./routes/authentication');
const postsRoutes = require('./routes/posts');
const profilRoute = require('./routes/profil');

app.use('/', index);
app.use('/', authRoutes);
app.use('/posts', postsRoutes);
app.use('/', profilRoute);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;