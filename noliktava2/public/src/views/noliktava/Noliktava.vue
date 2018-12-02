<template>
  <div>
    <b-jumbotron header="Laipni lūgti mūsu Noliktavas sistēmā!" lead="Vislabākais piedāvājums" >
       <br>
      <b-button variant="success" v-on:click="newProduct">Izveidot jaunu produktu</b-button>
    </b-jumbotron>

    <b-container fluid>
      <b-row>

        <b-col sm="12" md="4" v-for="(value, index) in products" :key="value.id">
          <b-card
            :header="value.name"
            header-tag="header"
            :footer="'Daudzums: ' + value.amount"
            footer-tag="footer"
            bg-variant="light"
            border-variant="secondary">
            <p class="card-text"> Apraksts: {{ value.description }}</p>
            <p class="card-text"> Cena: {{ value.price }} €</p>
            <b-button variant="outline-success" v-on:click="edit(index)">Rediģēt</b-button>
          </b-card>
        </b-col>

      </b-row>
    </b-container>

    <div>
</div>

    
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
      'fetchAllProducts'
    ]),
    edit(key) {
      this.$router.push({ name: 'produkts', params: { id: key }})
    },
    newProduct: function() {
      this.$router.push({ name: 'jaunsProdukts'})
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
    background-image: url('https://picsum.photos/600/300?image=958');
    background-size: cover;
    color: white;
}
.card {
  margin-bottom: 2rem;
}
.card header {
  font-weight: bold;
}

</style>
