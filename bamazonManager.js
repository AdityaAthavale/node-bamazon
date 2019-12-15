let inquirer = require('inquirer');
let Product = require("./product")
let db = require("./bamazonDbController")

function start() {
    inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Would what would you like to do today? ",
            choices: ['View Product for sale', 'View Low Inverntory', 'Add To Inventory', 'Add new Product']
        },
    ]).then( function(answer) {
        switch(answer.operation) {
            case 'View Product for sale':
                viewProducts()
                break;
            case 'View Low Inverntory':
                viewLowInventory()
                break;
            case 'Add To Inventory':
                addToInventory()
                break;
            case 'Add new Product':
                addProduct()
                break;
            default:
                break;
        }
    })
}

function viewProducts() {
    db.connectAndFectchAvailableProducts( function(products) {
        console.log("***********************************************")
        products.forEach((product) => {
            product.log()
        })
        console.log("***********************************************")
        start()
    })
}

function viewLowInventory() {
    db.connectAndFectchLowInventory( function(products) {
        console.log("***********************************************")
        products.forEach((product) => {
            product.log()
        })
        console.log("***********************************************")
        start()
    })
}

function addToInventory() {
    db.connectAndFectchAllProducts( function(products) {
        console.log("***********************************************")
        products.forEach((product) => {
            product.log()
        })
        console.log("***********************************************")
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: "What product are we adding today?",
                choices: products.map((item) => {
                    return item.product_name;
                })
            },
            {
                type: 'input',
                message: 'Enter new quantity:',
                name: 'quantity',
                validate: function validateAge(quantity) {
                    var reg = /^\d+$/;
                    return reg.test(quantity) || "Quantity should be a whole number!";
                }
            }
        ]).then( function(answer) {
            let product = products.find(element => element.product_name == answer.product)
            product.quantity = answer.quantity
            db.connectAndUpdateInventory(product, function() {
                console.log('Transaction success')
                start()
            })
        })
    })
}

function addProduct() {
    inquirer.prompt([
        {
            name: "productid",
            type: "input",
            message: "Enter product Id:",
            validate: function validateAge(quantity) {
                var reg = /^\d+$/;
                return reg.test(quantity) || "Quantity should be a whole number!";
            }
        },
        {
            name: "product_name",
            type: "input",
            message: "Enter product Name:",
        },
        {
            name: "department",
            type: "input",
            message: "Enter Department Name:",
        },
        {
            name: "price",
            type: "input",
            message: "Enter Price:",
            validate: function validateAge(quantity) {
                var reg = /^\d+$/;
                return reg.test(quantity) || "Quantity should be a whole number!";
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter Qunatity:",
            validate: function validateAge(quantity) {
                var reg = /^\d+$/;
                return reg.test(quantity) || "Quantity should be a whole number!";
            }
        }
    ]).then( function(answer) {
        let product = new Product(answer.productid, answer.product_name, answer.department, answer.price, answer.quantity)
        db.insertNewProduct(product, function() {
            console.log('Transaction success')
            start()
        })
    })
}

start()
