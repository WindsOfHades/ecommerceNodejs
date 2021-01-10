const express = require("express");
const cart = require("../repositories/cart");
const product = require("../repositories/product");
const cartIndexTemplate = require("../views/cart/index");

const cartRouter = express.Router();

cartRouter.get("/cart",
    async (req, res) => {
        if (!req.session.cartId) {
            return res.redirect("/");
        }
        const cartData = await cart.getOne(req.session.cartId);
        for (item of cartData.items) {
            const productInCart = await product.getOne(item.productId);
            item.product = productInCart;
        }
        res.send(cartIndexTemplate(cartData.items));
    });

cartRouter.post("/cart/product",
    async (req, res) => {
        let cartData;
        if (!req.session.cartId) {
            cartData = await cart.create({ "items": [] });
            req.session.cartId = cartData.id;
        }
        else {
            cartData = await cart.getOne(req.session.cartId);
        }
        const existingItem = cartData.items.find((item) => (item.productId === req.body.productId));
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartData.items.push({ "productId": req.body.productId, "quantity": 1 });
        }
        await cart.update(cartData.id, { items: cartData.items });
        res.redirect("/");
    });

cartRouter.post("/cart/product/delete", async (req, res) => {
    const cartData = await cart.getOne(req.session.cartId);
    const filteredCartData = cartData.items.filter(item => item.productId !== req.body.cartItem);
    await cart.update(cartData.id, { "items": filteredCartData });
    res.redirect("/cart");
});

module.exports = cartRouter;