const { spec, request } = require("pactum");
const addContext = require('mochawesome/addContext');
const { getFakeProduct } = require("../mock-data/product.js");
const { addProductSpecHandlers } = require('../spec-handler/create-product-spec-handler.js')

before(async function () {
    addProductSpecHandlers();
});

describe('put products tests ', async function () {

    request.setBaseUrl('http://localhost:3000/')
    beforeEach(async function () {
        await spec('create a product')
        .expectStatus(201)
        .expectJsonLike(
            {
                id: "$S{idProduct}"
            }
        );
    })
       it('should edit product', async function () {
        const _spec = spec()
            .put('produtos/$S{idProduct}')
            .withJson(getFakeProduct())
            .expectStatus(200);
        await _spec.toss();
        addContext(this, {
            title: 'EditProductResponseDto',
            value: _spec._response.body,
        });
    });

})