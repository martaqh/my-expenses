<script setup lang="ts">
import { computed } from 'vue';
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
@keyframes transitionIn {
  from {
    opacity: 0;
    transition: rotateX(-10deg);
  }
  to {
    opacity: 1;
    transition: rotateX(0);
  }
}
.base-page {
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  padding: 10rem 3rem;
  max-width: 1200px;
  animation: transitionIn 1s;
  &__title {
    font-size: calc(2rem + 4vmin);
    font-weight: 900;
    margin: 2rem 0;
  }

  @include mobile {
    padding: 6rem 1.5rem;
  }
}
</style>
