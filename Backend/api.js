/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var crypto = require('crypto');

var LIQPAY_PUBLIC_KEY = "i79724083866";
var LIQPAY_PRIVATE_KEY = "mHINvNSi6hZic9TiSlbSYlGhk01i7dBNl5vI4Piz";

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;

    var summ = 0;
    order_info.order.forEach(function (pizza_item) {
        summ += pizza_item.quantity * pizza_item.pizza[pizza_item.size].price;
    });

    var sizes = {
        small_size : "Мала",
        big_size: "Велика"
    };

    var description = "Замовлення піци для " + order_info.name + "\n";
    description+= "Адреса доставки: " + order_info.adress + "\n";
    description+= "Телефон: " + order_info.phone + "\n";
    description+= "Замовлення: " + "\n";
    var pizza = order_info.order;
    pizza.forEach(function (pizza) {
        description+= " - " + pizza.quantity + " шт. ";
        description+= "(" + sizes[pizza.size] + ") ";
        description+= pizza.pizza.title + "\n";
    });
    description+= "Всього: "+ summ +" грн.";

    var order = {
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        action: "pay",
        amount: summ,
        currency: "UAH",
        description: description,
        order_id: Math.random(),
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);

    res.send({
        data: data,
        signature: signature,
        success: true
    });
};

function base64(str) {
    return new Buffer(str).toString('base64');
}

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}