<script setup lang="ts">
import { type Category } from '@/data';
import PriceItem from '@/components/PriceItem.vue';

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
        <span> Total:</span>
        <PriceItem :amount="total" currency="PLN" size="large" />
      </h3>
    </div>

    <div class="summary-view__subtotals">
      <div class="summary-view__subtotals-section">
        <div class="summary-view__subtotals-section-item" v-for="item in periodsData">
          <strong>{{ getMonthName(item.month) }}</strong>
          <PriceItem :amount="item.total" currency="PLN" />
        </div>
      </div>

      <v-divider class="summary-view__subtotals-divider" />

      <div class="summary-view__subtotals-section categories">
        <div class="summary-view__subtotals-section-item" v-for="item in categoriesData">
          <v-icon :icon="getCategoryIcon(item.category)" />
          <PriceItem :amount="item.total" currency="PLN" />
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
  border-radius: $border-radius;
  border: 2px solid $color-accent;
  box-shadow: $box-shadow;
  @include mobile {
    font-size: 1rem;
  }

  &__total {
    padding: 20px;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-size: 1.5rem;
    background-color: $color-accent;
    color: $color-reverse;

    h3 {
      display: flex;
      gap: 16px;
      align-items: flex-end;
    }
  }

  &__subtotals {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 32px;
    font-size: 1.2rem;
    height: 100%;

    @include mobile {
      justify-content: space-around;
      font-size: 1rem;
      flex-direction: row;
      padding: 20px;
    }

    &-divider {
      @include mobile {
        display: none;
      }
    }

    &-section {
      display: flex;
      gap: 20px;
      flex-direction: column;

      &.categories {
        justify-content: space-around;
        @include mobile {
          justify-content: space-between;
        }
      }

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
    }
  }
}
</style>
