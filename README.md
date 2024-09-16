# Command-Line Shopping Cart Application

A simple command-line shopping cart application built using Node.js. This application allows users to add, remove, and view products in their cart, apply automatic discounts based on product categories, and perform checkout with currency conversion options.

## Features

- **Add products to cart**
- **Remove products from cart**
- **View cart details including products, quantity, and total price**
- **Automatic discounts**
  - 10% off for Electronics
  - Buy 1 Get 1 Free for Fashion items
- **Checkout with currency conversion options**
- **Cart persistence using file system (saved in `cart.json`)**

## Prerequisites

- Node.js (v12.0.0 or higher)
- NPM (Node Package Manager)

## Installation

1. Clone the repository or download the source code:
   
   git clone https://github.com/Arish089/Command-line_E-commerce
   cd shopping-cart-cli

2. Install dependencies:

npm install

## Usage
1. Run the application by passing commands via the command line:

node index.js <command> [parameters]

2. Available commands:

**Commands**

| Command           | Parameters                                    | Description                                   |
|-------------------|-----------------------------------------------|-----------------------------------------------|
| `list-products`   | None                                          | Lists all available products.                 |
| `add-to-cart`     | `product-id` `quantity`                       | Adds a product to the cart.                   |
| `remove-item`     | `product-id` `quantity`                       | Removes a product from the cart.              |
| `view-cart`       | None                                          | Displays the current contents of the cart.    |
| `list_discounts`  | None                                          | Displays the discounts.                       |
| `checkout`        | None                                          | Proceeds to checkout and applies discounts.   |

*Sample Commands*

1. List all products:

`node index.js list-products`
![list-products](./images/Screenshot%20(83).png)

2. Add a product to the cart:

`node index.js add-to-cart 1001 2`
![add-to-cart](./images/Screenshot%20(84).png)

4. View cart:

`node index.js view-cart`
![view-cart](./images/Screenshot%20(85).png)

3. Remove a product from the cart:

`node index.js remove-item 1001 1`
![remove-item](./images/Screenshot%20(86).png)
![view-cart](./images/Screenshot%20(87).png)

5. Proceed to checkout:

`node index.js checkout`
![add-to-cart](./images/Screenshot%20(84).png)

6. Discount System:

`node index.js list_discounts`
![list_discounts](./images/Screenshot%20(89).png)

10% Discount: Applied automatically for all Electronics during checkout.
Buy 1 Get 1 Free: Applied automatically for all Fashion items during checkout.

7. Checkout:

During checkout, you will be prompted to convert the total to a different currency:

Supported currencies: EUR, GBP

After conversion, you'll be checked out

`node index.js checkout`
![checkout](./images/Screenshot%20(91).png)


## Cart Persistence
The cart contents are saved in a cart.json file so that they are available between sessions. When the application starts, the cart is automatically loaded from the cart.json file.

License
This project is licensed under the MIT License.


### Key Sections in the `README.md`:

- **Features**: Highlights the core functionality of the cart application.
- **Prerequisites**: Lists the required software dependencies.
- **Installation**: Provides steps to set up the application.
- **Usage**: Describes how to run the application, along with available commands.
- **Discount System**: Explains the automatic discounts applied at checkout.
- **Currency Conversion**: Describes how to convert the total amount during checkout.
- **File Structure**: Gives a quick look at the project's main files.
- **Cart Persistence**: Mentions that the cart is saved and loaded from a JSON file.

This file provides clear instructions for anyone using or modifying your project.