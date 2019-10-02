/**
 * Created by on 28.12.2018.
 */
"use strict"

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        message2: 'You loaded this page on ' + new Date().toLocaleString(),
        message3: 'hello '+'<img src="image/celebration.jpg">',

        seen: false,
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    },
    //-------------------
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

app.message = 'Hello slawek!';
app.seen = true;
app.todos.push({ text: 'New item' })

//============================================
Vue.component('show-item', {
    // The todo-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called todo.
    props: ['item'],
    template: '<li>{{ item }}</li>'
})


Vue.component('show-list', {
    props: ['list'],
    template: `<ol>
<show-item v-for="item in list" v-bind:item="item.text" v-bind:key="item.id"></show-item>
</ol>`
})


var flowerList = [
    { id: 0, text: 'Goździk' },
    { id: 1, text: 'Róża' },
    { id: 2, text: 'Bławatek' }
];


var app2 = new Vue({
    el: '#app2',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
        ],
        flowerList: flowerList
    }
});

//app2.flowerList == flowerList
//to ten sam obiekt

//app2.$data
//app2.$el == document.getElementById('app2') //true

//app2.$watch('a', function(newVal, oldVal) {
// callback kiedy zmiana app2.a zmiana
//})

//vm.$data  Object
//vm.$props Object
//vm.$el HTMLElement
//vm.$options Object
//vm.$parent VueInstance
//vm.$root Vueinstance
//vm.children array<Vueinstance>
//vm.$slots {....}


//WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// Define a new component called button-counter
Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
//https://vuejs.org/v2/guide/components.html
//object with  data, computed, watch, methods
//el for root element

//data must be function
//organizacja - drzewko komponentów
//rejestracja global / local

//global Vue.component
//mozna używać wszedzie
//(all subcomponents)

//przekazanie danych do komponentu : props
/*
 Vue.component('blog-post', {
 props: ['title'],
 template: '<h3>{{ title }}</h3>'
 })

 <blog-post title="My journey with Vue"></blog-post>
 <blog-post title="Blogging with Vue"></blog-post>

 */
