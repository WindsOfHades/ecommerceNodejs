const { check } = require("express-validator");
const user = require("../../repositories/user");

module.exports = {
    validateSignupEmail: check("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Input must be an Email")
        .custom(async (email) => {
            if (await user.getOneBy({ "email": email })) {
                throw new Error("Email already exists");
            }
        }),
    validateSignupPassword: check("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 character"),
    validateSignupPasswordConfirmation: check("passwordConfirmation")
        .trim()
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error("Passwords must match!");
            }
            else {
                return true;
            }
        }),
    validateLoginEmail: check("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Input must be an Email"),
    validateLoginPassword: check("password")
        .trim()
        .custom(async (password, { req }) => {
            const userData = await user.getOneBy({ "email": req.body.email });
            if (!userData || !(await user.comparePasswords(password, userData))) {
                throw new Error("Failed credentials!");
            }
        }),
    validateProductName: check("productName")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Product name should be more than 3 characters!"),
    validateProductPrice: check("productPrice")
        .trim()
        .toFloat()
        .isFloat({ min: 1 }).withMessage("Product price should be a float")
};
