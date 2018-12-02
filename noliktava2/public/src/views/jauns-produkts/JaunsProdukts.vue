<template>
  <div>
    <b-jumbotron header="Laipni lūgti mūsu Noliktavas sistēmā!" lead="Izveidojiet jaunu produktu!" ></b-jumbotron>

    <b-container>
      <b-row>
        <b-col sm="12" md="8">
        <b-form class="productForm">
            <b-form-group label="Produkta nosaukums:" label-for="name">
                <b-form-input id="name" type="text" v-model="newProduct.name" required></b-form-input>
            </b-form-group>
            <b-form-group label="Produkta apraksts:" label-for="apraksts">
                <b-form-input id="apraksts" type="text" v-model="newProduct.description" required></b-form-input>
            </b-form-group>
            <b-form-group label="Produkta cena:" label-for="cena">
                <b-form-input id="cena" type="number" v-model="newProduct.price" required></b-form-input>
            </b-form-group>
            <b-form-group label="Atlikums noliktavā:" label-for="atlikums">
                <b-form-input id="atlikums" type="number" v-model="newProduct.amount" required></b-form-input>
            </b-form-group>
        </b-form>
</b-col>
      </b-row>
        <b-button variant="danger" size="lg" v-on:click="back">Atpakaļ uz galveno lapu</b-button>
        <b-button variant="success" size="lg" v-on:click="submit">Izveidot jaunu produktu</b-button>
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
      'newProduct'
    ]),
  },
  created() {
    
  },
  methods: {
    ...mapActions([
      'saveProduct'
    ]),
    back() {
        this.$router.push({ name: 'noliktava' })
    },
    submit() {
        this.saveProduct().then(()=>{
          this.$router.push({ name: 'noliktava' });
          this.newProduct.name = null;
          this.newProduct.description = null;
          this.newProduct.price = null;
          this.newProduct.amount = null;
         } 
      );
    }

  }
}
</script>

<style lang="scss">
.productForm {
  width: 100%;
}
.display-3 {
  font-size: 3rem;
}
.jumbotron {
    padding: 2rem 2rem;
    background-image: url('https://picsum.photos/600/300?image=958');
    background-size: cover;
    color: white;
}
</style>
