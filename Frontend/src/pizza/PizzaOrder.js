
var API = require('../API');
var PizzaCart = require('./PizzaCart');
var LiqPay = require('../LiqPay');

var PizzaCartOrder = require('./PizzaCardOrder');

var $nameInput = $('#nameInput');
var $phoneInput = $('#numberInput');
var $adressInput = $('#adressInput');

var $nameInputDiv = $('#nameInputDiv');
var $phoneInputDiv = $('#phoneInputDiv');
var $adressInputDiv = $('#adressInputDiv');

var $deliveryAdress = $('#deliveryAdress');
var $time = $('#time');
var $next = $('#next');

var point	=	new	google.maps.LatLng(50.464379,30.519131);
var map;
var homeMarker;

var directionService =	new	google.maps.DirectionsService();
var directionDisplay = new	google.maps.DirectionsRenderer({suppressMarkers:true});

function calculateRoute(A_latlng,B_latlng,callback)	{
    directionService.route({
        origin:	A_latlng,
        destination:	B_latlng,
        travelMode:	google.maps.TravelMode["DRIVING"]
    },	function(response,	status)	{
        if	(	status	==	google.maps.DirectionsStatus.OK )	{
            var leg	=	response.routes[	0	].legs[	0	];
            directionDisplay.setDirections(response);
            callback(null,leg.duration);
        }	else	{
            callback(new	Error("Can'	not	find	direction"));
        }
    });
}

function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can not find the adress"));
        }
    });
}

function geocodeLatLng(latlng,	 callback){
    var geocoder	=	new	google.maps.Geocoder();
    geocoder.geocode({'location':	latlng},	function(results,	status)	{
        if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
            var adress =	results[1].formatted_address;
            $adressInput.val(adress);
            $deliveryAdress.text(adress);
            callback(null,adress);
        }	else	{
            callback(new	Error("Can't	find	adress"));
        }
    });
}

function initialize(){

    var mapProp =	{
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom:	11
    };
    var html_element =	document.getElementById("googleMap");
    map	=	new	google.maps.Map(html_element,	 mapProp);

    var marker	=	new	google.maps.Marker({
        position:	point,
        map: map,
        icon:	"assets/images/map-icon.png"
    });

    homeMarker	=	new	google.maps.Marker({
        icon:	"assets/images/home-icon.png"
    });
    google.maps.event.addListener(map,'click',function(me){
        homeMarker.setMap(null);
        var coordinates	=	me.latLng;
        homeMarker.setPosition(coordinates);
        homeMarker.setMap(map);

        geocodeLatLng(coordinates,	function(err,	adress){
            if(!err)	{
                console.log(adress);
            }	else	{
                console.log("Немає адреси")
            }
        });
        calculateRoute(point,coordinates,function (err,time) {
            if(err)
                $time.text("невідомо");
            else
                $time.text(time.text);
        });
    });

    directionDisplay.setMap(map);

}

google.maps.event.addDomListener(window,'load',initialize);

function addHomeMarker(coord) {

    homeMarker.setMap(null);
    homeMarker.setPosition(coord);
    homeMarker.setMap(map);

    geocodeLatLng(coord,	function(err,	adress){
        if(!err)	{
            console.log(adress);
        }	else	{
            console.log("Немає адреси")
        }
    });

        calculateRoute(point,coord,function (err,time) {
            if(err)
                $time.text("невідомо");
            else
                $time.text(time.text);
        });
}

function initialiseOrder(){
    PizzaCartOrder.initialiseCart();
    addListeners();
    $next.click(function () {
        if(check($nameInput.val()) && checkNumber() && check($adressInput.val())){
            createOrder();
        }
        else
            alert("Будь ласка, введіть дані правильно!");
    });
}

function createOrder() {
        API.createOrder({
                name: $nameInput.val(),
                phone: $phoneInput.val(),
                adress: $adressInput.val(),
                order: PizzaCart.getPizzaInCart(),
            },
            function(err,result) {
                if(err)
                    alert("Під час оформлення замовлення виникла помилка! Будь ласка, спробуйте ще раз!");
                else{
                    LiqPay.liqpay(result.data, result.signature);
                    alert("Замовлення для "+$nameInput.val()+" (телефон "+$phoneInput.val()+") прийнято!");
                }

            });

}

function check(value){
    if(value.length<=0)
        return false;
    return true;
}

function checkNumber(){
    var number = $phoneInput.val();
    if(number.length<=0)
        return false;
    if(number.substring(0,4)!=='+380' && number[0]!=='0')
        return false;
    for(var i=0;i<number.length;i++)
        if(isNaN(parseInt(number[i])))
            return false;
    return true;
}

function addListeners(){
    $nameInput.bind('input propertychange',function () {
        if(check($nameInput.val())){
            $nameInputDiv.addClass('correct');
            $nameInputDiv.removeClass('incorrect');
        }
        else{
            $nameInputDiv.addClass('incorrect');
            $nameInputDiv.removeClass('correct');
        }
    });
    $adressInput.bind('input propertychange',function () {
        if(check($adressInput.val())) {
            $adressInputDiv.addClass('correct');
            $adressInputDiv.removeClass('incorrect');
            $deliveryAdress.text($adressInput.val());
            geocodeAddress($adressInput.val(),function (err,coord) {
                if(!err)
                    addHomeMarker(coord);
            });
        }
        else {
            $adressInputDiv.addClass('incorrect');
            $adressInputDiv.removeClass('correct');
        }
    });
    $phoneInput.bind('input propertychange',function () {
        if(checkNumber()) {
            $phoneInputDiv.addClass('correct');
            $phoneInputDiv.removeClass('incorrect');
        }
        else {
            $phoneInputDiv.addClass('incorrect');
            $phoneInputDiv.removeClass('correct');
        }
    });
}

exports.initialiseOrder = initialiseOrder;