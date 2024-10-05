const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })
const listingControllers = require("../controllers/listing.js");

//middleware of error handling with  Joi

//Index + Post route merged together in same function
router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingControllers.createListing));
   
//New Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

//Show route + update + delete routes
router.route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn,
        isOwner,
        wrapAsync(listingControllers.deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.renderEditForm));


module.exports = router;