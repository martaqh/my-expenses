<script setup lang="ts">
import BasePage from '@/pages/BasePage.vue';
import ExpenseItem from '@/components/ExpenseItem.vue';

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
</script>

<template>
  <BasePage title="Expenses">
    <div class="expenses-page">
      <div class="expenses-page__items">
        <ExpenseItem v-for="item of expenses" :expense="item" />
      </div>
      <img class="expenses-page__image" src="/src/assets/undraw_graph.svg" />
    </div>
  </BasePage>
</template>

<style lang="scss" scoped>
.expenses-page {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-gap: 16px;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__image {
    position: absolute;
    max-width: 400px;
    max-height: 500px;
    right: 20px;
    top: -160px;

    @include mobile {
      display: none;
    }
  }
}
</style>
