const { e2e } = require('pactum');
const { getFakeProduct } = require("../mock-data/product.js");

describe('AddProduct_ReadProduct', () => {

  let test_case = e2e('Add Product');

  it('create product', async () => {
    await test_case.step('Post Product')
      .spec()
      .post('/produtos')
      .withJson(getFakeProduct())
      .expectStatus(201)
      .stores('idProduct','id')
      .clean()
      .delete('/produtos/$S{idProduct}')
      .expectStatus(200);
  });

  it('get product id', async () => {
    await test_case.step('Get Product')
      .spec()
      .get('/produtos/$S{idProduct}')
      .expectStatus(200)
      .expectJsonLike(
        {
            id: "$S{idProduct}"
        }
    );
  });

  it('clean up', async () => {
    await test_case.cleanup();
  });

});
