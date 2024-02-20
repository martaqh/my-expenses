<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { expenses } from '@/data';
import Datepicker from 'vue3-datepicker';
import { getTotalExpenses } from '@/helpers';
import PriceItem from './PriceItem.vue';

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

const displayedSubtotal = computed(() => {
  return getTotalExpenses(filteredExpenses.value);
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

const itemsNames = computed(() => {
  const names = filteredExpenses.value.map((item) => item.name);
  const uniqueNames = [...new Set(names)];
  return uniqueNames;
});

watch(filteredExpenses, (newValue, oldValue) => {
  emit('expenses-filtered', newValue);
});
</script>

<template>
  <div class="filters-section">
    <div class="filters-section__upper-row">
      <div class="filters-section__category">
        <v-chip-group v-model="selectedCategory" mandatory="force">
          <v-chip class="filters-section__category-chip" filter color="#3B00B9" size="large">
            <span>All</span>
          </v-chip>
          <v-chip class="filters-section__category-chip" filter color="#3B00B9" size="large">
            <span>Car</span>
            <v-icon class="filters-section__category-chip-icon" icon="mdi-car" size="small" />
          </v-chip>
          <v-chip class="filters-section__category-chip" filter color="#3B00B9" size="large">
            <span>Food</span>
            <v-icon
              class="filters-section__category-chip-icon"
              icon="mdi-silverware-variant"
              size="small"
            />
          </v-chip>
        </v-chip-group>
      </div>

      <div class="filters-section__date">
        <Datepicker
          class="date-input"
          v-model="selectedStartDate"
          :lower-limit="new Date('2022-07-16')"
          :upper-limit="new Date('2022-09-16')"
          placeholder="Choose start date"
          typeable
          clearable
        />
        <Datepicker
          class="date-input"
          v-model="selectedEndDate"
          :lower-limit="new Date('2022-07-16')"
          :upper-limit="new Date('2022-09-16')"
          placeholder="Choose end date"
          typeable
          clearable
        />
      </div>
    </div>

    <div class="filters-section__name">
      <v-autocomplete
        v-model="selectedName"
        :items="itemsNames"
        placeholder="Start typing expense name or select it from the list"
        label="Search expense by name"
        hide-details
        clearable
        density="compact"
        variant="outlined"
      />
    </div>

    <div class="filters-section__summary">
      <p>{{ `Items: ${displayedItemsNumber}` }}</p>
      <p>
        <span>Subtotal:</span
        ><PriceItem currency="PLN" :amount="displayedSubtotal" size="small"></PriceItem>
      </p>
      <v-btn
        class="filters-section__clear"
        @click="clearFilters"
        size="large"
        elevation="0"
        color="#6E33E4"
        variant="plain"
      >
        Clear all filters
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.filters-section {
  gap: 16px;
  display: flex;
  flex-direction: column;
  color: $color-text-secondary;

  > * {
    align-self: flex-start;
    width: 100%;
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    margin: 24px 0 36px;
  }

  &__upper-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__date {
    display: flex;
    gap: 16px;
    width: fit-content;

    @include mobile {
      width: 100%;
      justify-content: space-between;

      * {
        width: 100%;
      }
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
    color: $color-text-secondary;
    width: fit-content;
    justify-self: flex-end;
    @include mobile {
      font-size: 0.9rem;
    }
  }

  &__summary {
    color: $color-text-secondary;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;

    @include tablet {
      font-size: 0.8rem;

      * {
        font-size: 0.8rem !important;
      }
    }

    @include mobile {
      font-size: 0.8rem;

      * {
        font-size: 0.8rem !important;
      }
    }

    p {
      display: flex;
      gap: 4px;
    }
  }
}

.date-input {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  height: fit-content;
  padding: 8px;

  @include mobile {
    font-size: 0.9rem;
  }
}

.v3dp__datepicker {
  --vdp-selected-bg-color: #3b00b9;
  --vdp-hover-bg-color: #7e36f3;
}
</style>
