import Vue from 'vue'
import Router from 'vue-router'
import Acceuil from './views/Acceuil.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/acceuil',
            name: 'acceuil',
            component: Acceuil
        },
        {
            path: '/instrument-de-mesure',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => { return import ('./views/About.vue') }
        },
        
        {
            path: '/liste-de-suivi',
            name: 'liste',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => { return import ('./views/Liste.vue') }
        }
    ]
})