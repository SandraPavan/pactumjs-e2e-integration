const { faker } = require('@faker-js/faker');

faker.locale = 'pt_BR';

module.exports = {
    getFakeProduct: () => ({
        nome: faker.lorem.words(2),
        descricao: faker.lorem.words(4),
        preco:faker.commerce.price(100), // 904.00
        categoria_id: 1
    })
};