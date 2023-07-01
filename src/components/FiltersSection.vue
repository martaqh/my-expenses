<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Category } from '@/data';
import { expenses } from '@/data';
import Datepicker from 'vue3-datepicker';

const emit = defineEmits(['expenses-filtered']);

const selectedStartDate = ref<Date>();
const selectedEndDate = ref<Date>();

const selectedCategory = ref<0 | 1 | 2>();
const selectedName = ref('');

const clearFilters = () => {
  selectedStartDate.value = undefined;
  selectedEndDate.value = undefined;
  selectedCategory.value = 0;
  selectedName.value = '';
};

const displayedItemsNumber = computed(() => {
  return filteredExpenses.value.length;
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
    let selectedCategoryValue = '';
    if (selectedCategory.value === 1) {
      selectedCategoryValue = 'car';
    } else if (selectedCategory.value === 2) {
      selectedCategoryValue = 'food';
    }

    const selectedNameValue = selectedName.value;

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

const extractedNames = computed(() => {
  const names = expenses.map((item) => item.name);
  const uniqueNames = [...new Set(names)];
  return uniqueNames;
});

const inputStyle = computed(() => {
  return {
    border: '1px solid grey',
    'border-radius': '4px',
    padding: '4px 8px',
  };
});

watch(filteredExpenses, (newValue, oldValue) => {
  emit('expenses-filtered', newValue);
});
</script>

<template>
  <div class="filters-section">
    <div class="filters-section__category">
      <v-chip-group v-model="selectedCategory" mandatory="force">
        <v-chip class="filters-section__category-chip" filter color="#00beba" size="large">
          <span>All</span>
        </v-chip>
        <v-chip class="filters-section__category-chip" filter color="#0094DB" size="large">
          <span>Car</span>
          <v-icon class="filters-section__category-chip-icon" icon="mdi-car" size="small"></v-icon>
        </v-chip>
        <v-chip class="filters-section__category-chip" filter color="#AB2A64" size="large">
          <span>Food</span>
          <v-icon
            class="filters-section__category-chip-icon"
            icon="mdi-silverware-variant"
            size="small"
          ></v-icon>
        </v-chip>
      </v-chip-group>
    </div>

    <div class="filters-section__date">
      <Datepicker
        v-model="selectedStartDate"
        :lower-limit="new Date('2022-07-16')"
        :upper-limit="new Date('2022-09-16')"
        placeholder="Choose start date"
        :style="inputStyle"
        typeable
        clearable
      />
      <Datepicker
        v-model="selectedEndDate"
        :lower-limit="new Date('2022-07-16')"
        :upper-limit="new Date('2022-09-16')"
        placeholder="Choose end date"
        :style="inputStyle"
        typeable
        clearable
      />
    </div>

    <v-autocomplete
      class="filters-section__name"
      v-model="selectedName"
      :items="extractedNames"
      label="Search expense by name"
      density="compact"
      clearable
    />

    <span class="filters-section__summary">{{ `Number of items: ${displayedItemsNumber}` }}</span>

    <v-btn class="filters-section__clear" @click="clearFilters" elevation="1">
      Clear all filters
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.filters-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 64px);
  grid-gap: 8px;
  color: $color-text-secondary;
  font-size: 0.9rem;

  &__date {
    display: flex;
    gap: 16px;
    grid-row: 3;
  }

  &__category {
    grid-row: 1;

    &-chip {
      &-icon {
        margin-left: 8px;
      }
    }
  }
  &__name {
    height: 40px;
    grid-row: 2;
  }

  &__clear {
    width: fit-content;
    grid-row: 3;
    grid-column: 2;
    justify-self: flex-end;
    align-self: flex-start;
    height: 34px;
  }

  &__summary {
    font-size: 1.1rem;
    color: $color-text-secondary;
    grid-row: 2;
    grid-column: 2;
    justify-self: flex-end;
    align-self: flex-start;
  }
}

.v3dp__datepicker {
  --vdp-selected-color: #00ddc2;
  --vdp-hover-bg-color: #00ddc2;
}
</style>
