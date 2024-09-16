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
            console.log(`${product.name}: $${product.price} x ${quantity} = $${price}`);
        }
        if (this.discount) {
            const discountAmount = (total * this.discount.percentage) / 100;
            total -= discountAmount;
            console.log(chalk.red(`Discount applied: ${this.discount.description} (-$${discountAmount.toFixed(2)})`));
        }
        console.log(chalk.green(`Total: $${total.toFixed(2)}`));
    }
}

module.exports = Cart;
