const { validationResult } = require("express-validator");

module.exports = {
    handleValidationErrors: (template, getProductObj) => {
        return async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let productObj;
                if (getProductObj) {
                    productObj = await getProductObj(req);
                }
                return res.send(template({ errors, "product": productObj }));
            }
            next();
        }
    }
}