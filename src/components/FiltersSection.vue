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
    padding: '8px 16px',
    'max-width': '300px',
    height: '52px',
    'font-size': '1rem',
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
    <div class="filters-section__name">
      <v-autocomplete
        v-model="selectedName"
        :items="extractedNames"
        label="Search expense by name"
        hide-details
        clearable
      />
    </div>

    <div class="filters-section__summary">
      <p>{{ `Items: ${displayedItemsNumber}` }}</p>

      <v-btn class="filters-section__clear" @click="clearFilters" elevation="1" size="large">
        Clear all filters
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters-section {
  margin: 36px 0 48px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: $color-text-secondary;
  font-size: 0.9rem;

  > * {
    align-self: flex-start;
    width: 100%;
  }

  @include mobile {
    display: flex;
    flex-direction: column;
  }

  &__date {
    display: flex;
    gap: 16px;

    @include mobile {
      flex-direction: column;
    }
  }

  &__category {
    &-chip {
      &-icon {
        margin-left: 8px;
      }
    }
  }

  &__clear {
    width: fit-content;
    justify-self: flex-end;
  }

  &__summary {
    font-size: 1.1rem;
    color: $color-text-secondary;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.v3dp__datepicker {
  --vdp-selected-color: #00ddc2;
  --vdp-hover-bg-color: #00ddc2;
}
</style>
