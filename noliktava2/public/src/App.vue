<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',

components: {
}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
