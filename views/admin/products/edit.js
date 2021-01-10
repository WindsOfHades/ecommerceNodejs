const adminLayout = require("../adminLayout");
const helpers = require("../helpers");

const editProductForm = (options = {}) => {
    return adminLayout({
        title: "Edit current product",
        content: `
        <div class="columns is-centered">
            <div class="column is-half">
            <h1 class="subtitle">Edit the Product</h1>

            <form method="POST" enctype="multipart/form-data">
                <div class="field">
                <label class="label">Title</label>
                <input class="input" value=${options.product.name} name="productName">
                <p class="help is-danger">${helpers(options.errors, "productName")}</p>
                </div>

                <div class="field">
                <label class="label">Price</label>
                <input class="input" value=${options.product.price} name="productPrice">
                <p class="help is-danger">${helpers(options.errors, "productPrice")}</p>
                </div>

                <div class="field">
                <label class="label">Image</label>
                <input type="file" name="productImage" />
                </div>
                <br />
                <button class="button is-primary">Submit</button>
            </form>
            </div>
        </div>
        `
    });
}

module.exports = editProductForm;