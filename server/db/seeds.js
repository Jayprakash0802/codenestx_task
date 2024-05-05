

const Product = require('./models/product');
const faker = require('faker')
const { v4: uuid } = require("uuid")


const generateProduct = () => {
    return {
        product_id: uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
    };
};

const products = []

const seedProducts = async () => {
    try {
        for (let i = 0; i < 30; i++) {
            products.push(generateProduct());
        }
        console.log(`Inserting ${products.length} products into the database...`);
        await Product.create(products);
        console.log('Seed data inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};


seedProducts();
