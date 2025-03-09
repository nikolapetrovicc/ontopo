<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header></Header>
    <main role="main" class="flex-1">
      <RouterView></RouterView>
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>