<script setup lang="ts">
import { computed, ref } from 'vue';
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
  {
    name: 'coffee',
    price: 60,
    category: 'food',
    date: '2022-09-10',
  },
];

const getTotalExpenses = (expencesData: Expense[]) => {
  const expencesSum = expencesData.reduce((accumulator, currentItem) => {
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

const extractedCategories = computed(() => {
  const categories = expenses.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
});

const getTotalForMonth = (month: string) => {
  const monthlyExpenses = expenses.filter((item) => item.date.split('-')[1] === month);
  return getTotalExpenses(monthlyExpenses);
};

const getTotalForCategory = (category: Category) => {
  const categoryExpenses = expenses.filter((item) => item.category === category);
  return getTotalExpenses(categoryExpenses);
};

const totalsPerMonth = computed(() => {
  const periodsAndTotals = [];
  for (let month of extractedMonths.value) {
    periodsAndTotals.push({ month: parseInt(month), total: getTotalForMonth(month) });
  }
  return periodsAndTotals;
});

const totalsPerCategory = computed(() => {
  const categoriesAndTotals = [];
  for (let category of extractedCategories.value) {
    categoriesAndTotals.push({ category: category, total: getTotalForCategory(category) });
  }
  return categoriesAndTotals;
});

const paginationLength = computed(() => {
  console.log(Math.ceil(expenses.length / 5));
  return Math.ceil(expenses.length / 5);
});

const page = ref(1);
const itemsPerPage = 5;

const paginatedExpenseItems = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return expenses.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(expenses.length / itemsPerPage);
});
</script>

<template>
  <BasePage title="Expenses">
    <div class="expenses-page">
      <div class="expenses-page__items-list">
        <ExpenseItem v-for="item of paginatedExpenseItems" :expense="item" />
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="itemsPerPage"
          :items-per-page="itemsPerPage"
          active-color="teal-accent-4"
          rounded="0"
        />
      </div>

      <div class="expenses-page__summary">
        <img class="expenses-page__image" src="/src/assets/undraw_graph.svg" />
        <SummaryView
          :total="getTotalExpenses(expenses)"
          :periods-data="totalsPerMonth"
          :categories-data="totalsPerCategory"
        />
      </div>
    </div>
  </BasePage>
</template>

<style lang="scss" scoped>
.expenses-page {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-gap: 64px;

  &__items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__image {
    max-width: 380px;
    position: absolute;
    bottom: 400px;
    right: 0px;

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
