import Vue from 'vue'
import Router from 'vue-router'

import {
    Noliktava,
    Produkts,
    JaunsProdukts
} from '../views'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'noliktava',
            component: Noliktava
        },
        {
            path: '/produkts/:id',
            name: 'produkts',
            component: Produkts
        },
        {
            path: '/produkts',
            name: 'jaunsProdukts',
            component: JaunsProdukts
        }
    ]
})