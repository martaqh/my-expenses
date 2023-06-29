<script setup lang="ts">
import { computed, mergeProps } from 'vue';
const props = defineProps<{
  title: string;
}>();

const formattedTitle = computed(() => {
  return props.title.charAt(0).toUpperCase() + props.title.slice(1);
});
</script>

<template>
  <main class="base-page">
    <h1 class="base-page__title">{{ formattedTitle }}</h1>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.base-page {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 4rem;
  max-width: 1200px;

  &__title {
    font-size: calc(2rem + 4vmin);
    font-weight: 900;
    margin: 4rem 0;
  }
}
</style>
