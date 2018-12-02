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
            amount: 2
        }
    ],
    newProduct: {
        name: null,
        description: null,
        price: null,
        amount: null
    }
}

export const actions = {
    async fetchAllProducts ({commit}) {
        const allProducts = await ProductService.fetchAllProducts()
        commit('setAllProducts', allProducts);
    },
    async saveProduct ({ state}) {
        const resp = await ProductService.saveProduct(state.newProduct)
    },
    async updateProduct ({ state}, product) {
        const resp = await ProductService.updateProduct(product)
    },
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