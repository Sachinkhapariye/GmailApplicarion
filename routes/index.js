var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));


 router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
 });
 router.get('/login',function(req,res,next){
   res.render('login')
 });
 router.get('/profile',isLoggedIn, function(req,res,next){
   userModel.findOne({username : req.session.passport.user})
   .then(function(foundUser){
      //res.send(foundUser);
     res.render('profile', {foundUser})
    })
 });


router.post("/register", function (req, res) {
  const userData = new userModel({
    email : req.body.email,
    username : req.body.username,
    fullname : req.body.fullname,
    secretname : req.body.secretname
  })
  userModel.register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect("/login");
      })
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/login")
    })
});

// //paste code for login

router.post("/login", passport.authenticate('local', {
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function (req, res) {
});



// router.get("/profile", isLoggedIn, function (req, res) {
//   res.render("profile");
// })

// //function to check if the user is logedin

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login")
}

// //make route for login page

// router.get("/login", function (req, res) {
//   res.render("login");
// })

module.exports = router;
