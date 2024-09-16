const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

class Cart {
    constructor() {
        this.filePath = path.join(__dirname, 'cart.json');
        this.items = {};
        this.discount = null;
        this.loadCart();
    }

    // Load the cart from the file if it exists
    loadCart() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const parsedData = JSON.parse(data);
            this.items = parsedData.items || {};
            this.discount = parsedData.discount || null;
        }
    }

    // Save the cart to a file
    saveCart() {
        const data = {
            items: this.items,
            discount: this.discount
        };
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    addProduct(product, quantity) {
        if (!this.items[product.id]) {
            this.items[product.id] = { product, quantity };
        } else {
            this.items[product.id].quantity += quantity;
        }
        this.saveCart();  // Save after adding product
    }

    removeProduct(product, quantity) {
    if (this.items[product.id]) {
        if (this.items[product.id].quantity - quantity <= 0) {
            delete this.items[product.id];
            this.saveCart();  // Save after removing product
            return true;  // Successfully removed product
        } else {
            this.items[product.id].quantity -= quantity;
            this.saveCart();  // Save after updating quantity
            return true;  // Successfully updated quantity
        }
    } else {
        return false;  // Product not found in the cart
    }
}

    applyDiscount(discount) {
        this.discount = discount;
        this.saveCart();  // Save after applying discount
    }

    viewCart() {
        console.log(chalk.blue('Cart Items:'));
        let total = 0;
        for (const id in this.items) {
            const { product, quantity } = this.items[id];
            const price = product.price * quantity;
            total += price;
            console.log(`${product.name} - Quantity: ${quantity}, Price: $${product.price}, Total = $${price}`);
        }
        console.log(chalk.green(`Total (before discounts): $${total.toFixed(2)}`));
    }
    async checkout() {
        console.log(chalk.blue('Checking out...'));

        let total = 0;
        for (const id in this.items) {
            const { product, quantity } = this.items[id];
            let price = product.price * quantity;

            // Apply 10% discount for Electronics during checkout
            if (product.category === 'Electronics') {
                const discountAmount = price * 0.10;
                price -= discountAmount;
                console.log(chalk.red(`10% off on Electronics applied for: ${product.name} (-$${discountAmount.toFixed(2)})`));
            }

            // Apply Buy 1 Get 1 for Fashion items during checkout
            if (product.category === 'Fashion') {
                const freeItems = Math.floor(quantity / 2); // For every 2 items, add 1 free
                console.log(chalk.green(`Buy 1 Get 1 Free applied for Fashion item: ${product.name} (+${freeItems} free)`));
                price = product.price * (quantity - freeItems); // Adjust price for free items
            }

            total += price;
        }

        console.log(chalk.green(`Total after discounts: $${total.toFixed(2)}`));

        // Assuming payment is successful
        console.log(chalk.yellow('Payment successful! Thank you for your purchase.'));

        // Clear the cart after checkout
        this.items = {};
        this.saveCart();
    }
}

module.exports = Cart;
