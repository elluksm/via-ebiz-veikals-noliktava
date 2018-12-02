import Vue from 'vue'
import axios from 'axios'

class ProductService {
    async fetchAllProducts() {
        const response = await axios.get('/api/getall');
        return response.data;
    }

    async saveProduct(data) {
        const response = await axios.post('/api/new',
            {
                product: data
            });
        return response.data;
    }

    async updateProduct(data) {
        const response = await axios.post('/api/update',
            {
                product: data
            });
        return response.data;
    }
}

export default new ProductService();