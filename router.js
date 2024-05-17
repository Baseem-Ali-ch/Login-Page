const express = require("express");
const router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "chb123"
};

//login user
router.post("/login", (req, res) => {
  if (req.body.email == credential.email && req.body.password == credential.password) {
    req.session.user = req.body.email;
    res.redirect('/dashboard');
  } else {
    res.render('base', { errorMessage: "Invalid Username and Password" });
  }
});

//route for dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.render('base', { unAuthorize: "Unauthorize user" });
  }
})

//route for login
router.get('/route/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('base');
  }
})

//route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (error) {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      res.render('base', { logout: "Logout successfully" });
    }
  })
})

module.exports = router;