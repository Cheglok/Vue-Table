<script>
  import Table from './components/Table.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  export default {
    components: {
      Table,
      Header,
      Footer
    }
  }
</script>

<template>
  <div class="root-container">
    <Header></Header>
    <Table></Table>
    <Footer></Footer>
  </div>
</template>

<style scoped>
  .root-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
  justify-content: space-between;
}
</style>
