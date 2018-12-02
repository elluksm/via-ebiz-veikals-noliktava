import Vue from 'vue'
import axios from 'axios'

class ProductService {
    async fetchAllProducts() {
        const response = await axios.get('/api/getall');
        return response.data;
    }

    async updateAllProducts() {
        const response = await axios.get('/api/updateall');
        return response.data;
    }

}

export default new ProductService();