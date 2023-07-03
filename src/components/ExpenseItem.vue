<script setup lang="ts">
import CategoryChip from '@/components/CategoryChip.vue';
import PriceItem from '@/components/PriceItem.vue';
import type { Expense } from '@/data';

defineProps<{
  expense: Expense;
}>();
</script>

<template>
  <div class="expense-item">
    <span class="expense-item__name">{{ expense.name }}</span>
    <span class="expense-item__date">{{ expense.date }}</span>
    <CategoryChip class="expense-item__category" :label="expense.category"></CategoryChip>
    <PriceItem class="expense-item__price" :amount="expense.price" currency="PLN"></PriceItem>
  </div>
</template>

<style lang="scss" scoped>
.expense-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  padding: 20px;
  box-shadow: $box-shadow;
  border-radius: $border-radius;

  > * {
    display: flex;
    align-self: center;
  }

  &__name {
    font-weight: 700;
    font-size: 1.1rem;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      height: 20px;
      width: 5px;
      background-color: $color-accent;
      position: absolute;
      left: -20px;
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
}
</style>
