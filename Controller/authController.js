const User = require('../Models/user')
const passport = require("passport");

exports.register_page = (req, res, next) => {
    res.render('auth/register');
}


exports.register_post = (req, res, next) => {
  passport.authenticate('local-signup', {
    failureRedirect : '/err-signup',
    failureFlash : false // allow flash messages
  }), function(req, res, next)  {
    res.redirect('/')
  };

}

exports.login_page = (req, res, next) => {
  // if (req.user) {
	// 	res.redirect('/ahmad')
	// } else {
  //   res.render('auth/login');
	// }

       res.render('auth/login');

}

exports.login_post = (req, res, next) => {

      passport.authenticate('local-login', {
        failureRedirect : '/err-login',
        failureFlash : false // allow flash messages
      }), function(req, res, next)  {
        res.redirect('/')
      }

        console.log(req.user);


};