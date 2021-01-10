const express = require("express");

const user = require("../../repositories/user");
const loginForm = require("../../views/admin/auth/login");
const signupForm = require("../../views/admin/auth/signup");
const validators = require("./validators");
const { handleValidationErrors } = require("../../middlewares/validationHandler");


const router = express.Router();

router.get("/signup", (req, res) => {
    res.send(signupForm());
});

router.post("/signup", [
    validators.validateSignupEmail,
    validators.validateSignupPassword,
    validators.validateSignupPasswordConfirmation],
    handleValidationErrors(signupForm),
    async (req, res) => {
        const userData = await user.create({ "email": req.body.email, "password": req.body.password });
        req.session.userId = userData.id;
        res.redirect("/admin/products");
    });

router.get("/login", (req, res) => {
    res.send(loginForm());
});

router.post("/login", [
    validators.validateLoginEmail,
    validators.validateLoginPassword],
    handleValidationErrors(loginForm),
    async (req, res) => {
        const userData = await user.getOneBy({ "email": req.body.email });
        req.session.userId = userData.id;
        res.redirect("/admin/products");
    });

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

module.exports = router;