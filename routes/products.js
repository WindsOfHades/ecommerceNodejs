const express = require("express");
const product = require("../repositories/product");
const productsIndexTemplate = require("../views/products/index");

const productRouter = express.Router();
productRouter.get("/",
    async (req, res) => {
        const allProducts = await product.getAll();
        res.send(productsIndexTemplate({ products: allProducts }));
    });

module.exports = productRouter;