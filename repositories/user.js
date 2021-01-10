const BaseRepository = require("./baseRepository");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends BaseRepository {

    create = async (attrs) => {
        attrs.id = this.generateRandom(10);
        const salt = this.generateRandom(8);
        const hashedPassword = await scrypt(attrs.password, salt, 64);
        const content = await this.getAll();
        attrs.password = `${hashedPassword.toString("hex")}.${salt}`;
        content.push(attrs);
        await this.writeAll(content);
        return attrs;
    }

    comparePasswords = async (inputPassword, userData) => {
        const [hashedPass, salt] = userData.password.split(".");
        const hashedInputPass = await scrypt(inputPassword, salt, 64);
        return hashedPass === hashedInputPass.toString("hex");
    }
}

module.exports = new UserRepository("users.json");