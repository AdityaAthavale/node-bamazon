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

function fetchProducts(where, callback) {
    let query = "SELECT * FROM products where " + where
    connection.query(query, function(err, res) {
        if (err) {
            console.log(err)
            throw err
        }
        let prods = []
        res.forEach(element => {
            prods.push(new Product(element.productId, element.product_name, element.department_name, element.price, element.stock_quantity)) 
        });
        callback(prods)
    })
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
        fetchProducts("stock_quantity > 0", callback)
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

function connectAndFectchLowInventory(callback) {
    products = []
    if (!isConnected) {
        connectDatabase(function () {
            fetchLowInventory(callback)
        })
    } else {
        fetchLowInventory(callback)
    }
}

function fetchLowInventory(callback) {
    if (isConnected) {
        fetchProducts("stock_quantity <= 50", callback)
    }
}

function connectAndUpdateInventory(product,  callback) {
    if (!isConnected) {
        connectDatabase(function () {
            updateInventory(product, callback)
        })
    } else {
        updateInventory(product, callback)
    }
}

function updateInventory(product, callback) {
    let query = "UPDATE `bamazon`.`products` SET `stock_quantity` = '" + product.quantity + "' WHERE (`productId` = '" + product.productid + "');"
    connection.query(query, function(err, res) {
        if (err) {
            console.log(err)
            throw err
        }
        callback()
    })
}

function insertNewProduct(product, callback) {
    //INSERT INTO `bamazon`.`products` (`productId`, `product_name`, `department_name`, `price`) VALUES ('12', 'Banana', 'Deli', '1');

    let query = "INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('" + product.product_name + "', '" + product.department + "', '" + product.cost + "', '" + product.availableQuantity + "');"
    connection.query(query, function(err, res) {
        if (err) {
            console.log(err)
            throw err
        }
        callback()
    })
}

function connectAndFectchAllProducts(callback) {
    products = []
    if (!isConnected) {
        connectDatabase(function () {
            fetchAllProducts(callback)
        })
    } else {
        fetchAllProducts(callback)
    }
}

function fetchAllProducts(callback) {
    if (isConnected) {
        fetchProducts("1=1", callback)
    }
}

function endConnection() {
    connection.end()
}

module.exports = {
    connectAndFectchAvailableProducts,
    connectAndFectchLowInventory,
    connectAndUpdateInventory,
    connectAndFectchAllProducts,
    connectAndBuy,
    insertNewProduct,
    endConnection,
};