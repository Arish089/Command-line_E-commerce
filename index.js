const readline = require('readline-sync');
const Product = require('./product');
const Discount = require('./discount');
const Cart = require('./cart');
const fs = require('fs')
const filePath = require('path')

// Sample products
const products = [
    new Product(1001, 'Laptop', 1149, "Electronics"),
    new Product(1003, 'Smartphone', 599, "Electronics"),
    new Product(2010, 'Shirt', 89, "Fashion")
];

// Initialize cart (which will load data from cart.json if it exists)
const cart = new Cart();

const commands = {
    'list-products': () => {
        console.log('Available Products:');
        products.forEach(product => {
            console.log(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Category: ${product.category}`);
        });
    },
    'add-to-cart': (id, quantity) => {
        const product = products.find(p => p.id == id);
        if (product) {
            cart.addProduct(product, parseInt(quantity));
            console.log(`${quantity} ${product.name}(s) added to cart.`);
        } else {
            console.log('Product not found.');
        }
    },    
    'remove-item': (id, quantity) => {
    const product = products.find(p => p.id == id);
    if (product) {
        const success = cart.removeProduct(product, parseInt(quantity));
        if (success) {
            console.log(`${quantity} ${product.name}(s) removed successfully.`);
        } else {
            console.log(`${product.name} not found in the cart.`);
        }
    } else {
        console.log('Product not found.');
    }
},
    'view-cart': () => {
        cart.viewCart();
    },
    'apply-discount': (description, percentage) => {
        const discount = new Discount(description, parseFloat(percentage));
        cart.applyDiscount(discount);
        console.log(`Discount applied: ${description} (${percentage}%)`);
    },
    'checkout': async () => {
        await cart.checkout();
    }
};

// Handle command-line arguments
const args = process.argv.slice(2);
const command = args[0];
const params = args.slice(1);

if (commands[command]) {
    commands[command](...params);
} else {
    console.log('Invalid command. Use one of the following: list-products, add-to-cart, view-cart, apply-discount, checkout');
}
