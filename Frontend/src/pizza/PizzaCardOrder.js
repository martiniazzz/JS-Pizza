var Templates = require('../Templates');
var API = require('../API');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cartOrder");
var $summ_label = $(".main-buylist-bottom-label-l");

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його

    var saved_cart = JSON.parse(localStorage.getItem("Cart"));
    if(saved_cart){
        for(var i=0;i<saved_cart.length;i++){
            Cart.push(saved_cart[i]);
        }
    }

    updateCart();
}

function countSumm() {
    var summ = 0;
    for(var i=0;i<Cart.length;i++)
        summ+= Cart[i].pizza[Cart[i].size].price * Cart[i].quantity;
    return summ;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html($("#empty-buylist"));
    $("#buylistAmountOrder").text("0");
    $("#allSumOrder").text("0");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItemOrder(cart_item);

        var $node = $(html_code);
        $node.find(".pizza-item-about-change-sum-amount").text(cart_item.pizza[cart_item.size].price * cart_item.quantity);

        $cart.append($node);
        $("#buylistAmountOrder").text(Cart.length);

    }

    Cart.forEach(showOnePizzaInCart);

    $("#allSumOrder").text(countSumm());

}

exports.initialiseCart = initialiseCart;
