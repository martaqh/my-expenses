<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Category } from '@/data';
import { expenses } from '@/data';
import Datepicker from 'vue3-datepicker';

const emit = defineEmits(['expenses-filtered']);

const selectedStartDate = ref<Date>();
const selectedEndDate = ref<Date>();

const selectedCategory = ref<Category | ''>('');
const selectedName = ref('');

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

const inputStyle = computed(() => {
  return {
    border: '1px solid grey',
    padding: '4px 8px',
  };
});

watch(filteredExpenses, (newValue, oldValue) => {
  console.log(newValue);
  emit('expenses-filtered', newValue);
});
</script>

<template>
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
</template>
