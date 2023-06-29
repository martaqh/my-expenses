<script setup lang="ts">
import CategoryChip from './CategoryChip.vue';
import type { Expense } from '@/data';

defineProps<{
  expense: Expense;
}>();

const formattedPrice = (price: number) => {
  return `${price} PLN`;
};
</script>

<template>
  <div :key="expense.name" class="expense-item">
    <span class="expense-item__name">{{ expense.name }}</span>
    <span class="expense-item__date">{{ expense.date }}</span>
    <CategoryChip :label="expense.category"></CategoryChip>
    <div class="expense-item__price">
      <span class="expense-item__price-amount">{{ expense.price }}</span>
      <span class="expense-item__price-currency">PLN</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.expense-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  height: fit-content;
  padding: 24px;
  border: 1px solid $color-border;

  span {
    margin: 8px 0;
    width: fit-content;
  }

  &__name {
    font-weight: 700;
    font-size: 1.1rem;
    position: relative;

    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      width: 5px;
      background-color: $color-accent;
      position: absolute;
      left: -24px;
    }
  }

  &__date {
    color: $color-text-secondary;
  }

  &__price {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 8px;

    &-amount {
      font-size: 1.3rem;
    }
    &-currency {
      font-size: 0.8rem;
    }
  }
}
</style>
