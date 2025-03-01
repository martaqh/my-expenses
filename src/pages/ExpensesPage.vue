<script setup lang="ts">
import { computed, ref } from 'vue';
import BasePage from '@/pages/BasePage.vue';
import ExpenseItem from '@/components/ExpenseItem.vue';
import SummaryView from '@/components/SummaryView.vue';
import FiltersSection from '@/components/FiltersSection.vue';
import { expenses } from '@/data';
import type { Expense, Category } from '@/data';
import { getTotalExpenses } from '@/helpers';

const DATE_SEPARATOR = '-';
const DEFAULT_PAGE = 1;
const ITEMS_PER_PAGE = 5;

const uniqueMonths = computed(() => {
  const dates = expenses.map((item) => item.date);
  const months = dates.map((date) => date.split(DATE_SEPARATOR)[1]);
  const uniqueMonths = [...new Set(months)];
  return uniqueMonths;
});

const uniqueCategories = computed(() => {
  const categories = expenses.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
});

const getTotalForMonth = (month: string) => {
  const monthlyExpenses = expenses.filter((item) => item.date.split(DATE_SEPARATOR)[1] === month);
  return getTotalExpenses(monthlyExpenses);
};

const getTotalForCategory = (category: Category) => {
  const categoryExpenses = expenses.filter((item) => item.category === category);
  return getTotalExpenses(categoryExpenses);
};

const totalsPerMonth = computed(() => {
  const periodsAndTotals = [];
  for (let month of uniqueMonths.value) {
    periodsAndTotals.push({ month: parseInt(month), total: getTotalForMonth(month) });
  }
  return periodsAndTotals;
});

const totalsPerCategory = computed(() => {
  const categoriesAndTotals = [];
  for (let category of uniqueCategories.value) {
    categoriesAndTotals.push({ category, total: getTotalForCategory(category) });
  }
  return categoriesAndTotals;
});

const page = ref(DEFAULT_PAGE);
const filteredData = ref<Expense[]>(expenses);

const handleFilteredExpenses = (newValue: Expense[]) => {
  filteredData.value = newValue;
};

const paginatedExpenseItems = computed(() => {
  const startIndex = (page.value - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return filteredData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / ITEMS_PER_PAGE);
});
</script>

<template>
  <BasePage title="Expenses">
    <div class="expenses-page">
      <h2 class="expenses-page__subtitle">Keep track on how you spend your hard-earned money</h2>
      <FiltersSection class="expenses-page__filters" @expenses-filtered="handleFilteredExpenses" />
      <div class="expenses-page__items-list">
        <ExpenseItem v-for="item of paginatedExpenseItems" :expense="item" :key="item.name" />
      </div>
      <v-pagination
        class="expenses-page__pagination"
        v-model="page"
        :length="totalPages"
        :total-visible="ITEMS_PER_PAGE"
        :items-per-page="ITEMS_PER_PAGE"
        active-color="#7e36f3"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
      />
      <SummaryView
        class="expenses-page__summary"
        :total="getTotalExpenses(expenses)"
        :periods-data="totalsPerMonth"
        :categories-data="totalsPerCategory"
      />
      <img
        class="expenses-page__image"
        src="/src/assets/undraw_graph.svg"
        alt="lady with a graph"
      />
    </div>
  </BasePage>
</template>

<style lang="scss" scoped>
.expenses-page {
  width: 100%;
  display: grid;
  grid-template-rows: 40px 0.7fr 1.2fr 80px;
  grid-template-columns: minmax(350px, 1.7fr) 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 48px;

  @include mobile {
    display: flex;
    flex-direction: column;
    grid-row-gap: 24px;
  }

  &__subtitle {
    font-size: 1.5rem;
    color: $color-text-secondary;
    grid-row: 1;
    grid-column: 1;

    @include mobile {
      font-size: 1.3rem;
    }
  }
  &__filters {
    grid-row: 2/3;
    grid-column: 1;
  }

  &__summary {
    grid-column: 2;
    grid-row: 3;
  }

  &__items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    grid-row: 3/4;
    grid-column: 1;
  }

  &__pagination {
    grid-row: 4;
  }

  &__image {
    max-width: 350px;
    min-width: 200px;

    grid-row: 1/3;
    grid-column: 2;
    justify-self: flex-end;
    align-self: flex-end;
    @include mobile {
      display: none;
    }
  }
}
</style>
