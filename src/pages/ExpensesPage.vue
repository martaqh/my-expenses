<script setup lang="ts">
import { computed } from 'vue';
import BasePage from '@/pages/BasePage.vue';
import ExpenseItem from '@/components/ExpenseItem.vue';
import SummaryView from '@/components/SummaryView.vue';

export type Category = 'food' | 'car';

export type Expense = {
  name: string;
  price: number;
  category: Category;
  date: string;
};

const expenses: Expense[] = [
  {
    name: 'coffee',
    price: 40,
    category: 'food',
    date: '2022-07-16',
  },
  {
    name: 'bread',
    price: 8,
    category: 'food',
    date: '2022-08-03',
  },
  {
    name: 'cheese',
    price: 21,
    category: 'food',
    date: '2022-08-03',
  },
  {
    name: 'fuel',
    price: 320,
    category: 'car',
    date: '2022-08-14',
  },
  {
    name: 'bread',
    price: 8,
    category: 'food',
    date: '2022-09-01',
  },
  {
    name: 'ham',
    price: 14,
    category: 'food',
    date: '2022-09-01',
  },
  {
    name: 'butter',
    price: 6,
    category: 'food',
    date: '2022-09-10',
  },
  {
    name: 'fuel',
    price: 320,
    category: 'car',
    date: '2022-09-10',
  },
  {
    name: 'car wash',
    price: 60,
    category: 'car',
    date: '2022-09-10',
  },
];

const getTotalExpenses = (array: Expense[]) => {
  const expencesSum = array.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price;
  }, 0);
  return expencesSum;
};

const extractedMonths = computed(() => {
  const dates = expenses.map((item) => item.date);
  const months = dates.map((date) => date.split('-')[1]);
  const uniqueMonths = [...new Set(months)];
  return uniqueMonths;
});

const getTotalForMonth = (month: string) => {
  const monthlyExpences = expenses.filter((item) => item.date.split('-')[1] === month);
  return getTotalExpenses(monthlyExpences);
};

const totalsPerMonth = computed(() => {
  const periodsAndTotals = [];
  for (let month of extractedMonths.value) {
    periodsAndTotals.push({ month: parseInt(month), total: getTotalForMonth(month) });
  }
  return periodsAndTotals;
});
</script>

<template>
  <BasePage title="Expenses">
    <div class="expenses-page">
      <div class="expenses-page__items-list">
        <ExpenseItem v-for="item of expenses" :expense="item" />
      </div>
      <div class="expenses-page__summary">
        <SummaryView :total="getTotalExpenses(expenses)" :periodsData="totalsPerMonth" />
        <img class="expenses-page__image" src="/src/assets/undraw_graph.svg" />
      </div>
    </div>
  </BasePage>
</template>

<style lang="scss" scoped>
.expenses-page {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-gap: 16px;

  &__items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__image {
    max-width: 400px;
    max-height: 500px;

    @include mobile {
      display: none;
    }
  }
  &__summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
