const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/authentication");
const adminProductRouter = require("./routes/admin/products");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/carts");

const port = 3000;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(cookieSession({
    "keys": ["kjahd12r10lk23012sa324dslsj"]
}));
app.use(productRouter);
app.use(cartRouter);
app.use(authRouter);
app.use(adminProductRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
