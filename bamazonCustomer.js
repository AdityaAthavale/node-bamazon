let inquirer = require('inquirer');
let prod = require("./product")
let db = require("./bamazonDbController")

function startShopping() {
    db.connectAndFectchAvailableProducts( function(products) {
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: "Would what would you like to buy? ",
                choices: products.map((item) => {
                    return item.product_name;
                })
            },
            {
                type: 'input',
                message: 'How many Items would you like to buy?',
                name: 'quantity',
                validate: function validateAge(quantity) {
                    var reg = /^\d+$/;
                    return reg.test(quantity) || "Quantity should be a whole number!";
                }
            }
        ]).then( function(answer) {
            let product = products.find(element => element.product_name == answer.product)
            if (product.availableQuantity > parseFloat(answer.quantity)) {
                db.connectAndBuy(product, answer.quantity, function() {
                    console.log('Transaction success')
                    showContinueAlert()
                })
            } else {
                console.log("Insufficient quantity!")
                showContinueAlert()
            }
        })
    });
}

function showContinueAlert() {
    inquirer.prompt([
        {
            name: "continueShopping",
            type: "list",
            message: "Would you like to continue shopping?",
            choices: ['YES', 'NO']
        }
    ]).then(function(answer) {
        if(answer.continueShopping == 'YES') {
            startShopping()
        } else {
            db.endConnection()
            process.exit(0)
        }
    })
}

startShopping()