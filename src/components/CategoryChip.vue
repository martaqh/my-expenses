<script setup lang="ts">
import { computed } from 'vue';
import type { Category } from '@/data';

const props = defineProps<{
  label: Category;
}>();

const isFood = computed(() => {
  return props.label === 'food';
});

const isCar = computed(() => {
  return props.label === 'car';
});
</script>

<template>
  <div class="category-chip" :class="{ blue: isFood, pink: isCar }">
    <span class="category-chip__label">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.category-chip {
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 50px;
  height: fit-content;
  padding: 8px;
  font-size: 0.8rem;
  opacity: 0.8;
  &.blue {
    background-color: #def3fc;
    color: #0c5878;
  }

  &.pink {
    background-color: #ffe5f0;
    color: #f54991;
  }
}
</style>
