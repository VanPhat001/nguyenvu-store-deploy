<template>
  <div class="app">
    <Header id="header"></Header>
    <router-view></router-view>
    <Footer></Footer>

    <a class="btn-scroll" href="#header">
      <i class="fa-solid fa-chevron-up"></i>
    </a>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header, Footer
  }
}
</script>


<style scoped>
  .btn-scroll {
    background-color: var(--color-primary);
    color: var(--color-background);
    padding: 10px;
    border-radius: 50%;
    font-size: x-large;
    font-weight: bold;
    display: inline-block;
    position: fixed;
    bottom: 10px;
    right: 10px;
    opacity: .7;
  }

  .btn-scroll:hover {
    opacity: 1;
  }
</style>