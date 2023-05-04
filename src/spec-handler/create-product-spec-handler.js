const { handler } = require("pactum");
const { getFakeProduct } = require("./mock-data/product.js");

function addProductSpecHandlers() {
    handler.addSpecHandler('create a product', async function (ctx) {
        const { spec } = ctx;
        spec.post("produtos")
            .withJson(getFakeProduct())
            .expectStatus(201)
            .stores('id', 'id');
    });
}

module.exports = {
    addProductSpecHandlers
}