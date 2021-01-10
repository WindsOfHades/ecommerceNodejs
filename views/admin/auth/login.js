const adminLayout = require("../adminLayout");
const helpers = require("../helpers");

const loginForm = (options = {}) => {
    return adminLayout({
        title: "Log In",
        content: `
            <div class="container">
                <div class="columns is-centered">
                <div class="column is-one-quarter">
                    <form method="POST">
                    <h1 class="title">Log in</h1>
                    <div class="field">
                        <label class="label">Email</label>
                        <input required class="input" type="email" placeholder="Email" name="email" />
                        <p class="help is-danger">${helpers(options.errors, "email")}</p>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <input required class="input" placeholder="Password" name="password" type="password" />
                        <p class="help is-danger">${helpers(options.errors, "password")}</p>
                    </div>
                    <button class="button is-primary">Submit</button>
                    </form>
                    <a href="/signup">Need an account? Sign Up</a>
                </div>
                </div>
            </div>
    `});
}

module.exports = loginForm;
