<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <main class="app">
    <TheHeader />
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.app {
  font-family: $font-main;
  color: $color-text-primary;
}
</style>
