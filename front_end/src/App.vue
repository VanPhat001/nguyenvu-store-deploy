<template>
  <div class="app">
    <Header id="header"></Header>
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>

    <a class="btn-scroll" href="#header">
      <i class="fa-solid fa-chevron-up"></i>
    </a>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { mapActions } from 'vuex';
export default {
  components: {
    Header, Footer
  },
  methods: {
    ...mapActions(['loadAllData'])
  },
  async created() {
    await this.loadAllData()   
  }
}
</script>


<style scoped>
  .btn-scroll {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-background);
    border-radius: 50%;
    font-size: x-large;
    font-weight: bold;
    --size: 50px;
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    text-align: center;

    position: fixed;
    bottom: 22px;
    right: 15px;
    opacity: .7;
  }

  .btn-scroll:hover {
    opacity: 1;
  }
</style>