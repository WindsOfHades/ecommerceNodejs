const BaseRepository = require("./baseRepository");

class CartRepository extends BaseRepository {
}

module.exports = new CartRepository("carts.json");