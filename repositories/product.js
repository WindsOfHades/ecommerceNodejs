const BaseRepository = require("./baseRepository");

class ProductRepository extends BaseRepository {
}

module.exports = new ProductRepository("products.json");
