function Product(productid, product_name, department, cost, availableQuantity) {
    this.productid = productid;
    this.product_name = product_name;
    this.department = department
    this.cost = cost
    this.availableQuantity = availableQuantity

    this.log = function() {
        console.log(productid + "\t" + product_name + "\t" + department + "\t" + cost + "\t" + availableQuantity)
    }
}

module.exports = Product