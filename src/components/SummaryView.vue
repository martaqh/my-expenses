<script setup lang="ts">
import { expenses, type Category, type Expense } from '@/data';
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

const getCategoryIcon = (category: Category) => {
  return category === 'car' ? 'mdi-car' : 'mdi-silverware-variant';
};
</script>

<template>
  <div class="summary-view">
    <div class="summary-view__total">
      <h3>
        Total:
        <span>
          <strong>{{ total }}</strong>
          PLN
        </span>
      </h3>
    </div>
    <img class="summary-view__image" src="/src/assets/undraw_graph.svg" />
    <div class="summary-view__subtotals">
      <div class="summary-view__subtotals-section months">
        <div class="summary-view__subtotals-section-item" v-for="item in periodsData">
          <strong>{{ getMonthName(item.month) }}</strong>
          <span>{{ `${item.total} PLN` }}</span>
        </div>
      </div>
      <div class="summary-view__subtotals-section">
        <div class="summary-view__subtotals-section-item" v-for="item in categoriesData">
          <v-icon :icon="getCategoryIcon(item.category)" />
          <span>{{ `${item.total} PLN` }}</span>
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
  padding-bottom: 48px;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  &__total {
    padding: 24px;
    display: flex;
    justify-content: center;
    gap: 24px;
    text-transform: uppercase;
    font-size: 1.5rem;
    background-color: $color-accent;
    color: white;

    strong {
      font-size: 1.7rem;
    }
  }
  &__image {
    padding: 48px 0 0;
    height: 240px;

    @include mobile {
      display: none;
    }
  }
  &__subtotals {
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    gap: 64px;
    font-size: 1.2rem;

    &-section {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 36px;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
    }
  }
}
</style>
