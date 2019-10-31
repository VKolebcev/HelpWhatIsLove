const Vue = require('vue/dist/vue.js');
const VueResource = require('vue-resource');
const VueRouter = require('vue-router');
const VueJwtMongo = require('vue-jwt-mongo');

let Index = require("../components/index.vue");
let Register = require("../components/register.vue");
let Login = require("../components/login.vue");
let Feed = require("../components/feed.vue");
let Upload = require("../components/upload.vue");
let MyPhoto = require("../components/myphoto.vue");

Vue.use(VueResource);
Vue.use(VueJwtMongo.Client);
Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { path: "/", component: Index},
        { path: "/register", component: Register},
        { path: "/login", component: Login},
        { path: "/feed", component: Feed},
        { path: "/upload", component: Upload},
        { path: "/myphoto", component: MyPhoto}
    ]
});

let vm = new Vue({
    el: "#app",
    router: router
});
