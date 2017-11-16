/**
 * Created by chaika on 02.02.16.
 */
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
var $cart = $("#cart");
var $summ_label = $(".main-buylist-bottom-label-l");
var $summ_button = $(".main-buylist-bottom-button");
var $clear = $("#clear-cart");
var $button = $('#cart-button');

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var isInCart = findPizza(pizza,size);

    if(isInCart==-1){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    else
        Cart[isInCart].quantity++;

    //Оновити вміст кошика на сторінці
    updateCart();
}

function findPizza(pizza,size) {
    for(var i=0;i<Cart.length;i++)
        if(Cart[i].pizza.title == pizza.title && Cart[i].size == size){
            return i;
        }
    return -1;
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var temp = [];
    for(var i=0;i<Cart.length;i++)
        if(Cart[i]!==cart_item)
            temp.push(Cart[i]);
    Cart = temp;

    localStorage.setItem("Cart",JSON.stringify(Cart));
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його

    // var saved_cart = Storage.read("Cart");
    // if(saved_cart){
    //     Cart = saved_cart;
    // }

    $clear.click(function () {
        clearCart();
        localStorage.clear();
    });

    var saved_cart = JSON.parse(localStorage.getItem("Cart"));
    if(saved_cart){
        for(var i=0;i<saved_cart.length;i++){
            Cart.push(saved_cart[i]);
        }
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function clearCart() {
    Cart = [];
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
    $("#buylistAmount").text("0");
    $("#allSum").text("0");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        $node.find(".pizza-item-about-change-sum-amount").text(cart_item.pizza[cart_item.size].price * cart_item.quantity);;


        $node.find(".pizza-item-about-change-plus").click(function(){
            cart_item.quantity += 1;
            updateCart();
        });

        $node.find(".pizza-item-about-change-minus").click(function(){
            if(cart_item.quantity>1) {
                cart_item.quantity -= 1;
            }
            else
                removeFromCart(cart_item);
            updateCart();
        });

        $node.find(".pizza-item-about-change-delete").click(function(){
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.append($node);
        $("#buylistAmount").text(Cart.length);

    }


    Cart.forEach(showOnePizzaInCart);

    $("#allSum").text(countSumm());

    if(Cart.length==0){
        $summ_label.hide();
        $summ_button.addClass("disabled-button");
        $("#empty-buylist").show();
    }
    else{
        $summ_label.show();
        $summ_button.removeClass("disabled-button");
        $("#empty-buylist").hide();
        localStorage.setItem("Cart", JSON.stringify(Cart));
    }

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.clearCart = clearCart();

exports.PizzaSize = PizzaSize;