<template>
  <div>
    <b-jumbotron header="Laipni lūgti mūsu Internetveikalā!" lead="Vislabākais piedāvājums!" >
       <br>
      <b-button variant="success" v-on:click="update">Atjaunot datus</b-button>
    </b-jumbotron>

    <b-container>
      <b-row>
        
        <b-col sm="12" md="4" v-for="product in products" :key="product.id">
          <b-card :title="product.name"
            bg-variant="light"
            :border-variant="product.available ? 'success' : 'danger'"
            img-src="https://picsum.photos/600/300?image=244"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            :footer="product.available ? 'Ir pieejams' : 'Nav pieejams'"
            footer-tag="footer">
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"> Cena: {{ product.price }} €</p>
          </b-card>
        </b-col>

      </b-row>
    </b-container>
    
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'products'
    ])
  },
  created() {
    this.fetchAllProducts();
  },
  methods: {
    ...mapActions([
      'fetchAllProducts',
      'updateAllProducts'
    ]),
    update: function() {
      this.updateAllProducts().then(()=>{
        this.fetchAllProducts()});
    }
  }
}
</script>

<style lang="scss">
.display-3 {
  font-size: 3rem;
}
.jumbotron {
    padding: 2rem 2rem;
    background-image: url('https://picsum.photos/900/100?image=958');
    background-size: cover;
    color: white;
}
.card {
  margin-bottom: 2rem;
}
</style>
