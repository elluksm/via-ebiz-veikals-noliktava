import Vue from 'vue'
import Router from 'vue-router'

import {
    Veikals
} from '../views'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'veikals',
            component: Veikals
        }
    ]
})