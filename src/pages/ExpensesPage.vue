<script setup lang="ts">
import { computed, ref } from 'vue';
import BasePage from '@/pages/BasePage.vue';
import ExpenseItem from '@/components/ExpenseItem.vue';
import SummaryView from '@/components/SummaryView.vue';
import Datepicker from 'vue3-datepicker';

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

const filteredExpenses = computed(() => {
  if (
    !selectedStartDate.value &&
    !selectedEndDate.value &&
    !selectedCategory.value &&
    !selectedName.value
  ) {
    return expenses;
  } else {
    const startTimestamp = selectedStartDate.value ? selectedStartDate.value.getTime() : 0;
    const endTimestamp = selectedEndDate.value
      ? selectedEndDate.value.getTime()
      : Number.MAX_SAFE_INTEGER;
    const selectedCategoryValue = selectedCategory.value;
    const selectedNameValue = selectedName.value.toLowerCase();

    return expenses.filter((item) => {
      const itemTimestamp = new Date(item.date).getTime();
      const itemCategory = item.category;
      const itemName = item.name.toLowerCase();

      return (
        itemTimestamp >= startTimestamp &&
        itemTimestamp <= endTimestamp &&
        (!selectedCategoryValue || itemCategory === selectedCategoryValue) &&
        (!selectedNameValue || itemName.includes(selectedNameValue))
      );
    });
  }
});

const page = ref(1);
const itemsPerPage = 5;

const paginatedExpenseItems = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredExpenses.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(expenses.length / itemsPerPage);
});

const selectedStartDate = ref<Date>();
const selectedEndDate = ref<Date>();

const selectedCategory = ref<Category | ''>('');
const selectedName = ref('');

const inputStyle = computed(() => {
  return {
    border: '1px solid grey',
    padding: '4px 8px',
  };
});
</script>

<template>
  <BasePage title="Expenses">
    <div class="expenses-page">
      <div class="expenses-page__items-list">
        <div class="expenses-page__filters">
          <div class="expenses-page__filters--date">
            <Datepicker
              v-model="selectedStartDate"
              :lower-limit="new Date('2022-07-16')"
              :upper-limit="new Date('2022-09-16')"
              placeholder="Choose start date"
              :style="inputStyle"
              typeable
            />
            <Datepicker
              v-model="selectedEndDate"
              :lower-limit="new Date('2022-07-16')"
              :upper-limit="new Date('2022-09-16')"
              placeholder="Choose end date"
              :style="inputStyle"
              typeable
            />
          </div>
          <div class="expenses-page__filters--category">
            <v-btn-toggle v-model="selectedCategory" mandatory variant="outlined" divided>
              <v-btn @click="selectedCategory = ''">All</v-btn>
              <v-btn @click="selectedCategory = 'car'">Car</v-btn>
              <v-btn @click="selectedCategory = 'food'">Food</v-btn>
            </v-btn-toggle>
          </div>
          <v-autocomplete v-model="selectedName" :items="['bread', 'coffee', 'fuel']" />
        </div>
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
