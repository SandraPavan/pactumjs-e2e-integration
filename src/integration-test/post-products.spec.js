const { spec, request } = require("pactum");
const addContext = require('mochawesome/addContext');
const { addProductSpecHandlers } = require('../spec-handler/create-product-spec-handler.js')

before(async function () {
    addProductSpecHandlers();
});

describe('post products tests ', async function () {
    afterEach(async function () {
        await spec()
            .delete('/produtos/$S{idProduct}')
            .expectStatus(200);
    })    
    it('should create a product', async function () {
        const _spec = spec('create a product')
            .expectStatus(201)
            .expectJsonLike(
                {
                    id: "$S{idProduct}"
                }
            )
            .expectJsonSchema({
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "descricao": {
                        "type": "string"
                    },
                    "preco": {
                        "type": "string"
                    },
                    "categoria_id": {
                        "type": "integer"
                    },
                    "id": {
                        "type": "integer"
                    }
                }
            });
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