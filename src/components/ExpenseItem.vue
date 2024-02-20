<script setup lang="ts">
import { computed } from 'vue';
import PriceItem from '@/components/PriceItem.vue';
import { type Expense } from '@/data';

const props = defineProps<{
  expense: Expense;
}>();

const categoryIcon = computed(() => {
  return props.expense.category === 'food' ? 'mdi-silverware-variant' : 'mdi-car';
});
</script>

<template>
  <div class="expense-item">
    <span class="expense-item__name">{{ expense.name }}</span>
    <span class="expense-item__date">{{ expense.date }}</span>
    <v-icon class="expense-item__category" :icon="categoryIcon"></v-icon>
    <PriceItem class="expense-item__price" :amount="expense.price" currency="PLN"></PriceItem>
  </div>
</template>

<style lang="scss" scoped>
.expense-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  padding: 24px;
  box-shadow: $box-shadow;
  border-radius: $border-radius;

  > * {
    align-self: center;
  }

  &__name {
    font-weight: 500;
    font-size: 1.1rem;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      height: 24px;
      width: 4px;
      background-color: $color-accent;
      position: absolute;
      left: -24px;
      bottom: -2px;
    }
    @include mobile {
      font-size: 0.9rem;
    }
  }

  &__date {
    color: $color-text-secondary;

    @include mobile {
      font-size: 0.7rem;
    }
  }
  &__category {
    color: $color-text-secondary;
    font-size: 1.3rem;
    justify-self: center;
    @include mobile {
      font-size: 1.1rem;
    }
  }
}
</style>
