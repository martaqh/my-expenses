<script setup lang="ts">
defineProps<{
  total: number;
  periodsData: { month: number; total: number }[];
}>();

const getMonthName = (monthNumber: number) => {
  const date = new Date(0, monthNumber);
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  return monthName;
};
</script>

<template>
  <div class="summary-view">
    <div class="summary-view__total">
      <span>Total:</span>
      <span>{{ total }}</span>
    </div>
    <div v-for="item in periodsData" class="summary-view__per-month">
      <span>{{ getMonthName(item.month) }}</span>
      <span>: </span>
      <span>{{ item.total }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summary-view {
  display: flex;
  flex-direction: column;
  border: 1px solid $color-border;
  padding: 24px;
}
</style>
