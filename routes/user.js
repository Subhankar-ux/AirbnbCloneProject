const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const { route } = require("./listing");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/user");

router.get("/signup", userController.renderSignUpForm);

router.post("/signup", wrapAsync(userController.signUp));

//login route
router.get("/login",
    userController.renderLoginForm);

//login authentication route
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout", userController.logout
);

module.exports = router;