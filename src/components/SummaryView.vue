<script setup lang="ts">
import type { Category } from '@/pages/ExpensesPage.vue';
defineProps<{
  total: number;
  periodsData: { month: number; total: number }[];
  categoriesData: { category: Category; total: number }[];
}>();

const getMonthName = (monthNumber: number) => {
  const date = new Date(0, monthNumber);
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  return monthName;
};
</script>

<template>
  <div class="summary-view">
    <div class="summary-view__total">
      <span>Total:</span>
      <span>{{ total }}</span>
    </div>
    <div class="summary-view__subtotals">
      <div class="summary-view__subtotals-section">
        <h3>Per month</h3>
        <div class="summary-view__subtotals-section-item" v-for="item in periodsData">
          <span>{{ `${getMonthName(item.month)}:` }}</span>
          <span>{{ item.total }}</span>
        </div>
      </div>
      <div class="summary-view__subtotals-section">
        <h3>Per category</h3>
        <div class="summary-view__subtotals-section-item" v-for="item in categoriesData">
          <span>{{ `${item.category}:` }}</span>
          <span>{{ item.total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summary-view {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid $color-border;
  padding: 32px;
  height: 100%;

  &::before {
    content: '';
    display: inline-block;
    height: 40px;
    width: 5px;
    background-color: $color-accent;
    position: absolute;
    left: 0;
  }
  &__total {
    text-transform: uppercase;
  }
  &__subtotals {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;

    &-section {
      display: flex;
      flex-direction: column;

      &-item {
        display: flex;
        justify-content: space-between;
        gap: 32px;
      }
    }
  }
}
</style>
