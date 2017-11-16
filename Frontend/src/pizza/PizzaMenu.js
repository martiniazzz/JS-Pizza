/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var API = require('../API');
var Pizza_List = [];

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var $all = $("#allPizza");
var $meat = $("#meatPizza");
var $pineapple = $("#pineapplePizza");
var $mushroom = $("#mushroomPizza");
var $seafood = $("#seafoodPizza");
var $vega = $("#vegaPizza");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    var amount = 0;

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".caption-prices-big-button").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".caption-prices-small-button").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
        amount++;
    }

    list.forEach(showOnePizza);
    $("#amountOfPizza").text(amount);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        if(filter === "all")
            pizza_shown.push(pizza);
        else{
            if(filter === "meat")
                if(pizza.content.meat || pizza.content.chicken)
                    pizza_shown.push(pizza);
            if(filter === "pineapple")
                if(pizza.content.pineapple)
                    pizza_shown.push(pizza);
            if(filter === "mushroom")
                if(pizza.content.mushroom)
                    pizza_shown.push(pizza);
            if(filter === "seafood")
                if(pizza.content.ocean)
                    pizza_shown.push(pizza);
            if(filter === "vega")
                if(!pizza.content.meat && !pizza.content.chicken && !pizza.content.ocean)
                    pizza_shown.push(pizza);
        }

    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    API.getPizzaList(function (err,list) {
        if(err)
            alert("Can't show pizza list!");
        else {
            Pizza_List = list;
            showPizzaList(Pizza_List);
        }
    });


    $all.click(function () {
        filterPizza("all");
        $all.addClass('inner-container-head-menu-chosen');
        $meat.removeClass("inner-container-head-menu-chosen");
        $pineapple.removeClass("inner-container-head-menu-chosen");
        $mushroom.removeClass("inner-container-head-menu-chosen");
        $seafood.removeClass("inner-container-head-menu-chosen");
        $vega.removeClass("inner-container-head-menu-chosen");
    });

    $meat.click(function () {
        filterPizza("meat");
        $all.removeClass("inner-container-head-menu-chosen");
        $meat.addClass("inner-container-head-menu-chosen");
        $pineapple.removeClass("inner-container-head-menu-chosen");
        $mushroom.removeClass("inner-container-head-menu-chosen");
        $seafood.removeClass("inner-container-head-menu-chosen");
        $vega.removeClass("inner-container-head-menu-chosen");
    });

    $pineapple.click(function () {
        filterPizza("pineapple");
        $all.removeClass("inner-container-head-menu-chosen");
        $meat.removeClass("inner-container-head-menu-chosen");
        $pineapple.addClass("inner-container-head-menu-chosen");
        $mushroom.removeClass("inner-container-head-menu-chosen");
        $seafood.removeClass("inner-container-head-menu-chosen");
        $vega.removeClass("inner-container-head-menu-chosen");
    });

    $mushroom.click(function () {
        filterPizza("mushroom");
        $all.removeClass("inner-container-head-menu-chosen");
        $meat.removeClass("inner-container-head-menu-chosen");
        $pineapple.removeClass("inner-container-head-menu-chosen");
        $mushroom.addClass("inner-container-head-menu-chosen");
        $seafood.removeClass("inner-container-head-menu-chosen");
        $vega.removeClass("inner-container-head-menu-chosen");
    });

    $seafood.click(function () {
        filterPizza("seafood");
        $all.removeClass("inner-container-head-menu-chosen");
        $meat.removeClass("inner-container-head-menu-chosen");
        $pineapple.removeClass("inner-container-head-menu-chosen");
        $mushroom.removeClass("inner-container-head-menu-chosen");
        $seafood.addClass("inner-container-head-menu-chosen");
        $vega.removeClass("inner-container-head-menu-chosen");
    });

    $vega.click(function () {
        filterPizza("vega");
        $all.removeClass("inner-container-head-menu-chosen");
        $meat.removeClass("inner-container-head-menu-chosen");
        $pineapple.removeClass("inner-container-head-menu-chosen");
        $mushroom.removeClass("inner-container-head-menu-chosen");
        $seafood.removeClass("inner-container-head-menu-chosen");
        $vega.addClass("inner-container-head-menu-chosen");
    });

}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;