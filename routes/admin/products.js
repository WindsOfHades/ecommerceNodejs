const express = require("express");
const multer = require("multer");

const router = require("./authentication");
const product = require("../../repositories/product");
const addProductForm = require("../../views/admin/products/new");
const editProductForm = require("../../views/admin/products/edit");
const validators = require("./validators");
const { handleValidationErrors } = require("../../middlewares/validationHandler");
const showProducts = require("../../views/admin/products");
const requireAuth = require("../../middlewares/requireAuth");


const productRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productRouter.get("/admin/products", async (req, res) => {
    const products = await product.getAll();
    res.send(showProducts(products));
});

productRouter.get("/admin/products/new",
    requireAuth,
    (req, res) => {
        res.send(addProductForm({}));
    });

productRouter.post("/admin/products/new",
    requireAuth,
    upload.single("productImage"),
    [
        validators.validateProductName,
        validators.validateProductPrice],
    handleValidationErrors(addProductForm),
    async (req, res) => {
        const { productName, productPrice } = req.body;
        const imageString = req.file.buffer.toString("base64");
        await product.create({ name: productName, price: productPrice, image: imageString });
        res.redirect("/admin/products");
    });

productRouter.get("/admin/products/:id/edit",
    requireAuth,
    async (req, res) => {
        const foundProduct = await product.getOne(req.params.id);
        if (foundProduct) {
            return res.send(editProductForm({ "product": foundProduct }));
        }
        return res.send("Could not find the product");
    });

productRouter.post("/admin/products/:id/edit",
    requireAuth,
    upload.single("productImage"),
    [
        validators.validateProductName,
        validators.validateProductPrice],
    handleValidationErrors(editProductForm, async (req) => { return await product.getOne(req.params.id) }),
    async (req, res) => {
        try {
            const attrs = { name: req.body.productName, price: req.body.productPrice };
            if (req.file) {
                attrs.image = req.file.buffer.toString("base64");
            }
            await product.update(req.params.id, attrs);
            res.redirect("/admin/products");
        } catch (error) {
            return res.send(error);
        }
    });

productRouter.post("/admin/products/:id/delete",
    requireAuth,
    async (req, res) => {
        await product.delete(req.params.id);
        res.redirect("/admin/products");
    });

module.exports = productRouter;