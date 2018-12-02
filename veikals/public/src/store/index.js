import Vue from 'vue'
import Vuex from 'vuex'
import ProductService from '../service/Product.service'

Vue.use(Vuex)

export const state = {
    products: [
        {
            id: 1,
            name: "Kafijas kanniņa",
            description: "Kafijas kanniņa visgaršīgākās kafijas pagatavošanai",
            price: 7.99,
            available: false
        },
        {
            id: 2,
            name: "Piparkūkas",
            description: "Garšīgas piparkūkas, 500g",
            price: 2,
            available: true
        }
    ]
}

export const actions = {
    async fetchAllProducts ({commit}) {
        const allProducts = await ProductService.fetchAllProducts()
        commit('setAllProducts', allProducts);
    },
    async updateAllProducts ({commit}) {
        const allProducts = await ProductService.updateAllProducts()
    }
}

export const mutations = {
    setAllProducts (state, allProducts) {
        state.products = allProducts;
    }
}

export default new Vuex.Store ({
    state,
    actions,
    mutations
})