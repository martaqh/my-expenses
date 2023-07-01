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
  <div class="category-chip">
    <v-icon v-if="isCar" icon="mdi-car"></v-icon>
    <v-icon v-if="isFood" icon="mdi-food"></v-icon>
  </div>
</template>

<style lang="scss" scoped>
.category-chip {
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 30px;
  height: 30px;
  padding: 8px 16px;
  font-size: 0.8rem;
  color: $color-text-secondary;
}
</style>
