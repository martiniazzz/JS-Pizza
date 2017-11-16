/**
 * Created by diana on 12.01.16.
 */

var pizza_info = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        iconV:'assets/images/pizza_7.png',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['Балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:false
    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        iconV:'assets/images/pizza_2.png',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['Мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_new:false,
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        iconV:'assets/images/pizza_1.png',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['Вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        },
        is_new:false,
        is_popular:false
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        iconV:'assets/images/pizza_5.png',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['Вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        },
        is_new:false,
        is_popular:false
    },
    {
        id:5,
        icon:'assets/images/pizza_3.jpg',
        iconV:'assets/images/pizza_3.png',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['Сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        },
        is_new:false,
        is_popular:false
    },
    {
        id:6,
        icon:'assets/images/pizza_6.jpg',
        iconV:'assets/images/pizza_6.png',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['Ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        },
        is_new:false,
        is_popular:false
    },
    {
        id:7,
        icon:'assets/images/pizza_8.jpg',
        iconV:'assets/images/pizza_8.png',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['Криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size:{
            weight: 845,
            size: 40,
            price: 399
        },
        is_new:false,
        is_popular:false
    },
    {
        id:8,
        icon:'assets/images/pizza_4.jpg',
        iconV:'assets/images/pizza_4.png',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['Ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        },
        is_new:false,
        is_popular:false
    }
];

module.exports = pizza_info;