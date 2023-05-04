const { spec, request } = require("pactum");
const addContext = require('mochawesome/addContext');
const { addProductSpecHandlers } = require('../spec-handler/create-product-spec-handler.js')

before(async function () {
    addProductSpecHandlers();
});

describe('post products tests ', async function () {

    request.setBaseUrl('http://localhost:3000/')
    it('should create a product', async function () {
        const _spec = spec('create a product')
            .expectStatus(201)
            .expectJsonLike(
                {
                    id: "$S{id}"
                }
            );
        await _spec.toss();
        addContext(this, {
            title: 'CreateProductRequestDto',
            value: _spec._request.body,
        });
        addContext(this, {
            title: 'CreateProductResponseDto',
            value: _spec._response.body,
        });
        
    });
})