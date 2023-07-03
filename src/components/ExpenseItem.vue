<script setup lang="ts">
import CategoryChip from './CategoryChip.vue';
import PriceItem from './PriceItem.vue';
import type { Expense } from '@/data';

defineProps<{
  expense: Expense;
}>();

const formattedPrice = (price: number) => {
  return `${price} PLN`;
};
</script>

<template>
  <div class="expense-item">
    <span class="expense-item__name">{{ expense.name }}</span>
    <span class="expense-item__date">{{ expense.date }}</span>
    <CategoryChip class="expense-item__category" :label="expense.category"></CategoryChip>
    <PriceItem :amount="expense.price" currency="PLN"></PriceItem>
  </div>
</template>

<style lang="scss" scoped>
.expense-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  height: fit-content;
  padding: 20px;
  box-shadow: $box-shadow;
  border-radius: $border-radius;

  > * {
    display: flex;
    align-self: baseline;
  }

  &__name {
    font-weight: 700;
    font-size: 1.1rem;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      height: 24px;
      width: 5px;
      background-color: $color-accent;
      position: absolute;
      left: -20px;
      bottom: -2px;
    }
  }

  &__date {
    color: $color-text-secondary;
  }
}
</style>
