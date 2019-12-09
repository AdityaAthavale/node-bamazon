let mysql = require("mysql");
let Product = require("./product")

let isConnected = false;
let products = []

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Adds@123#",
  database: "bamazon"
});

function connectDatabase(callback) {
    connection.connect(function(err) {
        if (err) {
            console.log(err);
            throw err;
        };
        isConnected = true
        callback()
        console.log("connected as id " + connection.threadId);
    });
}

function connectAndFectchAvailableProducts(callback) {
    if (!isConnected) {
        connectDatabase(function () {
            fetchAllAvailableProducts(callback)
        })
    } else {
        fetchAllAvailableProducts(callback)
    }
}

function fetchAllAvailableProducts(callback) {
    if (isConnected) {
        let query = "SELECT * FROM products where stock_quantity > 0"
        connection.query(query, function(err, res) {
            if (err) {
                console.log(err)
                throw err
            }
            res.forEach(element => {
                products.push(new Product(element.productId, element.product_name, element.department_name, element.price, element.stock_quantity)) 
            });
            callback()
        })
    }
}


function connectAndBuy(product, quantity, callback) {
    if (!isConnected) {
        connectDatabase(function () {
            buyProduct(product, quantity, callback)
        })
    } else {
        buyProduct(product, quantity, callback)
    }
}

function buyProduct(product, quantity, callback) {
    if(isConnected) {
        let newQuantity = product.availableQuantity - quantity
        let query = "UPDATE `bamazon`.`products` SET `stock_quantity` = '" + newQuantity + "' WHERE (`productId` = '" + product.productid + "');"
        connection.query(query, function(err, res) {
            if (err) {
                console.log(err)
                throw err
            }
            callback()
        })
    }
}

function endConnection() {
    connection.end()
}

module.exports = {
    connectAndFectchAvailableProducts,
    connectAndBuy,
    products,
    endConnection,
};