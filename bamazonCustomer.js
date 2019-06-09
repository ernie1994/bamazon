console.clear();

var mysql = require('mysql');
var inquirer = require('inquirer');

var ids = [];

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

function print(str) {
    console.log(str);
}

function askForId() {
    var id;
    var quantity;

    inquirer
        .prompt({
            message: "Enter ID of product you would like to buy",
            name: "id",
            type: "input"
        })
        .then((res) => {
            id = parseInt(res.id);

            if (!ids.includes(id)) {
                print("Invalid ID");
                askForId();
                return;
            }

            inquirer
                .prompt({
                    message: "How many units of this product would you like?",
                    type: "input",
                    name: "quantity"
                })
                .then((result) => {
                    quantity = parseInt(result.quantity);

                    if (isNaN(quantity)) {
                        print("Not a valid quantity");
                        askForId();
                        return;
                    }

                    getItem(id, quantity);
                });
        });
}

function getItem(id, quantity) {

    connection.query(
        'SELECT * FROM products WHERE item_id=?',
        [id],
        (err, results) => {
            if (err) throw err;

            if (results[0].stock_quantity < quantity) {
                print("Insufficient quantity");
                askForId();
                return;
            }

            connection.query(
                'UPDATE products SET ? WHERE ?',
                [{ stock_quantity: results[0].stock_quantity - quantity },
                { item_id: id }],
                (err, _results) => {
                    if (err) throw err;
                    console.clear();
                    print("INVOICE");
                    print("-------------");
                    print("Product: " + results[0].product_name);
                    print("Quantity: " + quantity);
                    print("Total Price: $" + (results[0].price * quantity));
                    connection.end();
                }
            );

        }
    );
}

function getAllItems() {
    connection.query(
        'SELECT item_id, product_name, price FROM products',
        (err, results) => {
            if (err) throw err;

            results.forEach((item) => {
                ids.push(item.item_id);
                print(item.product_name + "- $" + item.price + "  (ID# " + item.item_id + ")");
            });

            askForId();
        }
    );
}

connection.connect((err) => {
    if (err) throw err;
    print("Yay, we connected to the database");
    getAllItems();
});
